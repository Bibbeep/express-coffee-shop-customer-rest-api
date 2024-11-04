const User = require('../models/user');
const { BadRequestError, UserExistError, InvalidCredentialError } = require("../utils/error");
const bcrypt = require('bcrypt');

module.exports = {
    validateRegister: async (data) => {
        const { username, email, password, firstName, lastName } = data;

        if (!username || !email || !password || !firstName || !lastName) {
            throw new BadRequestError('username, email, password, firstName, and lastName are required!');
        }

        if (typeof username !== 'string' ||
            typeof email !== 'string' ||
            typeof password !== 'string' ||
            typeof firstName !== 'string' ||
            typeof lastName !== 'string') {
            throw new BadRequestError('username, email, password, firstName, and lastName must be string type!')
        }

        if (!email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            throw new BadRequestError('Email must be in valid format!');
        }

        if (password.length < 9) {
            throw new BadRequestError('Password must be at least 9 characters!');
        }

        const isExistedEmail = await User.findByEmail(email);
        
        if (isExistedEmail) {
            throw new UserExistError('Failed to register! Email already registered');
        }
    },
    validateLogin: async (data) => {
        const { email, password } = data;

        if (!email || !password) {
            throw new BadRequestError('Email and password are required!');
        }

        if (!email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            throw new BadRequestError('Email must be in valid format!');
        }

        const userData = await User.findByEmail(email);

        if (!userData || !(await bcrypt.compare(password, userData.password))) {
            throw new InvalidCredentialError('Wrong email or password!');
        }

        return {
            id: userData.id,
            username: userData.username,
            email: userData.email
        };
    }
};