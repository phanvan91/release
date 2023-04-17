const { Sequelize } = require('sequelize');
const path = require('path')
const fs = require('fs');
const configs = require('./configs')
const {log} = require("./helpers");


let option = {
    host: configs.db_host,
    port: configs.db_port,
    dialect: configs.db_dialect,
    logging: false
}

const instance = new Sequelize(
    configs.db_name,
    configs.db_username,
    configs.db_password,
    option
);

const testConnect = async () => {
    try {
        await instance.authenticate();
        // log.info('Connection has been established successfully.');
    } catch (error) {
        // log.error('Unable to connect to the database:', error);
    }
}

const DB = {
    instance,
    testConnect
}

module.exports = DB