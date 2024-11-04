const conn = require("../configs/database");
const bcrypt = require('bcrypt');

class User {
    static async create({ username, email, password, firstName, lastName }) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await conn.query(`INSERT INTO user_account (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}') RETURNING id;`);

        const profile = await conn.query(`INSERT INTO profile (user_account_id, first_name, last_name) VALUES (${user.rows[0].id}, '${firstName}', '${lastName}') RETURNING id;`);

        return {
            userId: user.rows[0].id,
            profileId: profile.rows[0].id
        };
    }

    static async findByEmail(email) {
        const user = await conn.query(`SELECT * FROM user_account WHERE email = '${email}';`);
        return user.rows.length === 0 ? false : user.rows[0];
    }

    static async upsertByEmail({ id: googleId, displayName: username, emails, name, photos }) {
        try {
            const user = await conn.query(`INSERT INTO user_account (username, email, google_id) VALUES ('${username}', '${emails[0].value}', '${googleId}') ON CONFLICT (email) DO UPDATE SET username = '${username}' RETURNING id;`);
    
            const profile = await conn.query(`INSERT INTO profile (user_account_id, first_name, last_name, picture_url) VALUES (${user.rows[0].id}, '${name.givenName}', '${name.familyName}', '${photos[0].value}') RETURNING id;`);
    
            return {
                userId: user.rows[0].id,
                profileId: profile.rows[0].id
            };
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = User;