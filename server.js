const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();  // เพื่อโหลดข้อมูลจากไฟล์ .env

const app = express();
const PORT = process.env.PORT || 3000;

// เชื่อมต่อกับฐานข้อมูล MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// ตรวจสอบการเชื่อมต่อกับฐานข้อมูล
db.connect((err) => {
    if (err) {
        console.error('ไม่สามารถเชื่อมต่อกับฐานข้อมูล: ' + err.stack);
        return;
    }
    console.log('เชื่อมต่อกับฐานข้อมูล MySQL สำเร็จ');
});

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

app.post('/save-settings-zone3', (req, res) => {
    const { soilMin, soilMax, airMin, airMax, soilAlert, airAlert } = req.body;

    // ตรวจสอบข้อมูลที่ได้รับ
    if (!soilMin || !soilMax || !airMin || !airMax) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // บันทึกการตั้งค่าความชื้นในดินและอากาศ
    const query = `INSERT INTO zone3_settings (soil_min, soil_max, air_min, air_max, soil_alert, air_alert) 
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


// ล็อกอิน
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // ค้นหาผู้ใช้จากฐานข้อมูล
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database query error', error: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];

        // ตรวจสอบรหัสผ่าน
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Error comparing password' });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // สร้าง JWT token
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // ส่ง JWT token กลับไป
            res.json({ message: 'Login successful', token });
        });
    });
});

// สมัครสมาชิก
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // เข้ารหัสรหัสผ่านก่อนบันทึก
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password' });
        }

        // บันทึกข้อมูลผู้ใช้ในฐานข้อมูล
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
            [username, email, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving user to database', error: err });
            }

            res.json({ message: 'Registration successful' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
