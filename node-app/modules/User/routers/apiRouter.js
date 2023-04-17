const express = require('express');
const AuthController = require("../controllers/AuthController");
const userAuth = require("../middlewares/UserAuthorization");
const ValidateChangePassword = require('../request/validateChangePassword');
const validateRegisterUser = require('../request/validateRegisterUser');
const UserController = require("../controllers/UserController");


const router = express.Router();

router.post('/auth/login', AuthController.APILogin);
router.get('/auth/me', userAuth, AuthController.APIGetCurrentUser);
router.get('/auth/logout', userAuth, AuthController.logoutUser);
router.post('/auth/change-password', userAuth, ValidateChangePassword ,AuthController.ChangePassword);


router.post('/auth/register', validateRegisterUser, UserController.apiRegisterUser );
router.get('/auth/user', userAuth, UserController.apiListUser);
router.post('/auth/user/:id', userAuth, UserController.apiUpdateUser);
router.get('/auth/roles', UserController.apiGetListRole);
router.get('/auth/user/:id', UserController.apiGetUserDetail);

router.delete('/auth/user/:id', userAuth, UserController.apiDeleteUser);

module.exports = router
