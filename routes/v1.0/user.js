'use strict';
const express = require('express');
const user = require('../../models/user');
require('date-utils');
const router = express.Router();

const validate = (req, res, next) => {
    next();
}

const beforeExecute = (req, res, next) => {
    next();
}

const execute = (req, res, next) => {
    user.findAll().then((result) => {
        req.result = result;
        next();
    }).catch((e) => {
        next(e);
    });
}

const afterExecute = (req, res, next) => {
    next();
}

router.get('/', validate, beforeExecute, execute, afterExecute);

module.exports = router;