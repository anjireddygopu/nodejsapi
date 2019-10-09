'use strict';
const mysql = require('mysql');
var fs = require('fs');
var util = require('util');
const configPath = 'credentials.json';
const parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));
const pool = mysql.createPool({
    connectionLimit: 10,
    host:parsed.host,
    user:parsed.user,
    password:parsed.pass,
    database: parsed.database
});
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }  
    if (connection) connection.release();
    return;
});
// @ts-ignore
pool.query = util.promisify(pool.query);
module.exports = pool;