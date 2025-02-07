document.addEventListener("DOMContentLoaded", () => {
    // ดึงค่าความชื้นจาก localStorage
    const soilMin = localStorage.getItem("soilMinZone2");
    const soilMax = localStorage.getItem("soilMaxZone2");
    const airMin = localStorage.getItem("airMinZone2");
    const airMax = localStorage.getItem("airMaxZone2");

    // อัปเดตค่าความชื้นในดินและอากาศ
    document.getElementById("soilRange").textContent = soilMin && soilMax ? `${soilMin} - ${soilMax}` : "-";
    document.getElementById("airRange").textContent = airMin && airMax ? `${airMin} - ${airMax}` : "-";

    // อัปเดตสถานะของปุ่มสวิตช์ตามค่าใน localStorage
    document.getElementById("soil-alert").checked = localStorage.getItem("soilAlertZone2") === "true";
    document.getElementById("air-alert").checked = localStorage.getItem("airAlertZone2") === "true";

    // เพิ่ม Event Listener เพื่อบันทึกค่าการเปิด-ปิดของปุ่ม
    document.getElementById("soil-alert").addEventListener("change", function() {
        localStorage.setItem("soilAlertZone2", this.checked);
    });

    document.getElementById("air-alert").addEventListener("change", function() {
        localStorage.setItem("airAlertZone2", this.checked);
    });

    // เพิ่ม Event Listener สำหรับการตั้งค่าความชื้นในดินและอากาศ
    document.getElementById("soilSettingBtn").addEventListener("click", function () {
        console.log("Soil setting button clicked.");
        window.location.href = "setting-soil-zone2.html";
    });

    document.getElementById("airSettingBtn").addEventListener("click", function () {
        console.log("Air setting button clicked.");
        window.location.href = "setting-air-zone2.html";
    });
});

// ฟังก์ชันสำหรับการเปลี่ยนเส้นทางไปยังหน้าอื่น ๆ
function openSoilSettingZone2() {
    console.log("Opening soil setting for zone 2.");
    window.location.href = "setting-soil-zone2.html";
}

function openAirSettingZone2() {
    console.log("Opening air setting for zone 2.");
    window.location.href = "setting-air-zone2.html";
}
