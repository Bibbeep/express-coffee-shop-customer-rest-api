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

    static async findAll() {
        const users = await conn.query(`SELECT id, username, email, google_id FROM user_account;`);
        return users.rows.length === 0 ? null : users.rows;
    }

    static async findById(id) {
        const user = await conn.query(`SELECT id, username, email, google_id FROM user_account WHERE id = ${id};`);

        if (user.rows.length === 0) {
            return null;
        }

        const profile = await conn.query(`SELECT id, first_name, last_name, profile_gender, birthdate, phone_number, picture_url FROM profile WHERE user_account_id = ${user.rows[0].id};`);

        return {
            user: user.rows[0],
            profile: profile.rows[0]
        };
    }

    static async findByEmail(email) {
        const user = await conn.query(`SELECT * FROM user_account WHERE email = '${email}';`);
        return user.rows.length === 0 ? null : user.rows[0];
    }

    static async upsertByEmail({ id: googleId, displayName: username, emails, name, photos }) {
        const user = await conn.query(`INSERT INTO user_account (username, email, google_id) VALUES ('${username}', '${emails[0].value}', '${googleId}') ON CONFLICT (email) DO UPDATE SET username = '${username}' RETURNING id;`);

        const profile = await conn.query(`INSERT INTO profile (user_account_id, first_name, last_name, picture_url) VALUES (${user.rows[0].id}, '${name.givenName}', '${name.familyName}', '${photos[0].value}') ON CONFLICT (user_account_id) DO UPDATE SET (first_name, last_name, picture_url) = ('${name.givenName}', '${name.familyName}', '${photos[0].value}') RETURNING id;`);

        // In PostgreSQL, auto-increment sequence will be incremented no matter if the insertion does not added a new row or failed
        await conn.query(`SELECT setval('user_account_id_seq', MAX(id), true) FROM user_account;`);
        await conn.query(`SELECT setval('profile_id_seq', MAX(id), true) FROM profile;`);

        return {
            userId: user.rows[0].id,
            profileId: profile.rows[0].id
        };
    }

    static async removeById(id) {
        const user = await this.findById(id);
        if (!user) {
            return null;
        }

        await conn.query(`DELETE FROM user_account WHERE id = ${id};`);
        return true;
    }
}

module.exports = User;