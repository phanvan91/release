const {log} = require("../../../commons/helpers");
const EnvironmentService = require("../services/EnvironmentService");

//Action declare

const apiGetListEnvironment = async (req,res) => {
	let credentials  = req.query;
	let data = await EnvironmentService.getListEnvironment(credentials);

	res.json({
		msg: 'get list success',
		...data
	})
}

const apiCreateEnvironment = async (req,res) => {
	let credentials  = req.body;
	let environments = await EnvironmentService.createEnvironment(credentials);

	res.json({
		msg: 'create success',
		data : environments
	})
}

const apiGetDetailEnvironment = async (req,res) => {

	let environments = await EnvironmentService.getDetailEnvironment(req.params.id);
	res.json({
		msg: 'get detail success',
		data : environments
	})
}

const apiUpdateEnvironment = async (req,res) => {
	let credentials  = req.body;
	await EnvironmentService.updateEnvironment(req.params.id,credentials);
	res.json({
		msg: 'get detail success',
	})
}

const apiDeleteEnvironment = async (req,res) => {
	await EnvironmentService.deleteEnvironment(req.params.id);
	res.json({
		msg: 'delete success',
	})
}

const apiGetReleaseByEnvironment  = async (req,res) => {
	let data = await EnvironmentService.getReleaseByEnvironment(req.params.id);
	res.json({
		msg: 'delete success',
		...data,
	})
}



const EnvironmentController = {
	apiGetListEnvironment,
	apiCreateEnvironment,
	apiGetDetailEnvironment,
	apiUpdateEnvironment,
	apiDeleteEnvironment,
	apiGetReleaseByEnvironment
}

module.exports = EnvironmentController
