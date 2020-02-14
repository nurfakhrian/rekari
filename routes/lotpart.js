const express = require('express');
const cors = require('cors');
const models = require('../models');

const lotpart = express.Router();

lotpart.use(cors());

lotpart.post('/add', (req, res) => {
    models.LotPart.create(req.body).then(result => {
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
