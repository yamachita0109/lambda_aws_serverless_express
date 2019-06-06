'use strict';
const Sequelize = require('sequelize');
const mysql_host = process.env.DB_HOST,
    mysql_dbname = process.env.DB_NAME,
    mysql_user = process.env.DB_USER,
    mysql_password = process.env.DB_PASS;

console.log('MySQL Server Name: ' + mysql_host);
console.log('MySQL User Name: ' + mysql_user);
console.log('MySQL Database Name: ' + mysql_dbname);

const sequelize = new Sequelize(mysql_dbname, mysql_user, mysql_password, {
    host: mysql_host,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

function createSingleConnection() {
    sequelize.authenticate()
    .then(() => {
        console.log('Success DB connection');
    })
    .catch((err) => {
        console.log('Failure test connection', error);
        if (err.code === 'Success DB connection') {
            createSingleConnection();
        } else {
            throw err;
        }
    });
}
createSingleConnection()

module.exports = sequelize;