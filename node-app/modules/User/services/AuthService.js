const bcrypt = require('bcrypt');
const Password = require('node-php-password');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const User = require('./../models/User');

const loginUser = (credentials) => {
    return new Promise(async (resolve) => {
        try{
            const user = await User.findOne({
                where: {
                    email: credentials.email
                },
                include: [
                    'roles'
                ]
            });


            if(user === null){
                return resolve(false);
            }else{
                const expiredTime = (new Date()).getTime() + 86400*1000
                let authCheck = Password.verify(credentials.password, user.password);
                if(authCheck){
                    const token = jwt.sign({ uid: user.id, exp: expiredTime}, process.env.JWT_PRIVATE_KEY);
                    return resolve({
                        user,
                        token
                    })
                }else return resolve(false)

            }
        }catch(error){
            _log.error(error)
            return resolve(false);
        }
    })
}

const getAuthUser = async (token) => {
    const jwtData = jwt.decode(token)
    console.log(jwtData)
}

const changePassword = async (credentials) =>{
    try {
        let new_password = Password.hash(credentials.new_password);
        let user = await User.update({
            password : new_password
        },{
            where: { id: credentials.user_id },
        });

       return user;
    } catch (error) {
        throw Error(`Update Failed`);
    }
}

const logoutUser = async (id) => {

}

const AuthService = {
    loginUser,
    changePassword
}

module.exports = AuthService
