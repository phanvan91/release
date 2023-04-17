const {log} = require("../../../commons/helpers");
const {check, validationResult} = require("express-validator");

//Action declare

const validateReleaseRequest = async (req, res, next) => {
    //action
	await check('project_id')
		.isLength({ min: 1 }).withMessage('project_id is required')
		.run(req);

	await check('env_id')
		.isLength({ min: 1 }).withMessage('env_id is required')
		.run(req);

	await check('platform')
		.isLength({ min: 1 }).withMessage('platform is required')
		.run(req);

	await check('platform')
		.isIn(['android','ios','windows']).withMessage('platform is in android vs ios')
		.run(req);

	await check('version')
		.isLength({ min: 1 }).withMessage('version is required')
		.run(req);

	await check('title')
		.isLength({ min: 1 }).withMessage('title is required')
		.run(req);

	if(req.body.platform === 'ios' && req.files['ipa'] && req.files['ipa'].size ){
		await check('bundle-identifier')
			.isLength({ min: 1 }).withMessage('bundle-identifier is required')
			.run(req);

		await check('bundle-version')
			.isLength({ min: 1 }).withMessage('bundle-version is required')
			.run(req);

		await check('bundle-title')
			.isLength({ min: 1 }).withMessage('bundle-version is required')
			.run(req);
	}

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.status(422).json({
			errors: errors.array()
		});
	} else {
		next();
	}
}

module.exports = validateReleaseRequest
