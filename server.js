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




app.listen(PORT, '0.0.0.0', () => {
    const protocol = process.env.HTTPS ? 'https' : 'http';
    const host = process.env.HOST || 'localhost';
    console.log(`🚀 Server đang chạy tại: ${protocol}://${host}:${PORT}`);
  });