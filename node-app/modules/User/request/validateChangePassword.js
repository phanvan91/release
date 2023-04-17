const User = require("../models/User");
const { check, validationResult } = require('express-validator');
const Password = require('node-php-password');

const ValidateChangePassword = async (req, res, next)  => {


	const user = await User.findByPk(req.user.id);
	// console.log(req.body,'user')

	await check('password').custom((val, {req}) => {
		return Password.verify(val, user.password);
	}).withMessage('Mật khẩu hiện tại không đúng').run(req);

	await check('new_password').custom((val, {req}) => {
		return val.length >= 6
	}).withMessage('Mật khẩu mới quá ngắn').run(req);

	await check('new_password_confirmation').custom((val, {req}) => {
		return val === req.body.new_password
	}).withMessage('Mật khẩu mới không khớp').run(req);


	const errors = validationResult(req);
	// console.log(errors)
	// console.log(errors,'errors')

	if (!errors.isEmpty()) {
		res.status(422).json({
			errors: errors.array()
		});
	} else {
		next();
	}

}


module.exports = ValidateChangePassword
