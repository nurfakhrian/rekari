const express = require('express');
const cors = require('cors');
const models = require('../models');
const SubPart = require('../models/subpartdetail')(models.sequelize, models.Sequelize.DataTypes);
const { Op } = require("sequelize");

const subpart = express.Router();

subpart.use(cors());

subpart.post('/', (req, res) => {
    let w;
    if (req.body.name) {
        w = {
            where: {
                name: {
                    [Op.substring]: req.body.name
                }
            }
        }
    }
    if (req.body.id) {
        w = {
            where: {
                typePartId: req.body.typePartId
            }
        }
    }
    const q = (req.body.name) ?
        SubPart.findAll(w) : 
        SubPart.findAll();
    q.then(result => {
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

subpart.post('/add', (req, res) => {
    SubPart.create(req.body).then(result => {
        res.json({
            message: result.dataValues,
        });
    }).catch(err => {
        res.status(400).json({
            message: { error: err },
        });
    });
});

subpart.post('/detail', (req, res) => {
    SubPart.findOne({
        where: { id: req.body.id }
    }).then(result => {
        if (result) {
            res.json({
                message: result.dataValues,
            });
        }
        else {
            res.status(400).json({
                message: { error: 'subpart does not exist' },
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: { error: err },
        });
    });
});

subpart.post('/delete', (req, res) => {
    SubPart.findOne({
        where: { id: req.body.id }
    }).then(result => {
        if (result) {
            SubPart.destroy({
                where: { id: result.dataValues.id }
            }).then(r => {
                res.json({
                    message: result.dataValues,
                });
            }).catch(err => {
                res.status(400).json({
                    message: { error: err },
                });
            });
        }
        else {
            res.status(400).json({
                message: { error: 'subpart does not exist' },
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: { error: err },
        });
    });
});

subpart.post('/edit', (req, res) => {
    SubPart.findOne({
        where: { id: req.body.id }
    }).then(result => {
        if (result) {
            const  { id, ...reqWithoutId } = req.body;
            SubPart.update(reqWithoutId, {
                where: {
                    id: id
                }
            }).then(updated => {
                if (updated) {
                    res.json({
                        message: req.body,
                    });
                }
                else {
                    res.status(400).json({
                        message: { error: 'database error' },
                    });
                }
            }).catch(err => {
                res.status(400).json({
                    message: { error: err },
                });
            });
        }
        else {
            res.status(400).json({
                message: { error: 'subpart does not exist' },
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: { error: err },
        });
    });
});

module.exports = subpart;
