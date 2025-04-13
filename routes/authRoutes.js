// const express = require('express');
// const router = express.Router();
// const db = require('../db');

// router.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
//     console.log(sql);

//     db.query(sql, [username, password], (err, results) => {
//         if (err) return res.status(500).json({ error: 'Lỗi CSDL' });

//         if (results.length > 0) {
//             res.json({ success: true, user: results[0], message: 'Đăng nhập thành công' });
//         } else {
//             res.json({ success: false, message: 'Sai tên hoặc mật khẩu' });
//         }
//     });
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const db = require('../db'); // Giả sử db là instance của pg.Client hoặc pg.Pool

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Thay đổi ? thành $1, $2 cho PostgreSQL
        const sql = 'SELECT * FROM users WHERE username = $1 AND password = $2';
        console.log(sql);

        // Sử dụng async/await thay vì callback
        const result = await db.query(sql, [username, password]);

        // PostgreSQL trả về kết quả trong result.rows
        if (result.rows.length > 0) {
            res.json({ 
                success: true, 
                user: result.rows[0], 
                message: 'Đăng nhập thành công' 
            });
        } else {
            res.json({ 
                success: false, 
                message: 'Sai tên hoặc mật khẩu' 
            });
        }
    } catch (err) {
        console.error('Lỗi truy vấn PostgreSQL:', err);
        res.status(500).json({ 
            error: 'Lỗi CSDL',
            details: err.message // Thêm thông tin lỗi chi tiết (tuỳ chọn)
        });
    }
});

module.exports = router;