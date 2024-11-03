const pg = require('pg');
const { Client } = pg;

const conn = new Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
});

conn.connect();

module.exports = conn;