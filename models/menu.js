const conn = require('../configs/database');

class Menu {
    static async findAll() {
        const menus = await conn.query(`SELECT * FROM item;`);
        return menus.rows.length === 0 ? null : menus.rows;
    }
}

module.exports = Menu;