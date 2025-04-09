import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { format } from 'date-fns';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { getMyAppointments } from '../controllers/appointmentController';
import { vi } from 'date-fns/locale';

const MyAppointments = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [ratingError, setRatingError] = useState('');
    const [ratingSuccess, setRatingSuccess] = useState('');
    const [myRatings, setMyRatings] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/appointments/my-appointments');
            setAppointments(res.data);
            setLoading(false);
        } catch (error) {
            setError('Không thể tải lịch khám của bạn');
            console.error(error);
            setLoading(false);
        }
    };

    const handleCancelAppointment = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn hủy lịch khám này? Thông báo sẽ được gửi qua email và tin nhắn.')) {
            try {
                await axios.put(`/api/appointments/${id}/status`, {
                    status: 'canceled'
                });

                // Cập nhật lại danh sách lịch khám
                fetchAppointments();
                alert('Hủy lịch khám thành công! Thông báo đã được gửi.');
            } catch (error) {
                setError('Không thể hủy lịch khám');
                console.error(error);
            }
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'Chờ xác nhận';
            case 'confirmed':
                return 'Đã xác nhận';
            case 'canceled':
                return 'Đã hủy';
            case 'completed':
                return 'Đã hoàn thành';
            default:
                return status;
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return 'status-pending';
            case 'confirmed':
                return 'status-confirmed';
            case 'canceled':
                return 'status-canceled';
            case 'completed':
                return 'status-completed';
            default:
                return '';
        }
    };

    const handleOpenRating = (appointment) => {
        setSelectedAppointment(appointment);
        setShowRatingModal(true);
        setRatingError('');
        setRatingSuccess('');
    };

    const handleCloseRating = () => {
        setShowRatingModal(false);
        setSelectedAppointment(null);
    };

    const handleSubmitRating = async (values, { resetForm }) => {
        try {
            const response = await axios.post('/api/ratings', {
                appointmentId: selectedAppointment.id,
                rating: values.rating,
                comment: values.comment
            });

            setRatingSuccess('Cảm ơn bạn đã đánh giá bác sĩ!');
            setRatingError('');
            resetForm();

            localStorage.setItem('ratingsUpdated', 'true');

            fetchAppointments();

            setTimeout(() => {
                setShowRatingModal(false);
                setRatingSuccess('');
            }, 2000);
        } catch (error) {
            setRatingError(error.response?.data?.message || 'Không thể gửi đánh giá');
            console.error(error);
        }
    };

    const ratingValidationSchema = Yup.object({
        rating: Yup.number()
            .required('Vui lòng chọn số sao')
            .min(1, 'Vui lòng chọn ít nhất 1 sao')
            .max(5, 'Tối đa 5 sao'),
        comment: Yup.string()
            .required('Vui lòng nhập nhận xét')
            .min(10, 'Nhận xét phải có ít nhất 10 ký tự')
    });

    if (loading) {
        return <div className="loading">Đang tải dữ liệu...</div>;
    }

    return (
        <div className="my-appointments">
            <h2>Lịch khám của tôi</h2>
            {error && <div className="error-message">{error}</div>}

            <div className="filter-controls">
                <label>Lọc theo trạng thái:</label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">Tất cả</option>
                    <option value="pending">Chờ xác nhận</option>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="completed">Đã hoàn thành</option>
                    <option value="canceled">Đã hủy</option>
                </select>
            </div>

            {appointments.length === 0 ? (
                <p className="no-appointments">Bạn chưa có lịch khám nào.</p>
            ) : (
                <div className="appointments-list">
                    {appointments.map(appointment => (
                        <div key={appointment.id} className="appointment-card">
                            <div className="appointment-header">
                                <h3>
                                    Lịch khám với BS. {appointment?.Schedule?.Doctor?.User?.fullName || 'Không xác định'}
                                </h3>
                                <span className={`status ${getStatusClass(appointment.status)}`}>
                                    {getStatusText(appointment.status)}
                                </span>
                            </div>

                            <div className="appointment-details">
                                <p>
                                    <strong>Ngày khám:</strong> {appointment?.Schedule?.date ? format(new Date(appointment.Schedule.date), 'dd/MM/yyyy') : 'N/A'}
                                </p>
                                <p>
                                    <strong>Thời gian:</strong> {appointment?.Schedule?.startTime || 'N/A'} - {appointment?.Schedule?.endTime || 'N/A'}
                                </p>
                                <p>
                                    <strong>Chuyên khoa:</strong> {appointment?.Schedule?.Doctor?.specialization || 'N/A'}
                                </p>
                                <p>
                                    <strong>Lý do khám:</strong> {appointment?.reason || 'N/A'}
                                </p>
                            </div>

                            <div className="appointment-actions">
                                {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                                    <button
                                        className="cancel-btn"
                                        onClick={() => handleCancelAppointment(appointment.id)}
                                    >
                                        Hủy lịch khám
                                    </button>
                                )}

                                {appointment.status === 'completed' && !appointment.DoctorRating && (
                                    <button
                                        onClick={() => handleOpenRating(appointment)}
                                        className="rate-btn"
                                    >
                                        Đánh giá bác sĩ
                                    </button>
                                )}

                                {appointment.status === 'completed' && appointment.DoctorRating && (
                                    <div className="rating-info">
                                        <span className="rating-label">Đã đánh giá: </span>
                                        <span className="rating-stars">
                                            {Array(appointment.DoctorRating.rating).fill('★').join('')}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showRatingModal && selectedAppointment && (
                <div className="rating-modal-overlay">
                    <div className="rating-modal">
                        <div className="rating-modal-header">
                            <h3>Đánh giá bác sĩ {selectedAppointment?.Schedule?.Doctor?.User?.fullName || 'Không xác định'}</h3>
                            <button className="close-modal" onClick={handleCloseRating}>×</button>
                        </div>

                        {ratingError && <div className="error-message">{ratingError}</div>}
                        {ratingSuccess && <div className="success-message">{ratingSuccess}</div>}

                        <Formik
                            initialValues={{ rating: 5, comment: '' }}
                            validationSchema={ratingValidationSchema}
                            onSubmit={handleSubmitRating}
                        >
                            {({ values }) => (
                                <Form className="rating-form">
                                    <div className="form-group rating-stars-input">
                                        <label>Đánh giá của bạn:</label>
                                        <div className="star-rating">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <label key={star}>
                                                    <Field
                                                        type="radio"
                                                        name="rating"
                                                        value={star}
                                                        className="star-input"
                                                    />
                                                    <span className={`star ${values.rating >= star ? 'selected' : ''}`}>★</span>
                                                </label>
                                            ))}
                                        </div>
                                        <ErrorMessage name="rating" component="div" className="error" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="comment">Nhận xét:</label>
                                        <Field
                                            as="textarea"
                                            id="comment"
                                            name="comment"
                                            rows="4"
                                            placeholder="Chia sẻ trải nghiệm của bạn với bác sĩ..."
                                        />
                                        <ErrorMessage name="comment" component="div" className="error" />
                                    </div>

                                    <button type="submit" className="submit-rating-btn">Gửi đánh giá</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAppointments;