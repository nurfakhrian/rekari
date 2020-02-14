const express = require('express');
const cors = require('cors');
const models = require('../models');
const TypePart = require('../models/typepart')(models.sequelize, models.Sequelize.DataTypes);
const { Op } = require("sequelize");

const typepart = express.Router();

typepart.use(cors());

typepart.post('/', (req, res) => {
    let w = {where: {}, include: ['subParts']};
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
    models.TypePart.findAll(w).then(result => {
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

typepart.post('/add', (req, res) => {
    models.TypePart.create(req.body, {
        include: ['subParts']
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

typepart.post('/detail', (req, res) => {
    models.TypePart.findOne({
        where: { id: req.body.id },
        include: ['subParts']
    }).then(result => {
        if (result) {
            res.json({
                message: result.dataValues,
            });
        }
        else {
            res.status(400).json({
                message: { error: 'typepart does not exist' },
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: { error: err },
        });
    });
});

typepart.post('/delete', (req, res) => {
    models.TypePart.findOne({
        where: { id: req.body.id }
    }).then(result => {
        if (result) {
            models.TypePart.destroy({
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
                message: { error: 'typepart does not exist' },
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: { error: err },
        });
    });
});

typepart.post('/edit', (req, res) => {
    models.TypePart.findOne({
        where: { id: req.body.id },
        include: ['subParts']
    }).then(result => {
        if (result) {
            const  { id, ...reqWithoutId } = req.body;
            models.TypePart.update(reqWithoutId, {
                where: { id: id }
            }).then(updated => {
                if (updated) {
                    let subPartsToAction;
                    const { initialNSubPart, nSubPart, subParts } = req.body;
                    const n = Math.abs(nSubPart - initialNSubPart);
                    subPartsToAction = (nSubPart != initialNSubPart) ? subParts.splice(-n, n) : [];
                    let updateSubPart = subParts.map(item => {
                        const  { id, ...itemWihoutId } = item;
                        return models.SubPartDetail.update(itemWihoutId, {
                            where: { id: item.id }
                        }).then(subpart => {
                            return subpart
                        }).catch(err => {
                            res.status(400).json({
                                message: { error: err },
                            });
                        });
                    });
                    Promise.all(updateSubPart).then(r => {
                        if (nSubPart != initialNSubPart) {
                            let subPartQuery = () => {};
                            if (nSubPart > initialNSubPart) {
                                subPartQuery = (subPart) => models.SubPartDetail.create(subPart)
                            }
                            if (nSubPart < initialNSubPart) {
                                subPartQuery = (subPart) => models.SubPartDetail.destroy({ where: { id: subPart.id } });
                            }
                            return Promise.all(subPartsToAction.map(subPart => {
                                return subPartQuery(subPart)
                                    .then(rs => rs)
                                    .catch(err => {
                                        res.status(400).json({
                                            message: { error: err },
                                        });
                                    });
                            })).then(rs => {
                                res.json({
                                    message: req.body,
                                });
                            })
                        }
                        res.json({
                            message: req.body,
                        });
                        
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
                message: { error: 'typepart does not exist' },
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: { error: err },
        });
    });
});

module.exports = typepart;
