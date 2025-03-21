import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';



const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/appointments/doctor-appointments');
            setAppointments(res.data);
            setLoading(false);
        } catch (error) {
            setError('Không thể tải danh sách cuộc hẹn');
            console.error(error);
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await axios.put(`/api/appointments/${id}/status`, { status });

            // Hiển thị thông báo
            let message = '';
            switch (status) {
                case 'confirmed':
                    message = 'Xác nhận lịch hẹn thành công! Bệnh nhân đã được thông báo.';
                    break;
                case 'canceled':
                    message = 'Hủy lịch hẹn thành công! Bệnh nhân đã được thông báo.';
                    break;
                case 'completed':
                    message = 'Đánh dấu lịch hẹn đã hoàn thành!';
                    break;
                default:
                    message = 'Cập nhật trạng thái thành công!';
            }
            alert(message);

            fetchAppointments();
        } catch (error) {
            setError('Không thể cập nhật trạng thái cuộc hẹn');
            console.error(error);
        }
    };
    const handleCreateMedicalRecord = async (appointment) => {
        try {
            // Kiểm tra xem bệnh nhân đã có hồ sơ chưa
            const patientId = appointment.patient.id;
            const res = await axios.get(`/api/medical-records/patient/${patientId}`);
            const records = res.data.data;

            if (records.length > 0) {
                // Nếu đã có hồ sơ, chuyển đến trang thêm chi tiết
                const recordId = records[0].id;
                navigate(`/medical-records/${recordId}/add-detail`, {
                    state: { appointmentId: appointment.id }
                });
            } else {
                // Nếu chưa có hồ sơ, tạo hồ sơ mới
                const newRecord = await axios.post('/api/medical-records', {
                    patientId,
                    title: `Hồ sơ bệnh án - ${appointment.patient.fullName}`,
                    description: `Hồ sơ bệnh án của bệnh nhân ${appointment.patient.fullName}`
                });

                navigate(`/medical-records/${newRecord.data.data.id}/add-detail`, {
                    state: { appointmentId: appointment.id }
                });
            }
        } catch (error) {
            setError('Không thể tạo hồ sơ bệnh án');
            console.error(error);
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

    const filteredAppointments = filter === 'all'
        ? appointments
        : appointments.filter(a => a.status === filter);

    if (loading) {
        return <div className="loading">Đang tải dữ liệu...</div>;
    }

    return (
        <div className="doctor-dashboard">
            <h2>Quản lý lịch hẹn</h2>
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

            {filteredAppointments.length === 0 ? (
                <p className="no-appointments">Không có cuộc hẹn nào.</p>
            ) : (
                <div className="appointments-list">
                    {filteredAppointments.map(appointment => (
                        <div key={appointment.id} className="appointment-card">
                            <div className="appointment-header">
                                <h3>Lịch hẹn với: {appointment.patient.fullName}</h3>
                                <span className={`status ${getStatusClass(appointment.status)}`}>
                                    {getStatusText(appointment.status)}
                                </span>
                            </div>

                            <div className="appointment-details">
                                <p>
                                    <strong>Ngày khám:</strong> {format(new Date(appointment.Schedule.date), 'dd/MM/yyyy')}
                                </p>
                                <p>
                                    <strong>Thời gian:</strong> {appointment.Schedule.startTime} - {appointment.Schedule.endTime}
                                </p>
                                <p>
                                    <strong>Email:</strong> {appointment.patient.email}
                                </p>
                                <p>
                                    <strong>Số điện thoại:</strong> {appointment.patient.phoneNumber}
                                </p>
                                <p>
                                    <strong>Lý do khám:</strong> {appointment.reason}
                                </p>
                            </div>

                            <div className="appointment-actions">
                                {appointment.status === 'pending' && (
                                    <button
                                        className="confirm-btn"
                                        onClick={() => handleUpdateStatus(appointment.id, 'confirmed')}
                                    >
                                        Xác nhận
                                    </button>
                                )}

                                {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                                    <button
                                        className="complete-btn"
                                        onClick={() => handleUpdateStatus(appointment.id, 'completed')}
                                    >
                                        Hoàn thành
                                    </button>
                                )}

                                {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                                    <button
                                        className="cancel-btn"
                                        onClick={() => handleUpdateStatus(appointment.id, 'canceled')}
                                    >
                                        Hủy
                                    </button>
                                )}

                                {appointment.status === 'completed' && (
                                    <button
                                        className="create-record-btn"
                                        onClick={() => handleCreateMedicalRecord(appointment)}
                                    >
                                        Tạo hồ sơ bệnh án
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

};

export default DoctorDashboard;