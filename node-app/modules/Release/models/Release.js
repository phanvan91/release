const { DataTypes,Sequelize } = require('sequelize');
const DB = require('./../../../commons/db')
const moment = require('moment');
const Project = require('./../../Project/models/Project');
const Environment = require('./../../Environment/models/Environment');

const Release = DB.instance.define('Release', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    project_id: {
        type: DataTypes.BIGINT.UNSIGNED,
    },

    env_id: {
        type: DataTypes.BIGINT.UNSIGNED,
    },

    platform: {
        type: DataTypes.ENUM({
            values: ['android', 'ios','windows']
        }),
    },

    title: {
        type: DataTypes.STRING,
    },

    note: {
        type: DataTypes.TEXT,
    },

    bundle: {
        type: DataTypes.JSON,
    },

    creator: {
        type: DataTypes.BIGINT.UNSIGNED,
    },

    version: {
        type: DataTypes.STRING,
    },

    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        get() {
            return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
        }
    }

}, {
    tableName: 'releases',
    timestamps: true,
    createdAt: "created_at", // alias createdAt as created_date
    updatedAt: "updated_at", // alias updatedAt as updated_at
});

Release.belongsTo(Project, {
    foreignKey: 'project_id',
    as: "project",
});

Release.belongsTo(Environment, {
    foreignKey: 'env_id',
    as: "environment",
});

module.exports = Release
