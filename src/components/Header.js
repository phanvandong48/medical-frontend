import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faCalendarAlt, faClipboardList, faHospital, faDashboard, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const { currentUser, logout } = useAuth();
    const userRole = currentUser?.role || localStorage.getItem('userRole');

    useEffect(() => {
        const controlHeader = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                if (currentScrollY > lastScrollY) {
                    setVisible(false);
                } else {
                    setVisible(true);
                }
            } else {
                setVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', controlHeader);
        return () => {
            window.removeEventListener('scroll', controlHeader);
        };
    }, [lastScrollY]);

    useEffect(() => {
        const closeDropdown = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', closeDropdown);
        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsDropdownOpen(prevState => !prevState);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prevState => !prevState);
    };

    const handleLogout = () => {
        logout();
        localStorage.removeItem('fullName');
        localStorage.removeItem('doctorName');
        localStorage.removeItem('patientName');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        setIsMobileMenuOpen(false);
        navigate('/login');
    };

    const getUserIcon = () => {
        if (userRole === 'PATIENT' || userRole === 'patient') {
            return 'user-icon patient-icon';
        } else if (userRole === 'DOCTOR' || userRole === 'doctor') {
            return 'user-icon doctor-icon';
        } else if (userRole === 'ADMIN' || userRole === 'admin') {
            return 'user-icon admin-icon';
        } else {
            return 'user-icon';
        }
    };

    const getDisplayName = () => {
        if (currentUser) {
            return currentUser.fullName || currentUser.doctorName ||
                currentUser.patientName || currentUser.name ||
                currentUser.username || currentUser.email;
        } else {
            const fullName = localStorage.getItem('fullName');
            const doctorName = localStorage.getItem('doctorName');
            const patientName = localStorage.getItem('patientName');
            const userName = localStorage.getItem('userName');

            if (fullName && fullName !== 'undefined' && fullName !== 'null') {
                return fullName;
            } else if ((userRole === 'DOCTOR' || userRole === 'doctor') && doctorName && doctorName !== 'undefined' && doctorName !== 'null') {
                return doctorName;
            } else if ((userRole === 'PATIENT' || userRole === 'patient') && patientName && patientName !== 'undefined' && patientName !== 'null') {
                return patientName;
            } else if (userName && userName !== 'undefined' && userName !== 'null' && userName !== 'Người dùng') {
                return userName;
            }
            return '';
        }
    };

    const isLoggedIn = !!currentUser || !!localStorage.getItem('token');
    const displayName = getDisplayName();
    const normalizedRole = userRole?.toLowerCase();

    return (
        <header className={`app-header ${visible ? 'header-visible' : 'header-hidden'}`}>
            <div className="header-container">
                <div className="logo-container">
                    <Link to="/">
                        <span className="logo-text">MedCare</span>
                    </Link>
                </div>

                <button className="hamburger" onClick={toggleMobileMenu} aria-label="Menu">
                    <FontAwesomeIcon icon={faBars} />
                </button>

                {/* Desktop Navigation */}
                <nav className="nav-menu">
                    <ul>
                        <li><Link to="/">Trang chủ</Link></li>
                        <li><Link to="/services">Dịch vụ</Link></li>
                        <li><Link to="/doctors">Bác sĩ</Link></li>
                        <li><Link to="/about">Giới thiệu</Link></li>
                        <li><Link to="/contact">Liên hệ</Link></li>
                    </ul>
                </nav>

                {/* Desktop User Menu */}
                <div className="user-menu">
                    {isLoggedIn ? (
                        <div className="dropdown" ref={dropdownRef}>
                            <button
                                className="dropdown-toggle"
                                onClick={toggleDropdown}
                                aria-haspopup="true"
                                aria-expanded={isDropdownOpen}
                                type="button"
                            >
                                <div className="user-info">
                                    <span className="user-name">Xin chào, {displayName}</span>
                                </div>
                            </button>

                            <div
                                className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {normalizedRole === 'patient' && (
                                    <>
                                        <div className="dropdown-section">Khu vực bệnh nhân</div>
                                        <Link to="/book-appointment" className="dropdown-item">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="icon-margin" /> Đặt lịch khám
                                        </Link>
                                        <Link to="/my-appointments" className="dropdown-item">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="icon-margin" /> Lịch khám của tôi
                                        </Link>
                                        <Link to="/medical-records" className="dropdown-item">
                                            <FontAwesomeIcon icon={faClipboardList} className="icon-margin" /> Hồ sơ bệnh án
                                        </Link>
                                    </>
                                )}

                                {normalizedRole === 'doctor' && (
                                    <>
                                        <div className="dropdown-section">Khu vực bác sĩ</div>
                                        <Link to="/doctor/dashboard" className="dropdown-item">
                                            <FontAwesomeIcon icon={faDashboard} className="icon-margin" /> Dashboard
                                        </Link>
                                        <Link to="/doctor/schedule" className="dropdown-item">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="icon-margin" /> Quản lý lịch
                                        </Link>
                                        <Link to="/doctor/medical-records" className="dropdown-item">
                                            <FontAwesomeIcon icon={faClipboardList} className="icon-margin" /> Hồ sơ bệnh nhân
                                        </Link>
                                    </>
                                )}

                                {normalizedRole === 'admin' && (
                                    <>
                                        <div className="dropdown-section">Khu vực quản trị</div>
                                        <Link to="/admin/dashboard" className="dropdown-item">
                                            <FontAwesomeIcon icon={faDashboard} className="icon-margin" /> Quản lý
                                        </Link>
                                        <Link to="/admin/medical-records" className="dropdown-item">
                                            <FontAwesomeIcon icon={faClipboardList} className="icon-margin" /> Quản lý hồ sơ bệnh nhân
                                        </Link>
                                    </>
                                )}

                                <div className="dropdown-divider"></div>

                                <Link to="/profile" className="dropdown-item">
                                    <FontAwesomeIcon icon={faUser} className="icon-margin" /> Thông tin cá nhân
                                </Link>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleLogout();
                                    }}
                                    className="dropdown-item logout-item"
                                    type="button"
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} className="icon-margin" /> Đăng xuất
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="login-button">Đăng nhập</Link>
                            <Link to="/register" className="register-button">Đăng ký</Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={toggleMobileMenu}
            ></div>

            {/* Mobile Menu Container */}
            <div
                className={`mobile-menu-container ${isMobileMenuOpen ? 'active' : ''}`}
                ref={mobileMenuRef}
            >
                <div className="mobile-menu-header">
                    <span>Menu</span>
                    <button onClick={toggleMobileMenu} aria-label="Đóng menu">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <div className="mobile-menu-content">
                    {/* Mobile Navigation Links */}
                    <ul className="mobile-nav-links">
                        <li><Link to="/" onClick={toggleMobileMenu}>Trang chủ</Link></li>
                        <li><Link to="/services" onClick={toggleMobileMenu}>Dịch vụ</Link></li>
                        <li><Link to="/doctors" onClick={toggleMobileMenu}>Bác sĩ</Link></li>
                        <li><Link to="/about" onClick={toggleMobileMenu}>Giới thiệu</Link></li>
                        <li><Link to="/contact" onClick={toggleMobileMenu}>Liên hệ</Link></li>
                    </ul>

                    {/* Mobile User Section */}
                    {isLoggedIn ? (
                        <div className="mobile-user-section">
                            <div className="mobile-user-greeting">Xin chào, {displayName}</div>

                            <Link to="/profile" className="mobile-menu-link" onClick={toggleMobileMenu}>
                                <FontAwesomeIcon icon={faUser} className="icon-margin" /> Thông tin cá nhân
                            </Link>

                            {normalizedRole === 'patient' && (
                                <>
                                    <div className="mobile-section-title">Khu vực bệnh nhân</div>
                                    <Link to="/book-appointment" className="mobile-menu-link" onClick={toggleMobileMenu}>
                                        <FontAwesomeIcon icon={faCalendarAlt} className="icon-margin" /> Đặt lịch khám
                                    </Link>
                                    <Link to="/my-appointments" className="mobile-menu-link" onClick={toggleMobileMenu}>
                                        <FontAwesomeIcon icon={faCalendarAlt} className="icon-margin" /> Lịch khám của tôi
                                    </Link>
                                    <Link to="/medical-records" className="mobile-menu-link" onClick={toggleMobileMenu}>
                                        <FontAwesomeIcon icon={faClipboardList} className="icon-margin" /> Hồ sơ bệnh án
                                    </Link>
                                </>
                            )}

                            {normalizedRole === 'doctor' && (
                                <>
                                    <div className="mobile-section-title">Khu vực bác sĩ</div>
                                    <Link to="/doctor/dashboard" className="mobile-menu-link" onClick={toggleMobileMenu}>
                                        <FontAwesomeIcon icon={faDashboard} className="icon-margin" /> Dashboard
                                    </Link>
                                    <Link to="/doctor/schedule" className="mobile-menu-link" onClick={toggleMobileMenu}>
                                        <FontAwesomeIcon icon={faCalendarAlt} className="icon-margin" /> Quản lý lịch
                                    </Link>
                                    <Link to="/doctor/medical-records" className="mobile-menu-link" onClick={toggleMobileMenu}>
                                        <FontAwesomeIcon icon={faClipboardList} className="icon-margin" /> Hồ sơ bệnh nhân
                                    </Link>
                                </>
                            )}

                            {normalizedRole === 'admin' && (
                                <>
                                    <div className="mobile-section-title">Khu vực quản trị</div>
                                    <Link to="/admin/dashboard" className="mobile-menu-link" onClick={toggleMobileMenu}>
                                        <FontAwesomeIcon icon={faDashboard} className="icon-margin" /> Quản lý
                                    </Link>
                                    <Link to="/admin/medical-records" className="mobile-menu-link" onClick={toggleMobileMenu}>
                                        <FontAwesomeIcon icon={faClipboardList} className="icon-margin" /> Quản lý hồ sơ bệnh nhân
                                    </Link>
                                </>
                            )}

                            <button
                                onClick={handleLogout}
                                className="mobile-logout-button"
                                type="button"
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} className="icon-margin" /> Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <div className="mobile-auth-links">
                            <Link to="/login" className="mobile-login-btn" onClick={toggleMobileMenu}>Đăng nhập</Link>
                            <Link to="/register" className="mobile-register-btn" onClick={toggleMobileMenu}>Đăng ký</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;