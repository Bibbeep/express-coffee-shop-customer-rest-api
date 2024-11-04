const UserValidation = require('../validation/user');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = {
    create: async (req, res) => {
        try {
            await UserValidation.validateRegister(req.body);
            const userData = await User.create(req.body);

            return res.status(201).json({
                status: 'OK',
                message: 'Successfully registered',
                data: userData
            });
        } catch (err) {
            if (err.statusCode) {
                return res.status(err.statusCode).json({
                    status: 'Fail',
                    message: err.message
                });
            }

            return res.status(500).json({
                status: 'Fail',
                message: 'Failed to register'
            });
        }
    },
    login: async (req, res) => {
        try {
            const userPayload = await UserValidation.validateLogin(req.body);
            const accessToken = jwt.sign(userPayload, JWT_SECRET);

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully logged in',
                data: {
                    accessToken
                }
            });
        } catch (err) {
            if (err.statusCode) {
                return res.status(err.statusCode).json({
                    status: 'Fail',
                    message: err.message
                });
            }

            return res.status(500).json({
                status: 'Fail',
                message: 'Failed to login'
            });
        }
    }
};