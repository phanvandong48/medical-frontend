// client/src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-brand">Phòng Khám Online</Link>
            </div>

            <div className="navbar-right">
                {currentUser ? (
                    <>
                        <span className="user-name">Xin chào, {currentUser.fullName}</span>

                        {currentUser.role === 'patient' && (
                            <>
                                <Link to="/book-appointment" className="nav-link">Đặt lịch khám</Link>
                                <Link to="/my-appointments" className="nav-link">Lịch khám của tôi</Link>
                                <Link to="/medical-records" className="nav-link">Hồ sơ bệnh án</Link>
                            </>
                        )}

                        {currentUser.role === 'doctor' && (
                            <>
                                <Link to="/doctor/dashboard" className="nav-link">Dashboard</Link>
                                <Link to="/doctor/schedule" className="nav-link">Quản lý lịch</Link>
                                <Link to="/doctor/medical-records" className="nav-link">Hồ sơ bệnh nhân</Link>
                            </>
                        )}

                        {currentUser.role === 'admin' && (
                            <>
                                <Link to="/admin/dashboard" className="nav-link">Quản lý</Link>
                                <Link to="/admin/medical-records" className="nav-link">Quản lý hồ sơ bệnh nhân</Link>
                            </>
                        )}

                        <button onClick={handleLogout} className="logout-btn">Đăng xuất</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Đăng nhập</Link>
                        <Link to="/register" className="nav-link">Đăng ký</Link>
                    </>
                )}

            </div>
        </nav>
    );
};

export default Navbar;