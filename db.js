// db.js
require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port:process.env.DB_PORT
});

console.log(`host: ${process.env.DB_HOST} \nuser: ${process.env.DB_USER} \npassword: ${process.env.DB_PASS} \ndatabase: ${process.env.DB_NAME}`)
db.connect(err => {
    if (err) {
        console.error('❌ Kết nối MySQL thất bại:', err);
    } else {
        console.log('✅ Kết nối MySQL thành công');
    }
});

module.exports = db;