import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const res = await axios.get('/api/doctors');
            setDoctors(res.data);
            setLoading(false);
        } catch (error) {
            setError('Không thể tải danh sách bác sĩ');
            console.error(error);
            setLoading(false);
        }
    };

    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, index) => (
            <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>★</span>
        ));
    };

    return (
        <div className="home-container">
            <section className="hero-section">
                <h1>Đặt lịch khám bệnh trực tuyến</h1>
                <p>Tiện lợi, nhanh chóng và an toàn</p>
                {currentUser ? (
                    <Link to="/book-appointment" className="btn">Đặt lịch ngay</Link>
                ) : (
                    <Link to="/login" className="btn">Đăng nhập để đặt lịch</Link>
                )}
            </section>

            <section className="features-section">
                <div className="feature">
                    <h3>Đặt lịch 24/7</h3>
                    <p>Đặt lịch khám mọi lúc, mọi nơi với hệ thống đặt lịch trực tuyến</p>
                </div>
                <div className="feature">
                    <h3>Bác sĩ chuyên môn</h3>
                    <p>Đội ngũ bác sĩ giàu kinh nghiệm, chuyên môn cao</p>
                </div>
                <div className="feature">
                    <h3>Nhận thông báo</h3>
                    <p>Nhận thông báo tự động qua email và SMS</p>
                </div>
            </section>

            <section className="doctors-section">
                <h2>Đội ngũ bác sĩ</h2>
                {loading ? (
                    <div className="loading">Đang tải danh sách bác sĩ...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <div className="doctors-list">
                        {doctors.map(doctor => (
                            <Link to={`/doctors/${doctor.id}`} key={doctor.id} className="doctor-card">
                                <h3>{doctor.User.fullName}</h3>
                                <p className="doctor-specialty">Chuyên khoa: {doctor.specialization}</p>
                                <p className="doctor-experience">Kinh nghiệm: {doctor.experience} năm</p>
                                <div className="view-profile">Xem hồ sơ và đánh giá</div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;