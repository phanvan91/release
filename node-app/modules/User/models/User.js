const { DataTypes, Sequelize} = require('sequelize');
const DB = require('./../../../commons/db')
const Role = require("./Role");
const RoleUser = require("./RoleUser");
const moment = require("moment");


const User = DB.instance.define('User', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: 'users',
    timestamps: false
});

User.belongsToMany(Role, {
    through: RoleUser,
    as: "roles",
    foreignKey: "user_id"
});



module.exports = User
