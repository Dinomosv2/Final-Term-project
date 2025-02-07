document.addEventListener("DOMContentLoaded", function () {
    const soilForm = document.getElementById("soilForm");
    const cancelBtn = document.getElementById("cancelBtn");

    // โหลดค่าจาก localStorage ถ้ามี
    document.getElementById("soilMin").value = localStorage.getItem("soilMinZone1") || "";
    document.getElementById("soilMax").value = localStorage.getItem("soilMaxZone1") || "";

    soilForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const soilMin = document.getElementById("soilMin").value;
        const soilMax = document.getElementById("soilMax").value;

        if (soilMin && soilMax) {
            localStorage.setItem("soilMinZone1", soilMin);
            localStorage.setItem("soilMaxZone1", soilMax);
            alert("บันทึกค่าความชื้นในดินสำเร็จ! (โซน 1)");

            // ดีบักการตรวจสอบการบันทึก
            console.log(`Soil Min: ${soilMin}, Soil Max: ${soilMax}`);
            window.location.href = "setting-zone1.html";  // เปลี่ยนเส้นทางไปยังหน้า setting-zone1.html
        } else {
            alert("กรุณากรอกค่าความชื้นให้ครบ!");
        }
    });

    cancelBtn.addEventListener("click", function () {
        window.location.href = "setting-zone1.html";  // เปลี่ยนเส้นทางเมื่อกดปุ่มยกเลิก
    });
});
