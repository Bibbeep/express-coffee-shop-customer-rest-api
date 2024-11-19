const passport = require('passport');
const configs = require('../configs/googleAuth');
const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(configs,
    async (accessToken, refreshToken, profile, done) => {
        try {
            const userData = await User.upsertByEmail(profile);
            done(null, userData);
        } catch (err) {
            done(err, null);
        }
    }
));

module.exports = passport;