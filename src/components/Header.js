import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import '../App.css';

const Header = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Theo dõi cuộn trang để thay đổi kiểu dáng header
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

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="header-wrapper">
                    <div className="logo">
                        <NavLink to="/" onClick={closeMenu}>
                            <img src={logo} alt="Medical Appointment" />
                        </NavLink>
                    </div>

                    {/* Hamburger Menu Button */}
                    <div className="hamburger-menu" onClick={toggleMenu}>
                        <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    {/* Menu Navigation */}
                    <nav className={`navigation ${isMenuOpen ? 'open' : ''}`}>
                        <ul>
                            <li>
                                <NavLink to="/" onClick={closeMenu}>Trang chủ</NavLink>
                            </li>
                            <li>
                                <NavLink to="/services" onClick={closeMenu}>Dịch vụ</NavLink>
                            </li>
                            <li>
                                <NavLink to="/doctors" onClick={closeMenu}>Bác sĩ</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" onClick={closeMenu}>Giới thiệu</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" onClick={closeMenu}>Liên hệ</NavLink>
                            </li>
                            {currentUser ? (
                                <>
                                    <li>
                                        <NavLink to="/appointments" onClick={closeMenu}>Lịch hẹn</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/profile" onClick={closeMenu}>Hồ sơ</NavLink>
                                    </li>
                                    <li>
                                        <button className="logout-btn" onClick={handleLogout}>Đăng xuất</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink to="/login" onClick={closeMenu} className="login-btn">Đăng nhập</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/register" onClick={closeMenu} className="register-btn">Đăng ký</NavLink>
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