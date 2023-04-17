const {log} = require("../../../commons/helpers");
const Environment = require("../../Environment/models/Environment");
const Project = require("../../Project/models/Project");
const {Op, Sequelize} = require("sequelize");
const Helpers = require('./../../../commons/helpers');
const Release = require("../../Release/models/Release");

//Action declare

const getListEnvironment = async (filter) => {
	filter.offset = (filter.page > 1) ? (filter.page-1) * filter.per_page : 0
	let whereCondition = []

	if(filter.project_id) whereCondition.push({[Op.and]: {project_id: filter.project_id}});
	if(filter.name) whereCondition.push({[Op.and]: {name: {[Op.like]: `%${filter.name}%`}}});
	if(filter.env_id) whereCondition.push({[Op.and]: {id: filter.env_id}});

	if(filter.platform){
		whereCondition.push({
			[Op.and]: [Sequelize.literal("exists (select env_id from releases where `Environment`.`id` = `releases`.`env_id` AND `releases`.`platform` ="+ `'${filter.platform}'` +")")]
		});
	}


	let order_by = []
	if(filter.order_by_created_at && filter.order_by_created_at === 'desc' || filter.order_by_created_at === 'asc'){
		order_by = [
			['created_at',filter.order_by_created_at],
			['id',filter.order_by_created_at],
		]
	}

	if(!filter.per_page || filter.per_page <= 0) {

		const data = await Environment.findAll({
			where: {
				[Op.and]: whereCondition,
			},
			order: order_by,
			include : [
				'project',
			]
		});

		return {data}
	}
	const data = await Environment.findAndCountAll({
		where: {
			[Op.and]: whereCondition
		},
		offset: parseInt(filter.offset),
		limit: parseInt(filter.per_page),
		order: order_by,
		include : ['project']
	})
	return Helpers.parsePaginationData(data, filter);
}

const createEnvironment = async (credentials) => {
	let environment = await Environment.create(credentials);
	return environment;
}

const getDetailEnvironment = async id => {
	let environment = await Environment.findOne({
		where: {
			id: id
		},
	});
	return environment
}

const updateEnvironment = async (id,credentials) => {
	let environment = await Environment.update(credentials, { where: { id: id } });
	return environment
}

const deleteEnvironment =  async (id) => {
	let environment = await Environment.destroy({ where: { id: id } });
	return environment;
}

const getReleaseByEnvironment = async (id) => {
	let whereCondition = []
	let  orderBy = [
		['created_at','desc'],
		['id','desc'],
	];
	whereCondition.push({[Op.and]: {env_id: id}});
	const data =  await Release.findAll({
		where: {
			[Op.and]: whereCondition
		},
		order: orderBy,
		include : ['project','environment']
	});
	return {data}
}



const EnvironmentService = {
	getListEnvironment,
	createEnvironment,
	getDetailEnvironment,
	updateEnvironment,
	deleteEnvironment,
	getReleaseByEnvironment,
}

module.exports = EnvironmentService
