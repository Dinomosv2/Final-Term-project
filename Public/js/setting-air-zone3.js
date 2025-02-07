document.addEventListener("DOMContentLoaded", function () {
    const airForm = document.getElementById("airForm");
    const cancelBtn = document.getElementById("cancelBtn");

    // โหลดค่าจาก localStorage ถ้ามี
    document.getElementById("airMin").value = localStorage.getItem("airMinZone3") || "";
    document.getElementById("airMax").value = localStorage.getItem("airMaxZone3") || "";

    // เมื่อกรอกข้อมูลและกดบันทึก
    airForm.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Form submitted.");

        const airMin = document.getElementById("airMin").value;
        const airMax = document.getElementById("airMax").value;
        console.log("Air Min:", airMin, "Air Max:", airMax);

        if (airMin && airMax) {
            // บันทึกข้อมูลลง localStorage
            localStorage.setItem("airMinZone3", airMin);
            localStorage.setItem("airMaxZone3", airMax);
            alert("บันทึกค่าความชื้นในอากาศสำเร็จ! (โซน 3)");

            // บันทึกการตั้งค่าลงเซิร์ฟเวอร์
            saveSettings();

            // ตั้งค่าที่บันทึกใน localStorage และเปลี่ยนเส้นทาง
            localStorage.setItem("updateSettingZone3", "true");
            console.log("Redirecting to setting-zone1.html");
            window.location.href = "setting-zone1.html";
        } else {
            alert("กรุณากรอกค่าความชื้นให้ครบ!");
        }
    });

    // เมื่อกดปุ่มยกเลิก
    cancelBtn.addEventListener("click", function () {
        console.log("Redirecting to setting-zone3.html");
        window.location.href = "setting-zone3.html";
    });
});

// ฟังก์ชันสำหรับการส่งข้อมูลไปยังเซิร์ฟเวอร์
function saveSettings() {
    const airMin = localStorage.getItem("airMinZone3");
    const airMax = localStorage.getItem("airMaxZone3");

    const data = {
        airMin: airMin,
        airMax: airMax
    };

    fetch('/save-air-settings', {
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
