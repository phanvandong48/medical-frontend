// Giả sử response.data chứa thông tin người dùng từ API
const userData = response.data;

// Lưu thông tin cần thiết vào localStorage
localStorage.setItem('token', userData.token);
localStorage.setItem('userRole', userData.role);

// Lưu tên người dùng theo nhiều key để đảm bảo tính linh hoạt
if (userData.fullName) {
    localStorage.setItem('fullName', userData.fullName);
}

// Lưu tên theo vai trò
if (userData.role === 'DOCTOR' && userData.doctorName) {
    localStorage.setItem('doctorName', userData.doctorName);
} else if (userData.role === 'PATIENT' && userData.patientName) {
    localStorage.setItem('patientName', userData.patientName);
}

// Luôn lưu userName để đảm bảo có ít nhất một tên
localStorage.setItem('userName', userData.username || userData.email || 'Người dùng');

// ... chuyển hướng sau khi đăng nhập ... 