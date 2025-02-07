document.addEventListener("DOMContentLoaded", () => {
    // ดึงค่าความชื้นจาก localStorage
    const soilMin = localStorage.getItem("soilMinZone3");
    const soilMax = localStorage.getItem("soilMaxZone3");
    const airMin = localStorage.getItem("airMinZone3");
    const airMax = localStorage.getItem("airMaxZone3");

    // อัปเดตค่าความชื้นในดินและอากาศ
    document.getElementById("soilRange").textContent = soilMin && soilMax ? `${soilMin} - ${soilMax}` : "-";
    document.getElementById("airRange").textContent = airMin && airMax ? `${airMin} - ${airMax}` : "-";

    // อัปเดตสถานะของปุ่มสวิตช์ตามค่าใน localStorage
    document.getElementById("soil-alert").checked = localStorage.getItem("soilAlertZone3") === "true";
    document.getElementById("air-alert").checked = localStorage.getItem("airAlertZone3") === "true";

    // เพิ่ม Event Listener เพื่อบันทึกค่าการเปิด-ปิดของปุ่ม
    document.getElementById("soil-alert").addEventListener("change", function() {
        localStorage.setItem("soilAlertZone3", this.checked);
    });

    document.getElementById("air-alert").addEventListener("change", function() {
        localStorage.setItem("airAlertZone3", this.checked);
    });

    // เพิ่ม Event Listener สำหรับการตั้งค่าความชื้นในดินและอากาศ
    document.getElementById("soilSettingBtn").addEventListener("click", function () {
        console.log("Soil setting button clicked.");
        window.location.href = "setting-soil-zone3.html";
    });

    document.getElementById("airSettingBtn").addEventListener("click", function () {
        console.log("Air setting button clicked.");
        window.location.href = "setting-air-zone3.html";
    });
});

// ฟังก์ชันสำหรับการเปลี่ยนเส้นทางไปยังหน้าอื่น ๆ
function openSoilSettingZone3() {
    console.log("Opening soil setting for zone 3.");
    window.location.href = "setting-soil-zone3.html";
}

function openAirSettingZone3() {
    console.log("Opening air setting for zone 3.");
    window.location.href = "setting-air-zone3.html";
}
