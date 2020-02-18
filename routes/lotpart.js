const express = require('express');
const cors = require('cors');
const models = require('../models');

const lotpart = express.Router();

lotpart.use(cors());

lotpart.post('/', (req, res) => {
    let w = {where: {}, include: ['lotPartsLotSubParts', 'operator', 'typePart']};
    if (req.body.name && req.body.section) {
        w = {
            where: {
                [Op.and]: [
                    { 
                        name: {
                            [Op.substring]: req.body.name
                        }
                    },
                    { 
                        section: req.body.section
                    }
                ]
            }
        }
    }
    if (req.body.name && !req.body.section) {
        w = {
            where: {
                name: {
                    [Op.substring]: req.body.name
                }
            }
        }
    }
    if (!req.body.name && req.body.section) {
        w = {
            where: {
                section: req.body.section
            }
        }
    }
    models.LotPart.findAll(w).then(result => {
        if (result) {
            res.json({
                message: result
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: { error: err },
        });
    });
});

lotpart.post('/add', (req, res) => {
    console.log(req.body)
    models.LotPart.create(req.body, {
        include: ['lotPartsLotSubParts']
    }).then(result => {
        res.json({
            message: result.dataValues,
        });
    }).catch(err => {
        res.status(400).json({
            message: { error: err },
        });
    });
});

module.exports = lotpart;
