const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();  // เพื่อโหลดข้อมูลจากไฟล์ .env

const app = express();
const PORT = process.env.PORT || 3000;



// เชื่อมต่อฐานข้อมูล


const db = mysql.createPool({ // ✅ ใช้ createPool() แทน createConnection()
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// ✅ ไม่ต้องใช้ db.connect() แล้ว
console.log('✅ เชื่อมต่อกับฐานข้อมูล MySQL พร้อมใช้งาน');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// เส้นทางหลัก
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// เส้นทางสำหรับหน้า main-control
app.get('/main-control', (req, res) => {
    // ส่งไฟล์ main-control.html ให้กับผู้ใช้
    res.sendFile(path.join(__dirname, 'public', 'main-control.html'));
});

// เส้นทางสำหรับบันทึกการตั้งค่าจากหน้า control zone
app.post('/save-settings', (req, res) => {
    const { zoneId, isOn, timer, soilMoisture, airMoisture } = req.body;

    // ตรวจสอบข้อมูลที่ได้รับ
    if (!zoneId || isOn === undefined || !timer || !soilMoisture || !airMoisture) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // บันทึกการตั้งค่าลงในฐานข้อมูล
    const query = `INSERT INTO zone_settings (zone_id, is_on, timer, soil_moisture, air_moisture) 
                   VALUES (?, ?, ?, ?, ?) 
                   ON DUPLICATE KEY UPDATE is_on = ?, timer = ?, soil_moisture = ?, air_moisture = ?`;

    db.query(query, [zoneId, isOn, timer, soilMoisture, airMoisture, isOn, timer, soilMoisture, airMoisture], (err, result) => {
        if (err) {
            console.error('Error saving settings:', err);
            return res.status(500).json({ message: 'Error saving settings to the database' });
        }

        res.json({ message: 'Settings saved successfully' });
    });
});

app.post('/save-air-settings', (req, res) => {
    const { airMin, airMax } = req.body;

    if (!airMin || !airMax) {
        return res.status(400).json({ message: 'Missing air humidity values' });
    }

    // บันทึกการตั้งค่าในฐานข้อมูล
    const query = `INSERT INTO air_settings (air_min, air_max) VALUES (?, ?)
                   ON DUPLICATE KEY UPDATE air_min = ?, air_max = ?`;

    db.query(query, [airMin, airMax, airMin, airMax], (err, result) => {
        if (err) {
            console.error('Error saving air settings:', err);
            return res.status(500).json({ message: 'Error saving settings to the database' });
        }

        res.json({ message: 'Air settings saved successfully' });
    });
});

app.post('/save-settings-zone1', (req, res) => {
    const { soilMin, soilMax, airMin, airMax, soilAlert, airAlert } = req.body;

    // ตรวจสอบข้อมูลที่ได้รับ
    if (!soilMin || !soilMax || !airMin || !airMax) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // บันทึกการตั้งค่าความชื้นในดินและอากาศ
    const query = `INSERT INTO zone1_settings (soil_min, soil_max, air_min, air_max, soil_alert, air_alert) 
                   VALUES (?, ?, ?, ?, ?, ?) 
                   ON DUPLICATE KEY UPDATE soil_min = ?, soil_max = ?, air_min = ?, air_max = ?, soil_alert = ?, air_alert = ?`;

    db.query(query, [soilMin, soilMax, airMin, airMax, soilAlert, airAlert, soilMin, soilMax, airMin, airMax, soilAlert, airAlert], (err, result) => {
        if (err) {
            console.error('Error saving settings:', err);
            return res.status(500).json({ message: 'Error saving settings to the database' });
        }

        res.json({ message: 'Settings saved successfully' });
    });
});


app.post('/save-settings-zone2', (req, res) => {
    const { soilMin, soilMax, airMin, airMax, soilAlert, airAlert } = req.body;

    // ตรวจสอบข้อมูลที่ได้รับ
    if (!soilMin || !soilMax || !airMin || !airMax) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const query = `INSERT INTO zone2_settings (soil_min, soil_max, air_min, air_max, soil_alert, air_alert) 
                   VALUES (?, ?, ?, ?, ?, ?) 
                   ON DUPLICATE KEY UPDATE soil_min = ?, soil_max = ?, air_min = ?, air_max = ?, soil_alert = ?, air_alert = ?`;

    db.query(query, [soilMin, soilMax, airMin, airMax, soilAlert, airAlert, soilMin, soilMax, airMin, airMax, soilAlert, airAlert], (err, result) => {
        if (err) {
            console.error('Error saving settings:', err);
            return res.status(500).json({ message: 'Error saving settings to the database' });
        }

        res.json({ message: 'Settings saved successfully' });
    });
});

app.post('/save-settings', async (req, res) => {
    const { zoneId, isOn, timer, soilMoisture, airMoisture } = req.body;

    if (!zoneId || isOn === undefined || !timer || !soilMoisture || !airMoisture) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const query = `INSERT INTO zone_settings (zone_id, is_on, timer, soil_moisture, air_moisture) 
                       VALUES (?, ?, ?, ?, ?) 
                       ON DUPLICATE KEY UPDATE is_on = ?, timer = ?, soil_moisture = ?, air_moisture = ?`;

        await db.query(query, [zoneId, isOn, timer, soilMoisture, airMoisture, isOn, timer, soilMoisture, airMoisture]);

        res.json({ message: 'Settings saved successfully' });

    } catch (err) {
        console.error('Error saving settings:', err);
        res.status(500).json({ message: 'Error saving settings to the database' });
    }
});






app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // ตรวจสอบว่ามี username หรือ email ซ้ำหรือไม่
        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // เข้ารหัสรหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10);

        // เพิ่มข้อมูลผู้ใช้ในฐานข้อมูล
        await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

        res.json({ message: 'Registration successful' });

    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Error registering user' });
    }
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // ส่งโทเค็นผ่าน Cookie แทน
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict', // ป้องกัน CSRF
            maxAge: 3600000 // 1 ชั่วโมง
        });
        

        res.json({ message: 'Login successful' });

    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Error logging in' });
    }
});

const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken; // ดึง Token จาก Cookie
    if (!token) return res.status(403).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token invalid or expired' });
        req.user = user;
        next();
    });
};

// ใช้ middleware กับหน้า main-control
app.get('/main-control', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main-control.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
