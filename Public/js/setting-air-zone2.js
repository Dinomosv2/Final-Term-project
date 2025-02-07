document.addEventListener("DOMContentLoaded", function () {
    const airForm = document.getElementById("airForm");
    const cancelBtn = document.getElementById("cancelBtn");

    // โหลดค่าจาก localStorage ถ้ามี
    document.getElementById("airMin").value = localStorage.getItem("airMinZone2") || "";
    document.getElementById("airMax").value = localStorage.getItem("airMaxZone2") || "";

    // เมื่อกรอกข้อมูลและกดบันทึก
    airForm.addEventListener("submit", function (event) {
        event.preventDefault();  // ป้องกันการส่งฟอร์มแบบปกติ

        const airMin = document.getElementById("airMin").value;
        const airMax = document.getElementById("airMax").value;

        // ตรวจสอบว่าได้กรอกข้อมูลครบถ้วนหรือไม่
        if (airMin && airMax) {
            // บันทึกข้อมูลลง localStorage
            localStorage.setItem("airMinZone2", airMin);
            localStorage.setItem("airMaxZone2", airMax);
            alert("บันทึกค่าความชื้นในอากาศสำเร็จ! (โซน 2)");

            // บันทึกการตั้งค่าลงเซิร์ฟเวอร์
            saveSettings();

            // ตั้งค่าที่บันทึกใน localStorage และเปลี่ยนเส้นทาง
            localStorage.setItem("updateSettingZone2", "true");
            window.location.href = "setting-zone2.html";
        } else {
            alert("กรุณากรอกค่าความชื้นให้ครบ!");
        }
    });

    // เมื่อกดปุ่มยกเลิก
    cancelBtn.addEventListener("click", function () {
        window.location.href = "setting-zone2.html";
    });
});

// ฟังก์ชันสำหรับการส่งข้อมูลไปยังเซิร์ฟเวอร์
function saveSettings() {
    const airMin = localStorage.getItem("airMinZone2");
    const airMax = localStorage.getItem("airMaxZone2");

    const data = {
        airMin: airMin,
        airMax: airMax
    };

    // ตรวจสอบข้อมูลก่อนการส่งไปยังเซิร์ฟเวอร์
    console.log("Sending data to server:", data);

    fetch('/save-air-settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // ถ้าการบันทึกสำเร็จ
        console.log('Settings saved successfully:', data);
    })
    .catch(error => {
        // ถ้ามีข้อผิดพลาด
        console.error('Error saving settings:', error);
    });
}
