// src/pages/Doctors.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import doctorPlaceholder from '../assets/doctor-placeholder.jpg';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSpecialty, setFilterSpecialty] = useState('');
    const [specialties, setSpecialties] = useState([]);

    useEffect(() => {
        const checkRatingsAndFetch = () => {
            // Kiểm tra xem có cập nhật đánh giá không
            const ratingsUpdated = localStorage.getItem('ratingsUpdated');
            if (ratingsUpdated === 'true') {
                // Xóa flag
                localStorage.removeItem('ratingsUpdated');
                // Tải lại dữ liệu
                fetchDoctors();
            }
        };

        fetchDoctors();

        // Kiểm tra cập nhật khi component mount
        checkRatingsAndFetch();

        // Kiểm tra cập nhật khi component được focus lại
        window.addEventListener('focus', checkRatingsAndFetch);

        return () => {
            window.removeEventListener('focus', checkRatingsAndFetch);
        };
    }, []);

    const fetchDoctors = async () => {
        try {
            const res = await axios.get('/api/doctors');
            setDoctors(res.data);

            // Extract unique specialties for filter
            const uniqueSpecialties = [...new Set(res.data.map(doctor => doctor.specialization))];
            setSpecialties(uniqueSpecialties);

            setLoading(false);
        } catch (error) {
            setError('Không thể tải danh sách bác sĩ');
            console.error(error);
            setLoading(false);
        }
    };

    // Filter doctors based on search term and specialty
    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.User.fullName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = filterSpecialty === '' || doctor.specialization === filterSpecialty;
        return matchesSearch && matchesSpecialty;
    });

    // Render star ratings
    const renderStars = (rating) => {
        const numRating = parseFloat(rating) || 0;
        return (
            <div className="rating-display">
                {Array(5).fill(0).map((_, index) => (
                    <span key={index} className={`star ${index < Math.round(numRating) ? 'filled' : ''}`}>★</span>
                ))}
                <span className="rating-value">({numRating})</span>
            </div>
        );
    };

    return (
        <div className="doctors-page">
            <div className="container">
                <div className="page-header">
                    <h1>Đội ngũ bác sĩ</h1>
                    <p>Tìm hiểu về các bác sĩ chuyên môn của chúng tôi</p>
                </div>

                <div className="filters-container">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên bác sĩ"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="specialty-filter">
                        <select
                            value={filterSpecialty}
                            onChange={(e) => setFilterSpecialty(e.target.value)}
                        >
                            <option value="">Tất cả chuyên khoa</option>
                            {specialties.map(specialty => (
                                <option key={specialty} value={specialty}>{specialty}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="loading">Đang tải danh sách bác sĩ...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <div className="doctors-grid">
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map(doctor => (
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
                                                {renderStars(doctor.averageRating)}
                                                <span className="rating-count">({doctor.ratingsCount || 0} đánh giá)</span>
                                            </div>
                                            <p className="view-profile">Xem hồ sơ chi tiết</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="no-results">Không tìm thấy bác sĩ phù hợp với tiêu chí tìm kiếm</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Doctors;