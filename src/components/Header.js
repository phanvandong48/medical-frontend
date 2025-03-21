import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    // Giả định người dùng chưa đăng nhập
    const isLoggedIn = false;
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Hàm xử lý khi click vào NavLink
    const handleNavigation = (path) => {
        navigate(path);
        window.scrollTo(0, 0);
        closeMenu(); // Đóng menu mobile sau khi điều hướng
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="header-wrapper">
                    <div className="logo">
                        {/* Xử lý riêng cho logo */}
                        <a onClick={() => handleNavigation('/')} style={{ cursor: 'pointer' }}>
                            <img src={logo} alt="Medical Appointment" />
                        </a>
                    </div>

                    {/* Hamburger Menu Button */}
                    <div className="hamburger-menu" onClick={toggleMenu}>
                        <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    <nav className={`navigation ${isMenuOpen ? 'open' : ''}`}>
                        <ul>
                            <li>
                                <a
                                    onClick={() => handleNavigation('/')}
                                    className={window.location.pathname === '/' ? 'active' : ''}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Trang chủ
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => handleNavigation('/services')}
                                    className={window.location.pathname === '/services' ? 'active' : ''}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Dịch vụ
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => handleNavigation('/doctors')}
                                    className={window.location.pathname === '/doctors' ? 'active' : ''}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Bác sĩ
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => handleNavigation('/about')}
                                    className={window.location.pathname === '/about' ? 'active' : ''}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Giới thiệu
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => handleNavigation('/contact')}
                                    className={window.location.pathname === '/contact' ? 'active' : ''}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Liên hệ
                                </a>
                            </li>
                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <a
                                            onClick={() => handleNavigation('/appointments')}
                                            className={window.location.pathname === '/appointments' ? 'active' : ''}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Lịch hẹn
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() => handleNavigation('/profile')}
                                            className={window.location.pathname === '/profile' ? 'active' : ''}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Hồ sơ
                                        </a>
                                    </li>
                                    <li>
                                        <button className="logout-btn">Đăng xuất</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <a
                                            onClick={() => handleNavigation('/login')}
                                            className="login-btn"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Đăng nhập
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() => handleNavigation('/register')}
                                            className="register-btn"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Đăng ký
                                        </a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;