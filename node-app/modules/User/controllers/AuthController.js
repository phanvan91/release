const AuthService = require('../services/AuthService.js')
const {log} = require("../../../commons/helpers");
const jwt = require('jsonwebtoken');


const APILogin = async function(req, res) {
    try{
        const {email, password} = req.body
        const data = await AuthService.loginUser({email, password});
        if(!data){
            res.json({
                msg: 'login failed',
            }, 401)
        }else{
            res.json({
                msg: 'login success',
                data: data
            })
        }
    } catch (e) {
        log.file({
            action: 'node-app/modules/User/controllers/AuthController.js - APILogin',
            msg: e.message
        })
        res.json({
            msg: 'ERROR',
        }, 500)
    }
};

const APIGetCurrentUser = async (req, res) => {
    const data = req.user;
    if(!data){
        res.json({
            msg: 'unauthenticated',
        }, 403)
    }else{
        res.json({
            msg: 'success',
            data: data
        })
    }
}

const ChangePassword = async function(req, res) {

    try{
        const {new_password} = req.body
        await AuthService.changePassword({
            user_id: req.user.id,
            new_password
        });
        res.json({
            msg: 'success',
        }, 200)
    }catch (error){
        res.json({
            msg: error.message,
        }, 400)
    }
}

const logoutUser =  async function(req, res) {

    res.json({
        msg: 'logout user success',
    }, 200)
}

const AuthController = {
    APILogin,
    APIGetCurrentUser,
    ChangePassword,
    logoutUser
}

module.exports = AuthController
