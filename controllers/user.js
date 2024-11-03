const UserValidation = require('../validation/user');

module.exports = {
    create: async (req, res) => {
        try {
            UserValidation.validate(req.body);

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully registered'
            });
        } catch (err) {
            return res.status(err.statusCode).json({
                status: 'Fail',
                message: err.message
            });
        }
    }
};