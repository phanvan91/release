const { DataTypes } = require('sequelize');
const DB = require('./../../../commons/db')
const User = require("./User");
const RoleUser = require("./RoleUser");


const Role = DB.instance.define('Role', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    display_name: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'roles',
    timestamps: false
});


// Role.belongsToMany(User, {
//     through: RoleUser,
//     as: "users",
//     foreignKey: "role_id"
// });

module.exports = Role
