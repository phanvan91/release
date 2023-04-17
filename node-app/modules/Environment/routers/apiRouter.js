const express = require('express');
const ProjectController = require("../../Project/controllers/ProjectController");
const EnvironmentController = require("../controllers/EnvironmentController");
const userAuth = require('../../User/middlewares/UserAuthorization');
const router = express.Router();

//Router List

router.get('/environment',EnvironmentController.apiGetListEnvironment);
router.get('/environment/:id',EnvironmentController.apiGetDetailEnvironment);
router.post('/environment/create',userAuth , EnvironmentController.apiCreateEnvironment);

router.post('/environment/:id',userAuth , EnvironmentController.apiUpdateEnvironment);
router.delete('/environment/:id',userAuth , EnvironmentController.apiDeleteEnvironment);

router.get('/environment/:id/releases', EnvironmentController.apiGetReleaseByEnvironment);




module.exports = router
