const express = require('express');
const cors = require('cors');
const models = require('../models');
const { Op } = require("sequelize");

const lotpart = express.Router();

lotpart.use(cors());

lotpart.post('/', (req, res) => {
    console.log(new Date(req.body.startDate))
    console.log(req.body.startDate)
    console.log(new Date(req.body.endDate))
    console.log(req.body.endDate)
    let w = {
        where: {
            createdAt: {
                [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 48 * 60 * 60 * 1000)
            }
        },
        include: ['lotPartsLotSubParts', 'operator', 'typePart']
    };
    if (req.body.lotpartBarcode && req.body.typePartId) {
        w.where = {
            [Op.and]: [
                { 
                    lotpartBarcode: {
                        [Op.substring]: req.body.lotpartBarcode
                    }
                },
                { 
                    typePartId: req.body.typePartId
                }
            ]
        }
    }
    if (req.body.lotpartBarcode && !req.body.typePartId) {
        w.where = {
            lotpartBarcode: {
                [Op.substring]: req.body.lotpartBarcode
            }
        }
    }
    if (!req.body.lotpartBarcode && req.body.typePartId) {
        w.where = {
            typePartId: req.body.typePartId
        }
    }
    if (req.body.startDate && req.body.endDate) {
        w.where.createdAt = {
            [Op.lt]: new Date(req.body.endDate),
            [Op.gt]: new Date(req.body.startDate)
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

lotpart.post('/detail', (req, res) => {
    models.LotPart.findOne({
        where: { id: req.body.id },
        include: ['lotPartsLotSubParts', 'operator', 'typePart']
    }).then(result => {
        if (result) {
            res.json({
                message: result.dataValues,
            });
        }
        else {
            res.status(400).json({
                message: { error: 'lotpart does not exist' },
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: { error: err },
        });
    });
});

lotpart.post('/edit', async (req, res) => {
    const result = await models.LotPart.findOne({
        where: { id: req.body.id },
        include: ['lotPartsLotSubParts']
    });
    if (!result) {
        res.status(400).json({
            message: { error: 'database error' },
        });
    }
    const  { id, ...reqWithoutId } = req.body;
    const updated = await models.LotPart.update(reqWithoutId, {
        where: { id: id }
    })
    if (!updated) {
        res.status(400).json({
            message: { error: 'database error' },
        });
    }
    const result2 = await models.LotPart.findOne({
        where: { id: req.body.id },
        include: ['lotPartsLotSubParts']
    });
    res.json({
        message: result2,
    });
})

lotpart.post('/edit-subpart', async (req, res) => {
    const result = await models.LotPartsLotSubPart.findOne({
        where: { id: req.body.id }
    });
    if (!result) {
        res.status(400).json({
            message: { error: 'database error' },
        });
    }
    const  { id, ...reqWithoutId } = req.body;
    const updated = await models.LotPartsLotSubPart.update(reqWithoutId, {
        where: { id }
    })
    if (!updated) {
        res.status(400).json({
            message: { error: 'database error' },
        });
    }
    res.json({
        message: req.body,
    });
})

lotpart.post('/delete', (req, res) => {
    models.LotPart.findOne({
        where: { id: req.body.id }
    }).then(result => {
        if (result) {
            models.LotPart.destroy({
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
                message: { error: 'lotpart does not exist' },
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: { error: err },
        });
    });
});

module.exports = lotpart;
