// src/pages/Services.js
import React from 'react';
import { Link } from 'react-router-dom';
import serviceBannerImage from '../assets/service-banner.jpg';

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
            {/* Banner chính với background gradient thay vì ảnh */}
            <div className="page-banner" style={{
                position: 'relative',
                width: '100%',
                height: '400px',
                overflow: 'hidden',
                marginBottom: '40px',
                background: 'linear-gradient(135deg, #3498db, #1a5276)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="banner-content" style={{
                    width: '100%',
                    maxWidth: '1200px',
                    padding: '0 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    color: '#fff'
                }}>
                    <h1 style={{
                        fontSize: '3.5rem',
                        marginBottom: '20px',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                        fontWeight: 'bold'
                    }}>Dịch Vụ Y Tế</h1>
                    <p style={{
                        fontSize: '1.3rem',
                        maxWidth: '800px',
                        margin: '0 auto',
                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
                        lineHeight: '1.6'
                    }}>Chăm sóc sức khỏe chuyên nghiệp - Tận tâm vì bệnh nhân</p>
                    <div style={{ marginTop: '30px' }}>
                        <Link
                            to="/book-appointment"
                            className="btn btn-primary"
                            style={{
                                display: 'inline-block',
                                padding: '14px 30px',
                                backgroundColor: '#fff',
                                color: '#3498db',
                                borderRadius: '30px',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                border: 'none',
                                fontSize: '1.1rem',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            Đặt lịch ngay
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Danh sách dịch vụ */}
                <section className="services-section">
                    <div className="section-header">
                        <h2>Các Dịch Vụ Của Chúng Tôi</h2>
                        <p>Phòng khám cung cấp đầy đủ các dịch vụ y tế chất lượng cao</p>
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
                </section>

                {/* Banner "Tại sao chọn chúng tôi" - Đã cập nhật với inline styles */}
                <section className="why-choose-us-section">
                    <div className="services-banner" style={{
                        background: 'linear-gradient(135deg, #3498db, #1a5276)',
                        borderRadius: '10px',
                        padding: '40px',
                        textAlign: 'center',
                        color: '#fff',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    }}>
                        <div className="banner-content" style={{
                            maxWidth: '800px',
                            margin: '0 auto',
                        }}>
                            <h2 style={{
                                fontSize: '2.2rem',
                                marginBottom: '20px',
                                textAlign: 'center',
                                color: '#fff',
                            }}>Tại sao chọn chúng tôi?</h2>

                            <ul style={{
                                listStyle: 'none',
                                padding: '0',
                                margin: '0 0 30px 0',
                                textAlign: 'left',
                                display: 'inline-block'
                            }}>
                                <li style={{
                                    padding: '10px 0',
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <span style={{
                                        display: 'inline-block',
                                        marginRight: '10px',
                                        width: '24px',
                                        height: '24px',
                                        backgroundColor: '#fff',
                                        borderRadius: '50%',
                                        color: '#3498db',
                                        textAlign: 'center',
                                        lineHeight: '24px',
                                    }}><i className="fas fa-check"></i></span>
                                    Đội ngũ y bác sĩ giàu kinh nghiệm và tận tâm
                                </li>
                                <li style={{
                                    padding: '10px 0',
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <span style={{
                                        display: 'inline-block',
                                        marginRight: '10px',
                                        width: '24px',
                                        height: '24px',
                                        backgroundColor: '#fff',
                                        borderRadius: '50%',
                                        color: '#3498db',
                                        textAlign: 'center',
                                        lineHeight: '24px',
                                    }}><i className="fas fa-check"></i></span>
                                    Trang thiết bị y tế hiện đại
                                </li>
                                <li style={{
                                    padding: '10px 0',
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <span style={{
                                        display: 'inline-block',
                                        marginRight: '10px',
                                        width: '24px',
                                        height: '24px',
                                        backgroundColor: '#fff',
                                        borderRadius: '50%',
                                        color: '#3498db',
                                        textAlign: 'center',
                                        lineHeight: '24px',
                                    }}><i className="fas fa-check"></i></span>
                                    Quy trình khám chữa bệnh chuyên nghiệp
                                </li>
                                <li style={{
                                    padding: '10px 0',
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <span style={{
                                        display: 'inline-block',
                                        marginRight: '10px',
                                        width: '24px',
                                        height: '24px',
                                        backgroundColor: '#fff',
                                        borderRadius: '50%',
                                        color: '#3498db',
                                        textAlign: 'center',
                                        lineHeight: '24px',
                                    }}><i className="fas fa-check"></i></span>
                                    Chi phí hợp lý và minh bạch
                                </li>
                                <li style={{
                                    padding: '10px 0',
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <span style={{
                                        display: 'inline-block',
                                        marginRight: '10px',
                                        width: '24px',
                                        height: '24px',
                                        backgroundColor: '#fff',
                                        borderRadius: '50%',
                                        color: '#3498db',
                                        textAlign: 'center',
                                        lineHeight: '24px',
                                    }}><i className="fas fa-check"></i></span>
                                    Môi trường phòng khám sạch sẽ, thân thiện
                                </li>
                            </ul>

                            <Link
                                to="/book-appointment"
                                className="btn btn-primary"
                                style={{
                                    display: 'inline-block',
                                    padding: '12px 30px',
                                    backgroundColor: '#fff',
                                    color: '#3498db',
                                    borderRadius: '30px',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    border: 'none',
                                    fontSize: '1.1rem',
                                }}
                            >
                                Đặt lịch ngay
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Call-to-action - Đã cập nhật để căn giữa và làm đẹp */}
                <section className="cta-section">
                    <div className="service-cta" style={{
                        textAlign: 'center',
                        background: '#f8f9fa',
                        padding: '50px 30px',
                        borderRadius: '10px',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                        margin: '40px auto',
                        maxWidth: '900px'
                    }}>
                        <h2 style={{
                            fontSize: '2rem',
                            marginBottom: '15px',
                            color: '#333'
                        }}>Bạn cần tư vấn về dịch vụ?</h2>

                        <p style={{
                            fontSize: '1.1rem',
                            color: '#666',
                            marginBottom: '30px',
                            maxWidth: '700px',
                            margin: '0 auto 30px'
                        }}>Liên hệ với chúng tôi để được tư vấn chi tiết về các dịch vụ phù hợp với nhu cầu của bạn</p>

                        <div className="cta-buttons" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '15px'
                        }}>
                            <Link
                                to="/contact"
                                className="btn btn-outline"
                                style={{
                                    display: 'inline-block',
                                    padding: '12px 25px',
                                    borderRadius: '30px',
                                    border: '2px solid #3498db',
                                    color: '#3498db',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    background: 'transparent'
                                }}
                            >
                                Liên hệ ngay
                            </Link>
                            <Link
                                to="/book-appointment"
                                className="btn btn-primary"
                                style={{
                                    display: 'inline-block',
                                    padding: '12px 25px',
                                    borderRadius: '30px',
                                    background: '#3498db',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    border: 'none'
                                }}
                            >
                                Đặt lịch khám
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Services;