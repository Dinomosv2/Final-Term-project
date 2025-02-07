document.addEventListener("DOMContentLoaded", () => {
    // ดึงค่าความชื้นจาก localStorage
    const soilMin = localStorage.getItem("soilMinZone1");
    const soilMax = localStorage.getItem("soilMaxZone1");
    const airMin = localStorage.getItem("airMinZone1");
    const airMax = localStorage.getItem("airMaxZone1");

    document.getElementById("soilRange").textContent = soilMin && soilMax ? `${soilMin} - ${soilMax}` : "-";
    document.getElementById("airRange").textContent = airMin && airMax ? `${airMin} - ${airMax}` : "-";

    // อัปเดตสถานะของปุ่มสวิตช์ตามค่าใน localStorage
    document.getElementById("soil-alert").checked = localStorage.getItem("soilAlertZone1") === "true";
    document.getElementById("air-alert").checked = localStorage.getItem("airAlertZone1") === "true";

    // เพิ่ม Event Listener เพื่อบันทึกค่าการเปิด-ปิดของปุ่ม
    document.getElementById("soil-alert").addEventListener("change", function() {
        localStorage.setItem("soilAlertZone1", this.checked);
    });

    document.getElementById("air-alert").addEventListener("change", function() {
        localStorage.setItem("airAlertZone1", this.checked);
    });

    // เพิ่ม Event Listener สำหรับการตั้งค่าความชื้นในดินและอากาศ
    document.getElementById("soilSettingBtn").addEventListener("click", function () {
        console.log("Soil setting button clicked.");
        window.location.href = "setting-soil-zone1.html";
    });

    document.getElementById("airSettingBtn").addEventListener("click", function () {
        console.log("Air setting button clicked.");
        window.location.href = "setting-air-zone1.html";
    });
});

function openSoilSettingZone1() {
    console.log("Opening soil setting for zone 1.");
    window.location.href = "setting-soil-zone1.html";
}

function openAirSettingZone1() {
    console.log("Opening air setting for zone 1.");
    window.location.href = "setting-air-zone1.html";
}
