const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// DB 계정 입력
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

module.exports = {
    pool: pool
};