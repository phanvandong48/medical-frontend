// src/pages/Contact.js
import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Vui lòng nhập họ tên';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Vui lòng nhập số điện thoại';
        } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Vui lòng nhập chủ đề';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Vui lòng nhập nội dung';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {
            // In a real app, you would send this to your backend
            // await axios.post('/api/contact', formData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({
                submit: 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">
            <div className="container">
                <div className="page-header">
                    <h1>Liên Hệ</h1>
                    <p>Liên hệ với chúng tôi để được hỗ trợ và tư vấn</p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <div className="info-item">
                            <div className="info-icon">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div className="info-details">
                                <h3>Địa chỉ</h3>
                                <p>123 Đường Lê Lợi, Quận 1, TP.HCM</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <i className="fas fa-phone-alt"></i>
                            </div>
                            <div className="info-details">
                                <h3>Số điện thoại</h3>
                                <p>(+84) 28 1234 5678</p>
                                <p>(+84) 28 8765 4321</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="info-details">
                                <h3>Email</h3>
                                <p>info@medical-clinic.com</p>
                                <p>support@medical-clinic.com</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <i className="fas fa-clock"></i>
                            </div>
                            <div className="info-details">
                                <h3>Giờ làm việc</h3>
                                <p>Thứ Hai - Thứ Sáu: 8:00 - 17:00</p>
                                <p>Thứ Bảy: 8:00 - 12:00</p>
                                <p>Chủ Nhật: Đóng cửa</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        {submitted ? (
                            <div className="success-message">
                                <i className="fas fa-check-circle"></i>
                                <h3>Cảm ơn bạn đã liên hệ!</h3>
                                <p>Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất.</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setSubmitted(false)}
                                >
                                    Gửi tin nhắn khác
                                </button>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <h3>Gửi tin nhắn cho chúng tôi</h3>

                                <div className="form-group">
                                    <label htmlFor="name">Họ tên <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={errors.name ? 'error' : ''}
                                    />
                                    {errors.name && <div className="error-message">{errors.name}</div>}
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">Email <span className="required">*</span></label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={errors.email ? 'error' : ''}
                                        />
                                        {errors.email && <div className="error-message">{errors.email}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">Số điện thoại <span className="required">*</span></label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={errors.phone ? 'error' : ''}
                                        />
                                        {errors.phone && <div className="error-message">{errors.phone}</div>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Chủ đề <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={errors.subject ? 'error' : ''}
                                    />
                                    {errors.subject && <div className="error-message">{errors.subject}</div>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Nội dung <span className="required">*</span></label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={errors.message ? 'error' : ''}
                                    ></textarea>
                                    {errors.message && <div className="error-message">{errors.message}</div>}
                                </div>

                                {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="map-container">
                    <h3>Bản đồ</h3>
                    <div className="map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4946681007846!2d106.69877867480507!3d10.775486089387599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4670702e31%3A0xa5777fb3a5bb4888!2zUGjhu5EgTMOqIEzhu6NpLCBC4bq_biBOZ2jDqSwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1687253402928!5m2!1svi!2s"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Medical Clinic Location"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;