const {log} = require("../../../commons/helpers");
const ProjectService = require("../services/ProjectService");

//Action declare

const apiGetListProjects = async (req, res) =>{

	let credentials  = req.query;

	let data = await ProjectService.getProjects(credentials);

	res.json({
		msg: 'get list success',
		...data
	})
}

const apiCreateProject = async (req, res) => {
	let credentials  = req.body;
	let project = await ProjectService.createProject(credentials);
	res.json({
		msg: 'create success',
		data : project
	})
}

const apiGetDetailProject = async (req, res) => {

	let project = await ProjectService.getDetailProject(req.params.id);

	res.json({
		msg: 'create success',
		data : project
	})
}

const apiUpdateProject = async (req, res) => {
	let credentials  = req.body;
	await ProjectService.updateProject(req.params.id,credentials);
	res.json({
		msg: 'update success',
	})
}

const apiDeleteProject = async (req, res) => {
	await ProjectService.deleteProject(req.params.id);
	res.json({
		msg: 'delete success',
	})
}

const ProjectController = {
    //action
	apiGetListProjects,
	apiCreateProject,
	apiGetDetailProject,
	apiUpdateProject,
	apiDeleteProject
}

module.exports = ProjectController
