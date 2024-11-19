const Menu = require("../models/menu");

module.exports = {
    getAll: async (req, res) => {
        try {
            const menuData = await Menu.findAll();

            if (!menuData) {
                return res.status(200).json({
                    status: 'OK',
                    message: 'Menus is empty',
                    data: []
                });
            }

            return res.status(200).json({
                status: 'OK',
                message: 'Successfully retrieved menus data',
                data: menuData
            });
        } catch (err) {
            return res.status(500).json({
                status: 'Fail',
                message: 'Failed to retrieve menus'
            });
        }
    }
};