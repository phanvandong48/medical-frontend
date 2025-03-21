// src/components/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Header = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="main-header">
            <div className="container">
                <div className="logo-container">
                    <Link to="/">
                        <img src={logo} alt="Medical Clinic Logo" className="logo" />
                    </Link>
                </div>

                <nav className="main-nav">
                    <ul>
                        <li><Link to="/">Trang chủ</Link></li>
                        <li><Link to="/services">Dịch vụ</Link></li>
                        <li><Link to="/doctors">Đội ngũ bác sĩ</Link></li>
                        <li><Link to="/contact">Liên hệ</Link></li>
                    </ul>
                </nav>

                <div className="auth-buttons">
                    {currentUser ? (
                        <>
                            <div className="user-menu">
                                <span className="user-name">Xin chào, {currentUser.fullName}</span>
                                <div className="dropdown-menu">
                                    {currentUser.role === 'patient' && (
                                        <>
                                            <Link to="/my-appointments">Cuộc hẹn của tôi</Link>
                                            <Link to="/medical-records">Hồ sơ y tế</Link>
                                            <Link to="/book-appointment">Đặt lịch khám</Link>
                                        </>
                                    )}
                                    {currentUser.role === 'doctor' && (
                                        <>
                                            <Link to="/doctor/dashboard">Bảng điều khiển</Link>
                                            <Link to="/doctor/schedule">Lịch khám</Link>
                                            <Link to="/doctor/medical-records">Hồ sơ bệnh nhân</Link>
                                        </>
                                    )}
                                    {currentUser.role === 'admin' && (
                                        <>
                                            <Link to="/admin/dashboard">Quản trị viên</Link>
                                            <Link to="/admin/medical-records">Quản lý hồ sơ</Link>
                                        </>
                                    )}
                                    <button onClick={handleLogout}>Đăng xuất</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline">Đăng nhập</Link>
                            <Link to="/register" className="btn btn-primary">Đăng ký</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;