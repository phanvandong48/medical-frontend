import React from 'react';
import { Link } from 'react-router-dom';
import aboutBanner from '../assets/about-banner.jpg'; // Thêm ảnh banner cho trang giới thiệu
import doctorTeam from '../assets/doctor-team.jpg'; // Thêm ảnh đội ngũ bác sĩ
import missionImage from '../assets/mission.jpg'; // Thêm ảnh minh họa sứ mệnh
import facilityImage from '../assets/facility.jpg'; // Thêm ảnh cơ sở vật chất
import leader1 from '../assets/leader1.jpg'; // Ảnh leader 1
import leader2 from '../assets/leader2.jpg'; // Ảnh leader 2
import leader3 from '../assets/leader3.jpg'; // Ảnh leader 3

const About = () => {
    return (
        <div className="about-page">
            {/* Banner Section */}
            <section className="about-banner" style={{ backgroundImage: `url(${aboutBanner})` }}>
                <div className="container">
                    <div className="banner-content">
                        <h1>Về Chúng Tôi</h1>
                        <p>Hiểu thêm về lịch sử, sứ mệnh và đội ngũ của chúng tôi</p>
                    </div>
                </div>
            </section>

            {/* History Section */}
            <section className="about-section history-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Lịch Sử Phát Triển</h2>
                        <div className="divider"></div>
                    </div>

                    <div className="about-content">
                        <div className="about-text">
                            <p>
                                Hệ thống Y tế MedCare được thành lập vào năm 2010 với một phòng khám nhỏ và 5 bác sĩ.
                                Qua hơn 10 năm hoạt động và phát triển, chúng tôi đã trở thành một trong những hệ thống y tế
                                uy tín hàng đầu tại Việt Nam với hơn 20 cơ sở trên toàn quốc.
                            </p>
                            <p>
                                Với tầm nhìn trở thành đơn vị cung cấp dịch vụ y tế chất lượng cao, MedCare không ngừng
                                đầu tư vào cơ sở vật chất, trang thiết bị hiện đại và phát triển đội ngũ y bác sĩ giỏi
                                chuyên môn, giàu kinh nghiệm.
                            </p>
                            <div className="timeline">
                                <div className="timeline-item">
                                    <div className="timeline-year">2010</div>
                                    <div className="timeline-content">
                                        <h4>Thành lập MedCare</h4>
                                        <p>Phòng khám đầu tiên được khai trương tại Quận 1, TP.HCM</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-year">2015</div>
                                    <div className="timeline-content">
                                        <h4>Mở rộng quy mô</h4>
                                        <p>Mở thêm 5 chi nhánh tại TP.HCM và Hà Nội</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-year">2018</div>
                                    <div className="timeline-content">
                                        <h4>Hợp tác quốc tế</h4>
                                        <p>Ký kết hợp tác với các đối tác y tế hàng đầu từ Mỹ, Singapore</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-year">2020</div>
                                    <div className="timeline-content">
                                        <h4>Triển khai nền tảng số</h4>
                                        <p>Ra mắt hệ thống đặt lịch khám trực tuyến và quản lý hồ sơ bệnh án điện tử</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-year">2023</div>
                                    <div className="timeline-content">
                                        <h4>Phát triển mạnh mẽ</h4>
                                        <p>Hiện diện tại 20 tỉnh thành trên cả nước với hơn 500 bác sĩ chuyên môn</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="about-section mission-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Sứ Mệnh & Tầm Nhìn</h2>
                        <div className="divider"></div>
                    </div>

                    <div className="mission-container">
                        <div className="mission-image">
                            <img src={missionImage} alt="Sứ mệnh của MedCare" />
                        </div>
                        <div className="mission-content">
                            <div className="mission-box">
                                <h3>Sứ mệnh</h3>
                                <p>
                                    Cung cấp dịch vụ chăm sóc sức khỏe chất lượng cao, an toàn và hiệu quả,
                                    góp phần nâng cao sức khỏe cộng đồng và chất lượng cuộc sống của người dân Việt Nam.
                                </p>
                            </div>
                            <div className="mission-box">
                                <h3>Tầm nhìn</h3>
                                <p>
                                    Trở thành hệ thống y tế hàng đầu Việt Nam được tin cậy và lựa chọn bởi
                                    người dân cả nước, phát triển theo hướng hiện đại, tiên tiến và hội nhập quốc tế.
                                </p>
                            </div>
                            <div className="mission-box">
                                <h3>Giá trị cốt lõi</h3>
                                <ul className="core-values">
                                    <li><strong>Chất lượng:</strong> Cam kết cung cấp dịch vụ y tế chất lượng cao</li>
                                    <li><strong>Tận tâm:</strong> Luôn đặt bệnh nhân là trung tâm của mọi hoạt động</li>
                                    <li><strong>Chuyên nghiệp:</strong> Áp dụng các tiêu chuẩn y khoa tiên tiến</li>
                                    <li><strong>Đổi mới:</strong> Không ngừng cải tiến và áp dụng công nghệ mới</li>
                                    <li><strong>Đồng cảm:</strong> Thấu hiểu và chia sẻ với bệnh nhân</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="about-section team-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Đội Ngũ Chuyên Gia</h2>
                        <div className="divider"></div>
                    </div>

                    <div className="team-content">
                        <div className="team-intro">
                            <div className="team-image">
                                <img src={doctorTeam} alt="Đội ngũ y bác sĩ MedCare" />
                            </div>
                            <div className="team-text">
                                <p>
                                    Đội ngũ y bác sĩ của MedCare là những chuyên gia đầu ngành với trình độ chuyên môn cao,
                                    được đào tạo tại các trường đại học y khoa uy tín trong và ngoài nước.
                                </p>
                                <p>
                                    Với hơn 500 y bác sĩ, chúng tôi có đủ năng lực đáp ứng mọi nhu cầu khám chữa bệnh
                                    của người dân trong nhiều chuyên khoa khác nhau.
                                </p>
                                <Link to="/doctors" className="btn btn-primary">
                                    Xem danh sách bác sĩ
                                </Link>
                            </div>
                        </div>

                        <div className="leadership">
                            <h3>Ban lãnh đạo</h3>
                            <div className="leadership-grid">
                                <div className="leader-card">
                                    <div className="leader-image">
                                        <img src={leader1} alt="GS.TS Trần Thị Thu Thủy" />
                                    </div>
                                    <div className="leader-info">
                                        <h4>GS.TS Trần Thị Thu Thủy</h4>
                                        <p className="leader-position">Chủ tịch Hội đồng quản trị</p>
                                        <p className="leader-bio">
                                            Với hơn 30 năm kinh nghiệm trong lĩnh vực y tế, GS.TS Trần Thị Thu Thủy
                                            là người đặt nền móng và định hướng phát triển cho MedCare.
                                        </p>
                                    </div>
                                </div>
                                <div className="leader-card">
                                    <div className="leader-image">
                                        <img src={leader2} alt="PGS.TS Diệp Hy" />
                                    </div>
                                    <div className="leader-info">
                                        <h4>PGS.TS Diệp Hy</h4>
                                        <p className="leader-position">Tổng Giám đốc</p>
                                        <p className="leader-bio">
                                            PGS.TS Diệp Hy là chuyên gia hàng đầu về quản lý y tế,
                                            từng công tác tại nhiều bệnh viện lớn trong nước và quốc tế.
                                        </p>
                                    </div>
                                </div>
                                <div className="leader-card">
                                    <div className="leader-image">
                                        <img src={leader3} alt="TS.BS Hứa Quang Hán" />
                                    </div>
                                    <div className="leader-info">
                                        <h4>TS.BS Hứa Quang Hán</h4>
                                        <p className="leader-position">Giám đốc Y khoa</p>
                                        <p className="leader-bio">
                                            TS.BS Hứa Quang Hán chịu trách nhiệm về các hoạt động chuyên môn,
                                            đảm bảo chất lượng dịch vụ y tế của toàn hệ thống.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Facilities Section */}
            <section className="about-section facilities-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Cơ Sở Vật Chất</h2>
                        <div className="divider"></div>
                    </div>

                    <div className="facilities-content">
                        <div className="facilities-text">
                            <p>
                                MedCare tự hào với hệ thống cơ sở vật chất hiện đại, đạt tiêu chuẩn quốc tế.
                                Chúng tôi liên tục đầu tư vào trang thiết bị y tế tiên tiến nhằm nâng cao
                                chất lượng dịch vụ và đáp ứng nhu cầu khám chữa bệnh ngày càng cao của người dân.
                            </p>
                            <ul className="facilities-list">
                                <li>Hệ thống phòng khám rộng rãi, thoáng mát và tiện nghi</li>
                                <li>Trang thiết bị y tế hiện đại, nhập khẩu từ Mỹ, Đức, Nhật Bản</li>
                                <li>Hệ thống chẩn đoán hình ảnh tiên tiến (CT Scanner, MRI, X-ray kỹ thuật số...)</li>
                                <li>Phòng xét nghiệm với công nghệ tự động hóa cao</li>
                                <li>Phòng phẫu thuật vô khuẩn một chiều theo tiêu chuẩn quốc tế</li>
                                <li>Khu vực chờ thoải mái với các tiện ích cho bệnh nhân và người nhà</li>
                            </ul>
                        </div>
                        <div className="facilities-image">
                            <img src={facilityImage} alt="Cơ sở vật chất của MedCare" />
                        </div>
                    </div>

                    <div className="facilities-gallery">
                        <h3>Hình ảnh các cơ sở</h3>
                        <div className="gallery-grid">
                            <div className="gallery-item">
                                <img src="/images/facility1.jpg" alt="Phòng khám" />
                                <p>Phòng khám hiện đại</p>
                            </div>
                            <div className="gallery-item">
                                <img src="/images/facility2.jpg" alt="Phòng mổ" />
                                <p>Phòng phẫu thuật tiên tiến</p>
                            </div>
                            <div className="gallery-item">
                                <img src="/images/facility3.jpg" alt="Phòng xét nghiệm" />
                                <p>Phòng xét nghiệm tự động</p>
                            </div>
                            <div className="gallery-item">
                                <img src="/images/facility4.jpg" alt="Khu vực chờ" />
                                <p>Khu vực chờ thoải mái</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="about-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Trải Nghiệm Dịch Vụ Y Tế Chất Lượng Cao</h2>
                        <p>Hãy để MedCare đồng hành cùng bạn trên hành trình chăm sóc sức khỏe</p>
                        <div className="cta-buttons">
                            <Link to="/book-appointment" className="btn btn-primary btn-lg">
                                Đặt lịch khám
                            </Link>
                            <Link to="/contact" className="btn btn-outline btn-lg">
                                Liên hệ tư vấn
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;