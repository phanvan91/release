const express = require('express');
const AuthController = require("../../User/controllers/AuthController");
const ReleaseController = require("../controllers/ReleaseController");
const validateReleaseRequest = require("../requests/validateReleaseRequest");
const userAuth = require("../../User/middlewares/UserAuthorization");
const router = express.Router();


//Router List
router.post('/release/register',userAuth,validateReleaseRequest ,ReleaseController.apiCreateRelease);

router.get('/release',ReleaseController.apiGetListReleases);

router.get('/release/:id',ReleaseController.apiGetReleaseDetail);

router.delete('/release/:id', userAuth, ReleaseController.apiDeleteRelease);

router.get('/release-by-environment', ReleaseController.apiReleaseByEnvironment);

router.get('/release-lasted/:id', ReleaseController.apiReleaseLasted);

module.exports = router
