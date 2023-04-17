const User = require("../models/User");
const { check, validationResult, body } = require('express-validator');

const validateRegisterUser = async (req, res, next) => {

	await check('name')
		.isLength({ min: 1 }).withMessage('Name is required')
		.run(req);

	await check('password')
		.isLength({ min: 6 }).withMessage('must be at least 6 chars long')
		.run(req);

	await check('password_confirmation').custom((val, {req}) => {
		return val === req.body.password
	}).withMessage('New password is incorrect').run(req);


	await check('email')
		.isEmail().withMessage('Email invalidate')
		.custom(value => {
			return User.findOne({
				where: {
					email: value
				}
			}).then(user => {
				// console.log(user,'user validate')
				if (user) {
					return Promise.reject('E-mail already in use');
				}
			})
		})
		.run(req);


	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.status(422).json({
			errors: errors.array()
		});
	} else {
		next();
	}

}

module.exports = validateRegisterUser;
