// // db.js
// require('dotenv').config();
// const mysql = require('mysql2');
// console.log(`host: ${process.env.DB_HOST} \nuser: ${process.env.DB_USER} \npassword: ${process.env.DB_PASS} \ndatabase: ${process.env.DB_NAME}`)

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     port:process.env.DB_PORT
// });

// db.connect(err => {
//     if (err) {
//         console.error('❌ Kết nối MySQL thất bại:', err);
//     } else {
//         console.log('✅ Kết nối MySQL thành công');
//     }
// });

// module.exports = db;







require('dotenv').config();
const { Client } = require('pg'); // Thêm thư viện PostgreSQL

console.log(`host: ${process.env.DB_HOST} \nuser: ${process.env.DB_USER} \npassword: ${process.env.DB_PASS} \ndatabase: ${process.env.DB_NAME}`);

const db = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT, // Cổng kết nối PostgreSQL, mặc định là 5432
});

db.connect(err => {
    if (err) {
        console.error('❌ Kết nối PostgreSQL thất bại:', err);
    } else {
        console.log('✅ Kết nối PostgreSQL thành công');
    }
});

module.exports = db;
