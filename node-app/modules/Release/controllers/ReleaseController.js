const {log, UploadFile, replaceFileContent} = require("../../../commons/helpers");
const ReleaseService = require("../services/ReleaseService");

//Action declare
const apiCreateRelease = async (req, res) => {
	try{
		let credentials  = {
			...req.body,
			files : req.files
		};

		let release = await  ReleaseService.createRelease(credentials);

		res.json({
			msg: 'register success',
			data : release
		})
	} catch (e) {
		console.log(e)
	}

}

const apiGetListReleases = async (req, res) => {
	let credentials  = req.query;

	let data = await ReleaseService.getListReleases(credentials);

	res.json({
		msg: 'get list success',
		...data
	})
}

const apiGetReleaseDetail = async (req,res) => {

	let data = await ReleaseService.getReleaseDetail(req.params.id);

	res.json({
		msg: 'get detail success',
		data : data
	})
}

const apiDeleteRelease  = async (req,res) => {
	await ReleaseService.deleteRelease(req.params.id);
	res.json({
		msg: 'delete success',
	})
}

const apiReleaseByEnvironment = async (req,res) => {
	let credentials  = req.query;
	let data = await ReleaseService.releaseByEnvironment(credentials);
	res.json({
		msg: 'get list success',
		...data
	})
}

const apiReleaseLasted = async (req,res) => {
	try {
		let data = await ReleaseService.releaseLasted(req.params.id);
		res.json({
			msg: 'get detail success',
			data : data
		})
	} catch (error) {
		res.json({
			msg: 'Failed',
		},500)
	}
}


const ReleaseController = {
	apiCreateRelease,
	apiGetListReleases,
	apiGetReleaseDetail,
	apiDeleteRelease,
	apiReleaseByEnvironment,
	apiReleaseLasted
}

module.exports = ReleaseController
