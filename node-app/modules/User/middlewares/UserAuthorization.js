const jwt = require('jsonwebtoken')
const User = require('../models/User')

const userAuth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_PRIVATE_KEY)

        const user = await User.findOne({
            where: {
                id: data.uid
            },
            attributes: {
                exclude: ['password', 'remember_token']
            },
            include: ['roles']
        })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({
            error: true,
            msg: 'Not authorized to access this resource'
        })
    }
}

module.exports = userAuth
