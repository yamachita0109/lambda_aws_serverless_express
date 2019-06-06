'use strict';
const db = require('../db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
require('date-utils');

const UserModel = db.define('user', {
    'id': {
        field: 'id',
        type: Sequelize.INTEGER(),
        primaryKey: true,
        autoIncrement: true
    },
    'name': {
        field: 'name',
        type: Sequelize.STRING(10),
        allowNull: false
    }
});

const findAll = () => new Promise((resolve, reject) => {
    UserModel.findAll()
        .then((result) => {
            resolve(result);
        })
        .catch((err) => {
            reject(err);
        });
});

module.exports = {
    db,
    findAll
};