const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const models = require('../models');
const Operator = require('../models/operator')(models.sequelize, models.Sequelize.DataTypes);
const { Op } = require("sequelize");

const operator = express.Router();
const SECRET_KEY = "hiams_ib";

operator.use(cors());

operator.post('/', (req, res) => {
    let w;
    if (req.body.code && req.body.role) {
        w = {
            where: {
                [Op.and]: [
                    { 
                        code: {
                            [Op.substring]: req.body.code
                        }
                    },
                    { 
                        role: req.body.role
                    }
                ]
            }
        }
    }

    if (req.body.code && !req.body.role) {
        w = {
            where: {
                code: {
                    [Op.substring]: req.body.code
                }
            }
        }
    }

    if (!req.body.code && req.body.role) {
        w = {
            where: {
                role: req.body.role
            }
        }
    }

    const q = (req.body.code || req.body.role) ?
        Operator.findAll(w) : 
        Operator.findAll();
    q.then(result => {
        if (result) {
            let safeResult = result.map(obj => {
                const { password, ...rest } = obj.dataValues;
                return rest;
            });
            res.json({
                message: safeResult
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: { error: err },
        });
    });
});

operator.post('/add', (req, res) => {
    const newOperator = {
        code: req.body.code,
        name: req.body.name,
        role: req.body.role,
        password: "",
    }
    Operator.findOne({
        where: { code: req.body.code }
    }).then(result => {
        if (!result) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                newOperator.password = hash;
                Operator.create(newOperator).then(result => {
                    const { password, ...safeResult } = result.dataValues;
                    res.json({
                        message: safeResult,
                    });
                }).catch(err => {
                    res.status(400).json({
                        message: { error: err },
                    });
                });
            });
        }
        else {
            res.status(400).json({
                message: { error: 'user already exists' },
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: { error: err },
        });
    });
});

operator.post('/login', (req, res) => {
    Operator.findOne({
        where: { code: req.body.code }
    }).then(result => {
        if (result) {
            if (bcrypt.compareSync(req.body.password, result.password)) {
                const token = jwt.sign(result.dataValues, SECRET_KEY, { expiresIn: "10h" });
                const { password, ...safeResult } = result.dataValues;
                res.json({
                    message: safeResult,
                    token: token
                });
            }
            else {
                res.status(400).json({
                    message: { error: 'username or password is wrong' },
                });
            }
        }
        else {
            res.status(400).json({
                message: { error: 'operator does not exist' },
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: { error: err },
        });
    });
});

operator.post('/detail', (req, res) => {
    Operator.findOne({
        where: { id: req.body.id }
    }).then(result => {
        if (result) {
            const { password, ...safeResult } = result.dataValues;
            res.json({
                message: safeResult,
            });
        }
        else {
            res.status(400).json({
                message: { error: 'operator does not exist' },
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: { error: err },
        });
    });
});

operator.post('/delete', (req, res) => {
    Operator.findOne({
        where: { id: req.body.id }
    }).then(result => {
        if (result) {
            const { password, ...safeResult } = result.dataValues;
            Operator.destroy({
                where: { id: result.dataValues.id }
            }).then(r => {
                res.json({
                    message: safeResult,
                });
            });
        }
        else {
            res.status(400).json({
                message: { error: 'operator does not exist' },
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: { error: err },
        });
    });
});

operator.post('/edit', (req, res) => {
    Operator.findOne({
        where: { id: req.body.id }
    }).then(result => {
        if (result) {
            if (req.body.password) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    req.body.password = hash;
                    const  { id, ...newData } = req.body;
                    Operator.update(newData, {
                        where: {
                            id: id
                        }
                    }).then(updated => {
                        if (updated) {
                            const  { password, ...safeResult } = req.body;
                            res.json({
                                message: safeResult,
                            });
                        }
                        else {
                            res.status(400).json({
                                message: { error: 'database error' },
                            });
                        }
                    });
                });
            }
            else {
                const  { id, password, ...newData } = req.body;
                Operator.update(newData, {
                    where: {
                        id: id
                    }
                }).then(updated => {
                    if (updated) {
                        const  { password, ...safeResult } = req.body;
                        res.json({
                            message: safeResult,
                        });
                    }
                    else {
                        res.status(400).json({
                            message: { error: 'database error' },
                        });
                    }
                });
            }
        }
        else {
            res.status(400).json({
                message: { error: 'operator does not exist' },
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: { error: err },
        });
    });
});

operator.post('/change-password', (req, res) => {
    Operator.findOne({
        where: { id: req.body.id }
    }).then(result => {
        if (bcrypt.compareSync(req.body.currentPassword, result.password)) {
            bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                Operator.update({ password: hash }, {
                    where: {
                        id: req.body.id
                    }
                }).then(updated => {
                    if (updated) {
                        res.json({
                            message: updated.dataValues,
                        });
                    }
                    else {
                        res.status(400).json({
                            message: { error: 'database error' }
                        });
                    }
                });
            });
        }
        else {
            res.status(400).json({
                message: { error: "password aktif salah" }
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: { error: err }
        });
    });
});

module.exports = operator;
