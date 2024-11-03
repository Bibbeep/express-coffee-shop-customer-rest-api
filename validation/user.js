const User = require('../models/user');
const { BadRequestError, UserExistError } = require("../utils/error");

module.exports = {
    validate: async (data) => {
        const { username, email, password, gender, birthdate } = data;

        if (!username || !email || !password || !gender || !birthdate) {
            throw new BadRequestError('Username, email, password, gender, and birthdate are required!');
        }

        if (typeof username !== 'string' ||
            typeof email !== 'string' ||
            typeof password !== 'string' ||
            typeof gender !== 'string' ||
            typeof birthdate !== 'string') {
            throw new BadRequestError('Username, email, password, gender, and birthdate must be string type!')
        }

        if (!email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            throw new BadRequestError('Email must be in valid format!');
        }

        if (!(gender == 'male' || gender == 'female')) {
            throw new BadRequestError('Gender must be either male or female!');
        }

        if (password.length < 9) {
            throw new BadRequestError('Password must be at least 9 characters!');
        }

        if (!birthdate.match(/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g)) {
            throw new BadRequestError('Birthdate must be in valid format! [ DD/MM/yyyy ]');
        }

        const isExistedEmail = await User.findByEmail(email);
        
        if (isExistedEmail) {
            throw new UserExistError('Failed to register! Email already registered');
        }
    }
};