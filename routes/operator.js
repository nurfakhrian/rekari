const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const models = require('../models');
const Operator = require('../models/operator')(models.sequelize, models.Sequelize.DataTypes);

const operator = express.Router();
const SECRET_KEY = "hiams_ib";

operator.use(cors());

operator.post('/register', (req, res) => {
    const newOperator = {
        code: req.body.code,
        name: req.body.name,
        password: "",
    }
    Operator.findOne({
        where: { code: req.body.code }
    }).then(result => {
        if (!result) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                newOperator.password = hash;
                Operator.create(newOperator).then(result => {
                    const { password, ...rest } = result.dataValues;
                    console.log(rest);
                    console.log(result);
                    res.json({ 
                        data: rest,
                        error: null
                    });
                }).catch(err => {
                    res.status(400).json({ error: err });
                });
            });
        }
        else {
            res.status(400).json({ error: 'user already exists' });
        }
    }).catch(err => {
        res.status(400).json({ error: err });
    });
});

operator.post('/login', (req, res) => {
    Operator.findOne({
        where: { code: req.body.code }
    }).then(result => {
        if (result) {
            if (bcrypt.compareSync(req.body.password, result.password)) {
                const token = jwt.sign(result.dataValues, SECRET_KEY, { expiresIn: "10h" });
                res.json({
                    data: {
                        id: result.id,
                        code: result.code,
                        name: result.name
                    },
                    token: token,
                    error: null
                });
            }
            else {
                res.status(400).json({ error: 'username or password is wrong' });
            }
        }
        else {
            res.status(400).json({ error: 'operator does not exist' });
        }
    }).catch(err => {
        res.status(400).json({ error: err });
    });
});

module.exports = operator;
