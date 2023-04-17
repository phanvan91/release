const User = require('./../models/User');
const RoleUser = require('./../models/RoleUser');
const Role  = require('./../models/Role');
const Password = require("node-php-password");
const moment = require('moment');
const Environment = require("../../Environment/models/Environment");
const Helpers = require('./../../../commons/helpers');
const {Op} = require("sequelize");
const registerUser = async (credentials) => {
	try {
		let data = {
			...credentials,
			password :Password.hash(credentials.password),
			created_at : moment().format('YYYY-MM-DD HH:mm:ss'),
			updated_at : moment().format('YYYY-MM-DD HH:mm:ss'),
		}
		const create_user = await User.create(data);

		// insert role
		await RoleUser.create({
			RoleId : 1,
			UserId : create_user.id,
		})

		const user = await User.findOne({
			where: {
				id: create_user.id
			},
			attributes: {
				exclude: ['password', 'remember_token']
			},
			include: ['roles']
		})
		return user;
	}catch (e){
		throw Error(`Register Failed`);
	}
}

const getListUser = async filter => {
	filter.offset = (filter.page > 1) ? (filter.page-1) * filter.per_page : 0
	let whereCondition = []
	if(filter.project_id) whereCondition.push({[Op.and]: {project_id: filter.project_id}});
	if(filter.name) whereCondition.push({[Op.and]: {name: {[Op.like]: `%${filter.name}%`}}});

	let order_by = []
	if(filter.order_by_created_at && filter.order_by_created_at === 'desc' || filter.order_by_created_at === 'asc'){
		order_by = [
			['created_at',filter.order_by_created_at],
			['id',filter.order_by_created_at],
		]
	}

	if(!filter.per_page || filter.per_page <= 0) {
		const data = await User.findAll({
			where: {
				[Op.and]: whereCondition
			},
			order: order_by,
			include : ['roles'],
			attributes : {
				exclude: ['password', 'remember_token']
			}
		});
		return {data}
	}
	const data = await User.findAndCountAll({
		where: {
			[Op.and]: whereCondition
		},
		offset: parseInt(filter.offset),
		limit: parseInt(filter.per_page),
		order: order_by,
		include : ['roles'],
		attributes : {
			exclude: ['password', 'remember_token']
		}
	})
	return Helpers.parsePaginationData(data, filter);
}

const updateUser = async (id,credentials) => {

	if(credentials.name) {
		await User.update({name : credentials.name}, { where: { id: id } });
	}

	if(credentials.password) {
		await User.update({password : Password.hash(credentials.password)}, { where: { id: id } });
	}

	if(credentials.role_id && Array.isArray(credentials.role_id) && credentials.role_id.length > 0) {

		await RoleUser.destroy({ where: { UserId: id } });

		await Promise.all(credentials.role_id.map(async (role_id)=> {
			await RoleUser.create({
				RoleId : role_id,
				UserId : id
			});
		}));
	}

	const user = await User.findOne({
		where: {
			id: id
		},
		attributes: {
			exclude: ['password', 'remember_token']
		},
		include: ['roles']
	});
	return user;
}

const getListRole = async (filter) => {
	filter.offset = (filter.page > 1) ? (filter.page-1) * filter.per_page : 0
	let whereCondition = []
	if(!filter.per_page || filter.per_page <= 0) {
		const data = await Role.findAll({
			where: {
				[Op.and]: whereCondition
			},
		});
		return {data}
	}
	const data = await User.findAndCountAll({
		where: {
			[Op.and]: whereCondition
		},
		offset: parseInt(filter.offset),
		limit: parseInt(filter.per_page),
	})
	return Helpers.parsePaginationData(data, filter);
}

const getUserDetail = async (id) => {
	const user = await User.findOne({
		where: {
			id: id
		},
		attributes: {
			exclude: ['password', 'remember_token']
		},
		include: ['roles']
	});
	return user;
}

const deleteUser = async id => {
	const user = await User.destroy({ where: { id: id } });
	return user;
}

const UserService = {
	registerUser,
	getListUser,
	updateUser,
	getListRole,
	getUserDetail,
	deleteUser
}

module.exports = UserService;

