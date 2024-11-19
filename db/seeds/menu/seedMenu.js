require('dotenv').config();
const db = require('../../../configs/database');
const item = require('./item.json');
const itemOption = require('./item_option.json');
const itemSpec = require('./item_spec.json');

async function seedData() {
    try {
        for (let i = 0; i < item.length; i++) {
            await db.query(
                'INSERT INTO item (name, price, type, description) VALUES ($1, $2, $3, $4);',
                [item[i].name, item[i].price, item[i].type, item[i].description]
            );

            await db.query(
                'INSERT INTO item_option (name, type) VALUES ($1, $2);',
                [itemOption[i].name, itemOption[i].type]
            );

        }

        for (let i = 0; i < itemSpec.length; i++) {
            await db.query(
                'INSERT INTO item_specification (item_id, item_option_id, price) VALUES ($1, $2, $3);',
                [itemSpec[i].item_id, itemSpec[i].item_option_id, itemSpec[i].price]
            );
        }
    } catch (err) {
        console.error(err);
    }
}

seedData()
    .then(() => console.log('Successfully seeding menu data'))
    .catch((err) => console.error(err));