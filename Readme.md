66021498 นายณัฐวุฒิ คำแจง : ออกแบบหน้าบ้าน(Frontend) 	
66021678 นายธีรภัทร แก้วสว่าง: ออกแบบหลังบ้าน(Backend) 



โปรเจ็กต์นี้เป็น ระบบรดน้ำต้นไม้อัจฉริยะ โดยผู้ใช้สามารถตั้งค่าความชื้นในดินและอากาศ รวมทั้งตั้งการแจ้งเตือนในระบบได้ ระบบจะบันทึกค่าที่ตั้งไว้ใน localStorage และสามารถบันทึกข้อมูลลงในฐานข้อมูล MySQL ได้

ฟีเจอร์หลัก:
ตั้งค่าความชื้นในดินและอากาศ
ตั้งการแจ้งเตือนเมื่อค่าความชื้นเกินหรือต่ำเกินไป
บันทึกข้อมูลใน localStorage และฐานข้อมูล

สร้างไฟล์ .env ที่ root directory ของโปรเจ็กต์ และตั้งค่าเชื่อมต่อกับฐานข้อมูล (MySQL):

env
คัดลอก
แก้ไข
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=  # ถ้าไม่มีรหัสผ่านใส่เป็นค่าว่าง
DB_NAME=smart_water_system
SESSION_SECRET=your_secret_key
JWT_SECRET=mySuperSecretKey

การใช้งาน
1. การตั้งค่าความชื้นในดินและอากาศ
เข้าสู่ระบบและเลือกโซนที่ต้องการตั้งค่าความชื้นในดินและอากาศ
กรอกค่าความชื้นในดิน (soilMin, soilMax) และอากาศ (airMin, airMax)
เมื่อกรอกข้อมูลเสร็จแล้ว กด "บันทึก" เพื่อบันทึกข้อมูล
ค่าเหล่านี้จะถูกเก็บใน localStorage และสามารถส่งไปยังเซิร์ฟเวอร์เพื่อบันทึกลงในฐานข้อมูลได้
2. การตั้งค่าการแจ้งเตือน
เปิด/ปิดการแจ้งเตือนสำหรับความชื้นในดินและอากาศ
การตั้งค่านี้จะถูกเก็บใน localStorage
3. การเปลี่ยนเส้นทางไปยังหน้าอื่น
เมื่อกรอกข้อมูลเสร็จแล้ว จะมีการเปลี่ยนเส้นทางไปยังหน้า ตั้งค่าความชื้นในดิน หรือ ตั้งค่าความชื้นในอากาศ

การเชื่อมต่อกับฐานข้อมูล
การล็อคอิน
user = root
Password = ไม่มี
port = 3306

สร้างตารางใน MySQL: คุณต้องสร้างตารางในฐานข้อมูล MySQL เพื่อเก็บข้อมูล

CREATE DATABASE smart_water_system;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
CREATE TABLE zone_settings (
    zone_id VARCHAR(255) PRIMARY KEY,
    is_on BOOLEAN NOT NULL,
    timer INT NOT NULL,
    soil_moisture DECIMAL(5, 2) NOT NULL,
    air_moisture DECIMAL(5, 2) NOT NULL
);
CREATE TABLE air_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    air_min DECIMAL(5, 2) NOT NULL,
    air_max DECIMAL(5, 2) NOT NULL
);
CREATE TABLE zone2_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    soil_min DECIMAL(5, 2) NOT NULL,
    soil_max DECIMAL(5, 2) NOT NULL,
    air_min DECIMAL(5, 2) NOT NULL,
    air_max DECIMAL(5, 2) NOT NULL,
    soil_alert BOOLEAN NOT NULL,
    air_alert BOOLEAN NOT NULL
);
CREATE TABLE zone1_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    soil_min DECIMAL(5, 2) NOT NULL,
    soil_max DECIMAL(5, 2) NOT NULL,
    air_min DECIMAL(5, 2) NOT NULL,
    air_max DECIMAL(5, 2) NOT NULL,
    soil_alert BOOLEAN NOT NULL,
    air_alert BOOLEAN NOT NULL
);
CREATE TABLE zone3_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    soil_min DECIMAL(5, 2) NOT NULL,
    soil_max DECIMAL(5, 2) NOT NULL,
    air_min DECIMAL(5, 2) NOT NULL,
    air_max DECIMAL(5, 2) NOT NULL,
    soil_alert BOOLEAN NOT NULL,
    air_alert BOOLEAN NOT NULL
);



ติดตั้ง dependencies ที่โปรเจ็กต์ต้องการ
npm install
npm install bcrypt
npm install bcryptjs
npm install body-parser
npm install cors
npm install dotenv
npm install express
npm install jsonwebtoken
npm install mysql2

npm run start

ไฟล์saql.sql
