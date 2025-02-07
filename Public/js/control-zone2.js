// ตรวจสอบและโหลดค่า zoneId จาก URL
const zoneId = window.location.pathname.split('/').pop().replace('.html', '');

const statusButton = document.getElementById('statusButton');
const statusText = document.getElementById('statusText');

// โหลดสถานะจาก localStorage ถ้ามี
let isOn = localStorage.getItem(zoneId) === 'true';

function updateUI() {
    if (isOn) {
        statusButton.style.backgroundColor = 'green';
        statusButton.textContent = 'กดเปิด';
        statusText.textContent = 'สถานะเปิดการทำงาน';
        statusText.style.color = 'green';
    } else {
        statusButton.style.backgroundColor = 'red';
        statusButton.textContent = 'กดปิด';
        statusText.textContent = 'สถานะปิดการทำงาน';
        statusText.style.color = 'red';
    }

    localStorage.setItem(zoneId, isOn);  // เก็บสถานะการเปิด/ปิดใน localStorage
}

// ตั้งค่าเหตุการณ์เมื่อคลิกปุ่มสถานะ
statusButton.addEventListener('click', () => {
    isOn = !isOn; 
    updateUI();
    localStorage.setItem('updateMain', Date.now()); // บันทึกเวลาอัปเดตให้หน้า main รู้ว่ามีการเปลี่ยนแปลง
});

updateUI(); // เรียกใช้งานฟังก์ชันการอัปเดต UI

// ฟังก์ชันสำหรับการเปิดโหมดเลือก
function openModeSelection2() {
    window.location.href = "mode-selection2.html";
}

// การจัดการการเลือกโหมดจาก localStorage
document.addEventListener("DOMContentLoaded", () => {
    const modeButton = document.getElementById("modeButton");

    let selectedMode = localStorage.getItem("selectedModeZone2") || "คลิกเลือกโหมด";
    modeButton.textContent = selectedMode;

    function openModeSelection2() {
        window.location.href = "mode-selection2.html";
    }

    function updateModeDisplay(mode) {
        localStorage.setItem("selectedModeZone2", mode);
        modeButton.textContent = mode;
    }

    window.updateModeDisplay = updateModeDisplay;
});

// ฟังก์ชันตั้งเวลา
function setTimer() {
    const timeInput = document.getElementById('time-input');
    const timeDisplay = document.getElementById('timer-display');
    const timeInMinutes = parseInt(timeInput.value, 10);

    if (isNaN(timeInMinutes) || timeInMinutes <= 0) {
        alert('กรุณากรอกเวลาที่ถูกต้อง');
        return;
    }

    timeDisplay.textContent = `ตั้งเวลา: ${timeInMinutes} นาที`;
    localStorage.setItem('timer', timeInMinutes);  // เก็บเวลาใน localStorage

    // บันทึกข้อมูลการตั้งค่า
    saveSettings();

    timeInput.value = '';  // รีเซ็ต input
}

// โหลดค่าการตั้งเวลาจาก localStorage เมื่อเริ่มต้น
document.addEventListener('DOMContentLoaded', () => {
    const savedTimer = localStorage.getItem('timer');
    const timeDisplay = document.getElementById('timer-display');

    if (savedTimer) {
        timeDisplay.textContent = `ตั้งเวลา: ${savedTimer} นาที`;
    }
});

// การปรับค่าความชื้นในดิน
const soilMoistureRange = document.getElementById('soil-moisture-range');
const soilMoistureValue = document.getElementById('soil-moisture-value');

soilMoistureRange.addEventListener('input', () => {
    const moistureValue = parseFloat(soilMoistureRange.value).toFixed(1);
    soilMoistureValue.textContent = `${moistureValue}%`;
    localStorage.setItem('soilMoisture', moistureValue);

    // บันทึกข้อมูลการตั้งค่า
    saveSettings();
});

// การปรับค่าความชื้นในอากาศ
const airMoistureRange = document.getElementById('air-moisture-range');
const airMoistureValue = document.getElementById('air-moisture-value');

airMoistureRange.addEventListener('input', () => {
    const moistureValue = parseFloat(airMoistureRange.value).toFixed(1);
    airMoistureValue.textContent = `${moistureValue}%`;
    localStorage.setItem('airMoisture', moistureValue);

    // บันทึกข้อมูลการตั้งค่า
    saveSettings();
});

// โหลดค่าความชื้นจาก localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedSoilMoisture = localStorage.getItem('soilMoisture');
    if (savedSoilMoisture) {
        soilMoistureRange.value = savedSoilMoisture;
        soilMoistureValue.textContent = `${savedSoilMoisture}%`;
    }

    const savedAirMoisture = localStorage.getItem('airMoisture');
    if (savedAirMoisture) {
        airMoistureRange.value = savedAirMoisture;
        airMoistureValue.textContent = `${savedAirMoisture}%`;
    }
});

// ฟังก์ชันสำหรับการส่งข้อมูลสถานะ, เวลาที่ตั้ง, และความชื้นไปยังเซิร์ฟเวอร์
function saveSettings() {
    const zoneId = window.location.pathname.split('/').pop().replace('.html', '');  // ดึง zoneId จาก URL

    const isOn = localStorage.getItem(zoneId) === 'true'; // ตรวจสอบสถานะ "เปิด" หรือ "ปิด"
    const timer = localStorage.getItem('timer'); // ค่าเวลาที่ตั้ง
    const soilMoisture = localStorage.getItem('soilMoisture'); // ความชื้นในดิน
    const airMoisture = localStorage.getItem('airMoisture'); // ความชื้นในอากาศ

    const data = {
        zoneId: zoneId,   // ส่ง zoneId ไปด้วยเพื่อให้สามารถแยกข้อมูลได้
        isOn: isOn,
        timer: timer,
        soilMoisture: soilMoisture,
        airMoisture: airMoisture
    };

    // ส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่อบันทึก
    fetch('/save-settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Settings saved successfully:', data);
    })
    .catch(error => {
        console.error('Error saving settings:', error);
    });
}
