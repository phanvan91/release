const { DataTypes } = require('sequelize');
const DB = require('./../../../commons/db')
const Role = require("./Role");
const User = require("./User");

const RoleUser = DB.instance.define('RoleUser', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    RoleId: {
        type: DataTypes.BIGINT.UNSIGNED,
        references: {
            model: Role,
            key: 'id'
        },
        field: 'role_id'
    },
    UserId: {
        type: DataTypes.BIGINT.UNSIGNED,
        references: {
            model: User,
            key: 'id'
        },
        field: 'user_id'
    }
}, {
    tableName: 'role_users',
    timestamps: false
});

// RoleUser.belongsTo(Role, {as: 'roles', foreignKey: 'role_id'});
// RoleUser.belongsTo(User, {as: 'users', foreignKey: 'user_id'});


module.exports = RoleUser
