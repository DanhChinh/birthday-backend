const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(sql, [username, password], (err, results) => {
        if (err) return res.status(500).json({ error: 'Lỗi CSDL' });

        if (results.length > 0) {
            res.json({ success: true, user: results[0], message: 'Đăng nhập thành công' });
        } else {
            res.json({ success: false, message: 'Sai tên hoặc mật khẩu' });
        }
    });
});

module.exports = router;
