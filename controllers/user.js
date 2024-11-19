const UserValidation = require('../validations/user');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { NotFoundError } = require('../utils/error');
const { JWT_SECRET } = process.env;

module.exports = {
    create: async (req, res, next) => {
        try {
            await UserValidation.validateRegister(req.body);
            const userData = await User.create(req.body);

            return res.status(201).json({
                status: 'OK',
                message: 'Successfully registered',
                data: userData
            });
        } catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) => {
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
            next(err);
        }
    },
    googleAuth: (req, res) => {
        const accessToken = jwt.sign({ ...req.user, password: null }, JWT_SECRET);
        
        return res.status(200).json({
            status: 'OK',
            message: 'Successfully logged in',
            data: {
                accessToken
            }
        });
    },
    getAll: async (req, res, next) => {
        try {
            const usersData = await User.findAll();

            if (!usersData) {
                return res.status(200).json({
                    status: 'OK',
                    message: 'Users is empty',
                    data: []
                });
            }

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully retrieved users data',
                data: usersData
            });
        } catch (err) {
            next(err);
        }
    },
    getById: async (req, res, next) => {
        try {
            await UserValidation.validateId(req.params);
            const userData = await User.findById(req.params.id);

            if (!userData) {
                throw new NotFoundError('User not found');
            }

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully retrieved user details',
                data: {
                    ...userData.user,
                    profile: { ...userData.profile }
                }
            });
        } catch (err) {
            next(err);
        }
    },
    deleteById: async (req, res, next) => {
        try {
            await UserValidation.validateId(req.params);
            const result = await User.removeById(req.params.id);

            if (!result) {
                throw new NotFoundError('User not found');
            }

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully deleted user'
            });
        } catch (err) {
            next(err);
        }
    },
};