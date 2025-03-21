// src/pages/Services.js
import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
    const services = [
        {
            id: 1,
            title: 'Khám Tổng Quát',
            description: 'Dịch vụ khám sức khỏe tổng quát giúp phát hiện sớm các bệnh lý tiềm ẩn và đánh giá tình trạng sức khỏe tổng thể.',
            icon: 'fa-stethoscope'
        },
        {
            id: 2,
            title: 'Khám Chuyên Khoa',
            description: 'Đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm trong các lĩnh vực như tim mạch, tiêu hóa, thần kinh, nhi khoa...',
            icon: 'fa-user-md'
        },
        {
            id: 3,
            title: 'Xét Nghiệm & Chẩn Đoán Hình Ảnh',
            description: 'Trang bị máy móc hiện đại cho các xét nghiệm máu, nước tiểu, siêu âm, X-quang, CT scan...',
            icon: 'fa-microscope'
        },
        {
            id: 4,
            title: 'Tư Vấn Dinh Dưỡng',
            description: 'Tư vấn chế độ ăn uống phù hợp với tình trạng sức khỏe và nhu cầu của từng người.',
            icon: 'fa-apple-alt'
        },
        {
            id: 5,
            title: 'Tiêm Chủng',
            description: 'Dịch vụ tiêm chủng vắc-xin cho trẻ em và người lớn theo lịch tiêm chủng quốc gia và theo nhu cầu.',
            icon: 'fa-syringe'
        },
        {
            id: 6,
            title: 'Tư Vấn Sức Khỏe Tâm Thần',
            description: 'Dịch vụ tư vấn và trị liệu tâm lý, hỗ trợ giải quyết các vấn đề về stress, lo âu, trầm cảm...',
            icon: 'fa-brain'
        }
    ];

    return (
        <div className="services-page">
            <div className="container">
                <div className="page-header">
                    <h1>Dịch Vụ Y Tế</h1>
                    <p>Phòng khám cung cấp đầy đủ các dịch vụ y tế chất lượng cao</p>
                </div>

                <div className="services-banner">
                    <div className="banner-content">
                        <h2>Tại sao chọn chúng tôi?</h2>
                        <ul>
                            <li>Đội ngũ y bác sĩ giàu kinh nghiệm và tận tâm</li>
                            <li>Trang thiết bị y tế hiện đại</li>
                            <li>Quy trình khám chữa bệnh chuyên nghiệp</li>
                            <li>Chi phí hợp lý và minh bạch</li>
                            <li>Môi trường phòng khám sạch sẽ, thân thiện</li>
                        </ul>
                        <Link to="/book-appointment" className="btn btn-primary">Đặt lịch ngay</Link>
                    </div>
                </div>

                <div className="services-list">
                    {services.map(service => (
                        <div key={service.id} className="service-card">
                            <div className="service-icon">
                                <i className={`fas ${service.icon}`}></i>
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>

                <div className="service-cta">
                    <h2>Bạn cần tư vấn về dịch vụ?</h2>
                    <p>Liên hệ với chúng tôi để được tư vấn chi tiết về các dịch vụ phù hợp với nhu cầu của bạn</p>
                    <div className="cta-buttons">
                        <Link to="/contact" className="btn btn-outline">Liên hệ ngay</Link>
                        <Link to="/book-appointment" className="btn btn-primary">Đặt lịch khám</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;