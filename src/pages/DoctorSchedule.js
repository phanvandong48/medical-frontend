import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';

const DoctorSchedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            // Lấy thông tin bác sĩ đang đăng nhập
            const doctorRes = await axios.get('/api/doctors/me');
            const doctorId = doctorRes.data.id;

            // Sau đó lấy tất cả các lịch của bác sĩ này
            const res = await axios.get(`/api/doctors/${doctorId}/schedules/all`);
            setSchedules(res.data);
            setLoading(false);
        } catch (error) {
            setError('Không thể tải lịch khám');
            console.error(error);
            setLoading(false);
        }
    };

    const initialValues = {
        date: '',
        startTime: '',
        endTime: ''
    };

    const validationSchema = Yup.object({
        date: Yup.date()
            .min(new Date(), 'Ngày phải lớn hơn hoặc bằng ngày hiện tại')
            .required('Ngày khám là bắt buộc'),
        startTime: Yup.string().required('Thời gian bắt đầu là bắt buộc'),
        endTime: Yup.string()
            .required('Thời gian kết thúc là bắt buộc')
            .test('is-greater', 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu', function (endTime) {
                const { startTime } = this.parent;
                if (!startTime || !endTime) return true;
                return endTime > startTime;
            })
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            await axios.post('http://localhost:5000/api/doctors/schedules', values);
            alert('Tạo lịch khám thành công!');
            resetForm();
            fetchSchedules();
        } catch (error) {
            setError(error.response?.data?.message || 'Tạo lịch khám thất bại');
        } finally {
            setSubmitting(false);
        }
    };

    const getStatusText = (status) => {
        return status === 'available' ? 'Khả dụng' : 'Đã đặt';
    };

    const getStatusClass = (status) => {
        return status === 'available' ? 'status-available' : 'status-booked';
    };

    if (loading) {
        return <div className="loading">Đang tải dữ liệu...</div>;
    }

    return (
        <div className="doctor-schedule">
            <h2>Quản lý lịch khám</h2>
            {error && <div className="error-message">{error}</div>}

            <div className="schedule-form-container">
                <h3>Tạo lịch khám mới</h3>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="date">Ngày khám</label>
                                <Field type="date" id="date" name="date" />
                                <ErrorMessage name="date" component="div" className="error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="startTime">Thời gian bắt đầu</label>
                                <Field type="time" id="startTime" name="startTime" />
                                <ErrorMessage name="startTime" component="div" className="error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="endTime">Thời gian kết thúc</label>
                                <Field type="time" id="endTime" name="endTime" />
                                <ErrorMessage name="endTime" component="div" className="error" />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="submit-btn"
                            >
                                {isSubmitting ? 'Đang xử lý...' : 'Tạo lịch khám'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

            <div className="schedules-list-container">
                <h3>Danh sách lịch khám</h3>
                {schedules.length === 0 ? (
                    <p className="no-schedules">Bạn chưa có lịch khám nào.</p>
                ) : (
                    <table className="schedules-table">
                        <thead>
                            <tr>
                                <th>Ngày</th>
                                <th>Thời gian</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map(schedule => (
                                <tr key={schedule.id}>
                                    <td>{format(new Date(schedule.date), 'dd/MM/yyyy')}</td>
                                    <td>{schedule.startTime} - {schedule.endTime}</td>
                                    <td>
                                        <span className={getStatusClass(schedule.status)}>
                                            {getStatusText(schedule.status)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default DoctorSchedule;