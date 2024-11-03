const UserValidation = require('../validation/user');
const User = require('../models/user');

module.exports = {
    create: async (req, res) => {
        try {
            await UserValidation.validate(req.body);
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
    }
};