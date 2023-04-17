const { DataTypes, Sequelize} = require('sequelize');
const DB = require('./../../../commons/db')
const Project = require("../../Project/models/Project");
const moment = require("moment");

const Environment = DB.instance.define('Environment', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    project_id: {
        type: DataTypes.BIGINT.UNSIGNED,
    },

    name: {
        type: DataTypes.STRING,
    },

    baseurl: {
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
    tableName: 'environments',
    timestamps: true,
    createdAt: "created_at", // alias createdAt as created_date
    updatedAt: "updated_at", // alias updatedAt as updated_at
});

Environment.belongsTo(Project, {
    foreignKey: 'project_id',
    as: "project",
});

module.exports = Environment
