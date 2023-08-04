require('dotenv').config();

const Sequilize = require('sequelize');

module.exports = new Sequilize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
})
