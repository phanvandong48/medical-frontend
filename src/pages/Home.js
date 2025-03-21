// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import doctorPlaceholder from '../assets/doctor-placeholder.jpg';
import bannerImg from '../assets/banner.jpg';


const Home = () => {
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

    // Helper function to render star ratings
    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, index) => (
            <span key={index} className={`star ${index < Math.round(rating) ? 'filled' : ''}`}>★</span>
        ));
    };

    return (
        <div className="home-page">
            {/* Banner Section */}
            <section className="banner" style={{ backgroundImage: `url(${bannerImg})` }}>
                <div className="container">
                    <div className="banner-content">
                        <h1>Chăm sóc sức khỏe chất lượng cao</h1>
                        <p>Đặt lịch khám trực tuyến, thuận tiện và nhanh chóng</p>
                        <Link to="/book-appointment" className="btn btn-primary btn-lg">
                            Đặt lịch ngay
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Các dịch vụ của chúng tôi</h2>
                        <p>Chăm sóc sức khỏe toàn diện cho bạn và gia đình</p>
                    </div>

                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-calendar-alt"></i>
                            </div>
                            <h3>Đặt lịch trực tuyến</h3>
                            <p>Đặt lịch khám 24/7 qua hệ thống trực tuyến tiện lợi</p>
                        </div>

                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-user-md"></i>
                            </div>
                            <h3>Bác sĩ chuyên môn</h3>
                            <p>Đội ngũ y bác sĩ giàu kinh nghiệm và trình độ chuyên môn cao</p>
                        </div>

                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-hospital"></i>
                            </div>
                            <h3>Cơ sở vật chất</h3>
                            <p>Trang thiết bị y tế hiện đại, phòng khám tiêu chuẩn quốc tế</p>
                        </div>

                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-phone"></i>
                            </div>
                            <h3>Tư vấn trực tiếp</h3>
                            <p>Hỗ trợ tư vấn trực tiếp qua điện thoại và trực tuyến</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Doctors Section */}
            <section className="doctors-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Đội ngũ bác sĩ</h2>
                        <p>Bác sĩ chuyên môn cao và giàu kinh nghiệm</p>
                    </div>

                    {loading ? (
                        <div className="loading">Đang tải danh sách bác sĩ...</div>
                    ) : error ? (
                        <div className="error-message">{error}</div>
                    ) : (
                        <div className="doctors-grid">
                            {doctors.slice(0, 4).map(doctor => (
                                <Link to={`/doctors/${doctor.id}`} key={doctor.id} className="doctor-card">
                                    <div className="doctor-image">
                                        <img src={doctor.imageUrl || doctorPlaceholder} alt={doctor.User.fullName} />
                                    </div>
                                    <div className="doctor-info">
                                        <h3>{doctor.User.fullName}</h3>
                                        <p className="doctor-specialty">{doctor.specialization}</p>
                                        <p className="doctor-experience">Kinh nghiệm: {doctor.experience} năm</p>
                                        <div className="doctor-details">
                                            <div className="doctor-rating">
                                                {renderStars(doctor.averageRating || 0)}
                                                <span>({doctor.ratingsCount || 0} đánh giá)</span>
                                            </div>
                                            <p className="view-profile">Xem hồ sơ chi tiết</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    <div className="view-all-doctors">
                        <Link to="/doctors" className="btn btn-outline">Xem tất cả bác sĩ</Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Phản hồi từ bệnh nhân</h2>
                        <p>Những gì bệnh nhân nói về chúng tôi</p>
                    </div>

                    <div className="testimonials-slider">
                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <p>"Tôi rất hài lòng với dịch vụ tại phòng khám. Bác sĩ chuyên nghiệp và tận tâm,
                                    thủ tục đơn giản và nhanh chóng."</p>
                            </div>
                            <div className="testimonial-author">
                                <h4>Nguyễn Văn A</h4>
                                <p>Bệnh nhân</p>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <p>"Hệ thống đặt lịch trực tuyến rất tiện lợi, tôi không cần phải đợi chờ.
                                    Bác sĩ tư vấn rất chi tiết và dễ hiểu."</p>
                            </div>
                            <div className="testimonial-author">
                                <h4>Trần Thị B</h4>
                                <p>Bệnh nhân</p>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <p>"Phòng khám sạch sẽ, nhân viên thân thiện và chuyên nghiệp.
                                    Tôi sẽ giới thiệu cho bạn bè và người thân."</p>
                            </div>
                            <div className="testimonial-author">
                                <h4>Lê Văn C</h4>
                                <p>Bệnh nhân</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;