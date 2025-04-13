const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('../db');

const router = express.Router();
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Tạo thư mục nếu chưa có
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); // chấp nhận file
        } else {
            cb(new Error('Chỉ cho phép các định dạng ảnh (jpeg, png, gif, webp).'), false);
        }
    }
});





// GET - Danh sách ảnh
router.get('/', (req, res) => {
    db.query('SELECT * FROM images ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json({ error: 'Lỗi DB' });
        res.json(results);
    });
});


// POST - Upload ảnh
router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Không có file hoac dinh dang khong hop le' });

    const id = Date.now();
    const url = `/uploads/${req.file.filename}`;
    const description =req.body.description;

    console.log('Đang lưu ảnh:', { id, url, description });

    db.query('INSERT INTO images (id, url, description) VALUES (?, ?, ?)', [id, url, description], (err) => {
        if (err) {
            console.error('Lỗi ghi DB:', err); // In chi tiết lỗi
            return res.status(500).json({ error: 'Lỗi ghi DB', details: err.message });
        }

        res.json({ success: true, id, url,  description});
    });
});





// DELETE - Xóa ảnh khỏi server và DB
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    // Lấy đường dẫn ảnh từ DB
    db.query('SELECT url FROM images WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn DB:', err);
            return res.status(500).json({ error: 'Lỗi truy vấn DB' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy ảnh' });
        }

        // Đường dẫn ảnh tương đối
        const imageUrl = result[0].url;
        const imagePath = path.join(__dirname, '..', imageUrl); // Thư mục public chứa uploads

        // Xóa file ảnh khỏi thư mục uploads
        fs.unlink(imagePath, (fsErr) => {
            if (fsErr) {
                console.warn('Không thể xóa ảnh vật lý:', fsErr);
                // vẫn tiếp tục xóa trong DB để tránh kẹt dữ liệu
            }

            // Xóa khỏi database
            db.query('DELETE FROM images WHERE id = ?', [id], (deleteErr) => {
                if (deleteErr) {
                    console.error('Lỗi xóa DB:', deleteErr);
                    return res.status(500).json({ error: 'Lỗi xoá DB' });
                }

                res.json({ success: true });
            });
        });
    });
});

module.exports = router;