import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const DoctorProfile = () => {
    const { doctorId } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [stats, setStats] = useState({ totalRatings: 0, averageRating: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDoctorData();
    }, [doctorId]);

    const fetchDoctorData = async () => {
        try {
            setLoading(true);
            // Lấy thông tin bác sĩ
            const doctorRes = await axios.get(`/api/doctors/${doctorId}`);
            setDoctor(doctorRes.data);

            // Lấy đánh giá của bác sĩ
            const ratingsRes = await axios.get(`/api/ratings/doctor/${doctorId}`);
            setRatings(ratingsRes.data.data.ratings);
            setStats(ratingsRes.data.data.stats);

            setLoading(false);
        } catch (error) {
            setError('Không thể tải thông tin bác sĩ');
            console.error(error);
            setLoading(false);
        }
    };

    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, index) => (
            <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>★</span>
        ));
    };

    if (loading) {
        return <div className="loading">Đang tải thông tin...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!doctor) {
        return <div className="not-found">Không tìm thấy thông tin bác sĩ</div>;
    }

    return (
        <div className="doctor-profile">
            <div className="doctor-header">
                <Link to="/" className="back-link">← Quay lại</Link>
                <h2>Thông tin bác sĩ</h2>
            </div>

            <div className="doctor-info-card">
                <div className="doctor-info">
                    <h3>{doctor.User.fullName}</h3>
                    <p className="doctor-specialty">Chuyên khoa: {doctor.specialization}</p>
                    <p className="doctor-experience">Kinh nghiệm: {doctor.experience} năm</p>
                    <div className="doctor-rating">
                        <div className="rating-stars">
                            {renderStars(stats.averageRating)}
                            <span className="rating-number">({stats.averageRating.toFixed(1)})</span>
                        </div>
                        <span className="total-ratings">{stats.totalRatings} đánh giá</span>
                    </div>
                </div>

                <div className="doctor-contact">
                    <p><i className="fas fa-envelope"></i> {doctor.User.email}</p>
                    <p><i className="fas fa-phone"></i> {doctor.User.phoneNumber}</p>
                </div>
            </div>

            <div className="doctor-description">
                <h3>Giới thiệu</h3>
                <p>{doctor.description || 'Không có thông tin giới thiệu'}</p>
            </div>

            <div className="doctor-ratings-section">
                <h3>Đánh giá từ bệnh nhân</h3>
                {ratings.length === 0 ? (
                    <p className="no-ratings">Chưa có đánh giá nào</p>
                ) : (
                    <div className="ratings-list">
                        {ratings.map(rating => (
                            <div key={rating.id} className="rating-card">
                                <div className="rating-header">
                                    <div className="rating-stars">
                                        {renderStars(rating.rating)}
                                    </div>
                                    <div className="rating-date">
                                        {format(new Date(rating.createdAt), 'dd/MM/yyyy')}
                                    </div>
                                </div>
                                <div className="rating-author">
                                    <strong>{rating.patient.fullName}</strong>
                                </div>
                                <p className="rating-comment">{rating.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="doctor-action">
                <Link to="/book-appointment" className="book-appointment-btn">
                    Đặt lịch khám với bác sĩ này
                </Link>
            </div>
        </div>
    );
};

export default DoctorProfile; 