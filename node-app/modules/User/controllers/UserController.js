const UserService = require("../services/UserService");


const apiRegisterUser = async (req, res) => {
	let data = {
		email : req.body.email,
		password : req.body.password,
		name : req.body.name
	}
	let user = await UserService.registerUser(data);

	res.json({
		msg: 'login success',
		data : user
	})
}

const apiListUser = async (req, res) => {
	let users = await UserService.getListUser(req.query);
	res.json({
		msg: 'get users success',
		...users
	})
}

const apiUpdateUser = async (req, res) => {
	let params = {
		name : req.body.name ?? '',
		role_id : req.body.role_id ?? [],
		password :  req.body.password ?? '',
	}
	let user = await UserService.updateUser(req.params.id,params);
	res.json({
		msg: 'get users success',
		data : user
	})
}

const apiGetListRole = async (req, res) => {
	let roles = await UserService.getListRole(req.query);
	res.json({
		msg: 'get roles success',
		...roles
	})
}

const apiGetUserDetail = async (req, res) => {
	let user = await UserService.getUserDetail(req.params.id);
	res.json({
		msg: 'get roles success',
		data : user
	})
}

const apiDeleteUser = async (req, res) => {
	await UserService.deleteUser(req.params.id);
	res.json({
		msg: 'delete success',
	})
}

const UserController = {
	apiRegisterUser,
	apiListUser,
	apiUpdateUser,
	apiGetListRole,
	apiGetUserDetail,
	apiDeleteUser
}

module.exports = UserController;

