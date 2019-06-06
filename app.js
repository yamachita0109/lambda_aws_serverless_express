'use strict';
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const dotenv = require('dotenv');
const app = express();

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

const isProd = () => {
  return !!process.env.AWS_REGION
}

if (!isProd()) {
    // init local env 
    dotenv.config();
}

/**
 * Common Json Response
 */
const commonJsonResponse = (req, res) => {
    console.log('Common Json Response');
    console.log(req.result);
    res.json({
        'res': req.result
    });
}

/**
 * v1.0
 */
app.use('/v1.0/user', require('./routes/v1.0/user.js'), commonJsonResponse);

/**
 * Common Error Handling
 */
app.use((err, req, res, next) => {
    console.error('Common Error Handling');
    console.error(err);
    const errStatus = err.status ? err.status : 500,
        errMessage = err.message ? err.message : 'システムエラーが発生しました。';

    res.status(errStatus).json({'errors': [{
        'message': errMessage
    }]});
});

module.exports = app;