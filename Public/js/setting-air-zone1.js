document.addEventListener("DOMContentLoaded", function () {
    const airForm = document.getElementById("airForm");
    const cancelBtn = document.getElementById("cancelBtn");

    document.getElementById("airMin").value = localStorage.getItem("airMinZone1") || "";
    document.getElementById("airMax").value = localStorage.getItem("airMaxZone1") || "";

    // เมื่อกรอกข้อมูลและกดบันทึก
    airForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const airMin = document.getElementById("airMin").value;
        const airMax = document.getElementById("airMax").value;

        if (airMin && airMax) {
            localStorage.setItem("airMinZone1", airMin);
            localStorage.setItem("airMaxZone1", airMax);
            alert("บันทึกค่าความชื้นในอากาศสำเร็จ! (โซน 1)");
            localStorage.setItem("updateSettingZone1", "true");

            // ส่งข้อมูลไปยังเซิร์ฟเวอร์
            saveSettings();

            window.location.href = "setting-zone1.html";
        } else {
            alert("กรุณากรอกค่าความชื้นให้ครบ!");
        }
    });

    // เมื่อกดปุ่มยกเลิก
    cancelBtn.addEventListener("click", function () {
        window.location.href = "setting-zone1.html";
    });
});

// ฟังก์ชันสำหรับการส่งข้อมูลไปยังเซิร์ฟเวอร์
function saveSettings() {
    const airMin = localStorage.getItem("airMinZone1");
    const airMax = localStorage.getItem("airMaxZone1");

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
