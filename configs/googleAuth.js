const googleAuthConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    // passReqToCallback: true,
    scope: [
        'profile', 
        'email', 
        // 'https://www.googleapis.com/auth/user.addresses.read',
        // 'https://www.googleapis.com/auth/user.birthday.read',
        // 'https://www.googleapis.com/auth/user.gender.read',
        // 'https://www.googleapis.com/auth/user.phonenumbers.read'
    ] 
};

module.exports = googleAuthConfig;