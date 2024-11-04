const conn = require("../configs/database");
const bcrypt = require('bcrypt');

class User {
    static async create({ username, email, password, gender, birthdate }) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await conn.query(`INSERT INTO user_account (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}') RETURNING id;`);

        const profile = await conn.query(`INSERT INTO profile (user_account_id, profile_gender, birthdate) VALUES (${user.rows[0].id}, '${gender}', '${birthdate}') RETURNING id;`);

        return {
            userId: user.rows[0].id,
            profileId: profile.rows[0].id
        };
    }

    static async findByEmail(email) {
        const user = await conn.query(`SELECT * FROM user_account WHERE email = '${email}';`);
        return user.rows.length === 0 ? false : user.rows[0];
    }
}

module.exports = User;