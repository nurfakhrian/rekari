const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Operator = require('../models/Operator');

const operator = express.Router();
const SECRET_KEY = "hiams_ib";
operator.use(cors());

operator.post('/login', (req, res) => {
    Operator.findOne({
        where: {
            code: req.body.code
        }
    }).then(operator => {
        if (operator) {
            if (bcrypt.compareSync(req.body.password, operator.password)) {
                let token = jwt.sign(operator.dataValues, SECRET_KEY, {
                    expiresIn: "10h"
                });
                res.send(token);
            }
        }
        else {
            res.status(400).json({ error: 'Operator does not exist' });
        }
    })
});