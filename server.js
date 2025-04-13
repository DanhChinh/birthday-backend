const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const db = require('./db');
const imageRoutes = require('./routes/imageRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/images', imageRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;

const db = require('./db'); // giả sử bạn có file db.js chứa kết nối

app.get('/test', (req, res) => {
    db.query('SELECT 1', (err) => {
        if (err) {
            console.error('❌ Lỗi kết nối DB:', err.message);
            return res.status(500).json({ success: false, message: 'Không kết nối được database!' });
        }

        console.log('✅ API /api/log: Kết nối DB thành công lúc', new Date().toLocaleString());
        res.json({ success: true, message: 'Đã kết nối DB & server thành công!' });
    });
});


app.listen(PORT, '0.0.0.0', () => {
    const protocol = process.env.HTTPS ? 'https' : 'http';
    const host = process.env.HOST || 'localhost';
    console.log(`🚀 Server đang chạy tại: ${protocol}://${host}:${PORT}`);
  });