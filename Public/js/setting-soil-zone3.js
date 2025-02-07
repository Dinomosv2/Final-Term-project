document.addEventListener("DOMContentLoaded", function () {
    const soilForm = document.getElementById("soilForm");
    const cancelBtn = document.getElementById("cancelBtn");

    // โหลดค่าจาก localStorage ถ้ามี
    document.getElementById("soilMin").value = localStorage.getItem("soilMinZone3") || "";
    document.getElementById("soilMax").value = localStorage.getItem("soilMaxZone3") || "";

    // เมื่อกรอกข้อมูลและกดบันทึก
    soilForm.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Form submitted.");

        const soilMin = document.getElementById("soilMin").value;
        const soilMax = document.getElementById("soilMax").value;
        console.log("Soil Min:", soilMin, "Soil Max:", soilMax);

        if (soilMin && soilMax) {
            localStorage.setItem("soilMinZone3", soilMin);
            localStorage.setItem("soilMaxZone3", soilMax);
            alert("บันทึกค่าความชื้นในดินสำเร็จ! (โซน 3)");

            // ดีบักการตรวจสอบการบันทึก
            console.log(`Soil Min: ${soilMin}, Soil Max: ${soilMax}`);
            window.location.href = "setting-zone3.html";  // เปลี่ยนเส้นทางไปยังหน้า setting-zone3.html
        } else {
            alert("กรุณากรอกค่าความชื้นให้ครบ!");
        }
    });

    // เมื่อกดปุ่มยกเลิก
    cancelBtn.addEventListener("click", function () {
        console.log("Redirecting to setting-zone3.html");
        window.location.href = "setting-zone3.html";  // เปลี่ยนเส้นทางเมื่อกดปุ่มยกเลิก
    });
});
