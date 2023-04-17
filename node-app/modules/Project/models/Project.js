const { DataTypes, Sequelize} = require('sequelize');
const DB = require('./../../../commons/db')
const moment = require("moment");

const Project = DB.instance.define('Project', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },

    giturl: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        get() {
            return this.getDataValue('created_at') ? moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss') : null;
        }
    },
    updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        get() {
            return this.getDataValue('updated_at') ?  moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss') : null;
        }
    }
}, {
    tableName: 'projects',
    timestamps: true,
    createdAt: "created_at", // alias createdAt as created_date
    updatedAt: "updated_at", // alias updatedAt as updated_at
});

module.exports = Project
