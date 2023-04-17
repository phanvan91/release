const express = require('express');
const ReleaseController = require("../../Release/controllers/ReleaseController");
const ProjectController = require("../controllers/ProjectController");
const userAuth = require('./../../User/middlewares/UserAuthorization');
const router = express.Router();

//Router List
router.get('/project',ProjectController.apiGetListProjects);
router.get('/project/:id',ProjectController.apiGetDetailProject);
router.post('/project/create', userAuth, ProjectController.apiCreateProject);
router.post('/project/:id', userAuth, ProjectController.apiUpdateProject);
router.delete('/project/:id', userAuth, ProjectController.apiDeleteProject);


module.exports = router
