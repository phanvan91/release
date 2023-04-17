const {log} = require("../../../commons/helpers");
const Project = require('./../models/Project');
const Release = require("../../Release/models/Release");
const Environment = require("../../Environment/models/Environment");
//Action declare
const Helpers = require('./../../../commons/helpers');
const {Op} = require("sequelize");

const getProjects = async (filter) => {
	filter.offset = (filter.page > 1) ? (filter.page-1) * filter.per_page : 0
	let whereCondition = []

	if(filter.name) whereCondition.push({[Op.and]: {name: {[Op.like]: `%${filter.name}%`}}});

	let order_by = []
	if(filter.order_by_created_at && filter.order_by_created_at === 'desc' || filter.order_by_created_at === 'asc'){
		order_by = [
			['created_at',filter.order_by_created_at],
			['id',filter.order_by_created_at],
		]
	}

	if(!filter.per_page || filter.per_page <= 0) {
		const data = await Project.findAll({
			where: {
				[Op.and]: whereCondition
			},
			order: order_by,
		});
		return {data}
	}
	const data = await Project.findAndCountAll({
		where: {
			[Op.and]: whereCondition
		},
		offset: parseInt(filter.offset),
		limit: parseInt(filter.per_page),
		order: order_by,
	})
	return Helpers.parsePaginationData(data, filter);

}

const createProject = async (credentials) => {
	let project = await Project.create(credentials);
	return project;
}

const getDetailProject = async id => {
	let project = await Project.findOne({
		where: {
			id: id
		},
	});
	return project;
}

const updateProject = async (id,credentials) => {
	let project = await Project.update(credentials, { where: { id: id } });
	return project;
}

const deleteProject = async id => {
	let project = await Project.destroy({ where: { id: id } });
	return project;
}

const ProjectService = {
	getProjects,
	createProject,
	getDetailProject,
	updateProject,
	deleteProject
}

module.exports = ProjectService
