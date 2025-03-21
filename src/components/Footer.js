// src/components/Footer.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const navigate = useNavigate();

    // Hàm xử lý khi click vào link
    const handleNavigation = (path) => {
        // Điều hướng đến trang được chỉ định
        navigate(path);
        // Cuộn lên đầu trang
        window.scrollTo(0, 0);
    };

    return (
        <footer className="main-footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section about">
                        <div className="logo-container">
                            <img src={logo} alt="Medical Clinic Logo" className="logo" />
                        </div>
                        <p>
                            Phòng khám đa khoa chúng tôi cung cấp dịch vụ chăm sóc sức khỏe chất lượng cao,
                            với đội ngũ bác sĩ chuyên nghiệp và trang thiết bị hiện đại.
                        </p>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                📘
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                🐦
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                📷
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    <div className="footer-section links">
                        <h3>Liên kết nhanh</h3>
                        <ul>
                            <li><a onClick={() => handleNavigation('/')}>Trang chủ</a></li>
                            <li><a onClick={() => handleNavigation('/services')}>Dịch vụ</a></li>
                            <li><a onClick={() => handleNavigation('/doctors')}>Đội ngũ bác sĩ</a></li>
                            <li><a onClick={() => handleNavigation('/book-appointment')}>Đặt lịch khám</a></li>
                            <li><a onClick={() => handleNavigation('/contact')}>Liên hệ</a></li>
                            <li><a onClick={() => handleNavigation('/about')}>Giới thiệu</a></li>
                        </ul>
                    </div>

                    <div className="footer-section contact">
                        <h3>Thông tin liên hệ</h3>
                        <div className="contact-info">
                            <p><i className="fa fa-map-marker"></i> 123 Đường Lê Lợi, Quận 1, TP.HCM</p>
                            <p><i className="fa fa-phone"></i> (+84) 28 1234 5678</p>
                            <p><i className="fa fa-envelope"></i> info@medical-clinic.com</p>
                        </div>
                        <div className="working-hours">
                            <h4>Giờ làm việc</h4>
                            <p>Thứ Hai - Thứ Sáu: 8:00 - 17:00</p>
                            <p>Thứ Bảy: 8:00 - 12:00</p>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Medical Clinic. Tất cả quyền được bảo lưu.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;