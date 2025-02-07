document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const showRegister = document.getElementById("showRegister");
    const showLogin = document.getElementById("showLogin");

    // แสดงฟอร์มการสมัครสมาชิก
    showRegister.addEventListener("click", function (e) {
        e.preventDefault();
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
    });

    // แสดงฟอร์มการล็อกอิน
    showLogin.addEventListener("click", function (e) {
        e.preventDefault();
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
    });

    // การสมัครสมาชิก
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("registerUsername").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("registerConfirmPassword").value;

        // ตรวจสอบว่ารหัสผ่านตรงกัน
        if (password !== confirmPassword) {
            alert("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน!");
            return;
        }

        // ส่งข้อมูลการสมัครไปยังเซิร์ฟเวอร์
        fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })
        .then(response => {
            if (!response.ok) {
                console.log('Error Status:', response.status);  // แสดงรหัสสถานะ
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.message === "Registration successful") {
                alert("สมัครสมาชิกสำเร็จ! โปรดล็อกอิน");
                registerForm.reset();
                registerForm.classList.add("hidden");
                loginForm.classList.remove("hidden");
            } else {
                alert(data.message);
            }
        })
        .catch(error => alert('Error: ' + error));  // แสดงข้อผิดพลาด
    });

    // การล็อกอิน
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("loginUsername").value.trim();
        const password = document.getElementById("loginPassword").value;

        // ส่งข้อมูลล็อกอินไปยังเซิร์ฟเวอร์
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // แปลงข้อมูลเป็น JSON
        })
        .then(data => {
            if (data.message === "Login successful") {
                alert("เข้าสู่ระบบสำเร็จ! กำลังเปลี่ยนเส้นทาง...");
                // สมมติว่าเซิร์ฟเวอร์ส่ง JWT token กลับมา
                localStorage.setItem("authToken", data.token); // เก็บ JWT token ใน localStorage
                window.location.href = "/main-control";  // เปลี่ยนหน้าไปที่ main-control
            } else {
                alert(data.message);  // แสดงข้อความจากเซิร์ฟเวอร์
            }
        })
        .catch(error => alert('Error: ' + error));  // แสดงข้อผิดพลาด
    });
});
