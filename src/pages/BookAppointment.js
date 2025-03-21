import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { format } from 'date-fns';

const BookAppointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/doctors');
            setDoctors(res.data);
            setLoading(false);
        } catch (error) {
            setError('Không thể tải danh sách bác sĩ');
            console.error(error);
            setLoading(false);
        }
    };

    const fetchSchedules = async (doctorId) => {
        if (!doctorId) {
            setSchedules([]);
            return;
        }

        try {
            setLoading(true);
            const res = await axios.get(`/api/doctors/${doctorId}/schedules`);
            setSchedules(res.data);
            setLoading(false);
        } catch (error) {
            setError('Không thể tải lịch khám của bác sĩ');
            console.error(error);
            setLoading(false);
        }
    };

    const initialValues = {
        doctorId: '',
        scheduleId: '',
        reason: ''
    };

    const validationSchema = Yup.object({
        doctorId: Yup.string().required('Vui lòng chọn bác sĩ'),
        scheduleId: Yup.string().required('Vui lòng chọn lịch khám'),
        reason: Yup.string().required('Vui lòng nhập lý do khám')
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            await axios.post('/api/appointments', {
                scheduleId: values.scheduleId,
                reason: values.reason
            });

            resetForm();
            alert('Đặt lịch khám thành công! Vui lòng kiểm tra email và tin nhắn để xem thông tin chi tiết.');
            navigate('/my-appointments');
        } catch (error) {
            setError(error.response?.data?.message || 'Đặt lịch thất bại. Vui lòng thử lại.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading && doctors.length === 0) {
        return <div className="loading">Đang tải dữ liệu...</div>;
    }

    return (
        <div className="book-appointment">
            <h2>Đặt lịch khám bệnh</h2>
            {error && <div className="error-message">{error}</div>}

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="doctorId">Chọn bác sĩ</label>
                            <Field
                                as="select"
                                id="doctorId"
                                name="doctorId"
                                onChange={(e) => {
                                    const doctorId = e.target.value;
                                    setFieldValue('doctorId', doctorId);
                                    setFieldValue('scheduleId', '');
                                    fetchSchedules(doctorId);
                                }}
                            >
                                <option value="">-- Chọn bác sĩ --</option>
                                {doctors.map(doctor => (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.User.fullName} - {doctor.specialization}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="doctorId" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="scheduleId">Chọn lịch khám</label>
                            <Field
                                as="select"
                                id="scheduleId"
                                name="scheduleId"
                                disabled={!values.doctorId || loading}
                            >
                                <option value="">-- Chọn lịch khám --</option>
                                {schedules.map(schedule => (
                                    <option key={schedule.id} value={schedule.id}>
                                        {format(new Date(schedule.date), 'dd/MM/yyyy')} {schedule.startTime} - {schedule.endTime}
                                    </option>
                                ))}
                            </Field>
                            {values.doctorId && schedules.length === 0 && !loading && (
                                <p className="no-schedules">Không có lịch khám khả dụng cho bác sĩ này</p>
                            )}
                            <ErrorMessage name="scheduleId" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="reason">Lý do khám</label>
                            <Field as="textarea" id="reason" name="reason" rows="4" />
                            <ErrorMessage name="reason" component="div" className="error" />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || loading}
                            className="submit-btn"
                        >
                            {isSubmitting ? 'Đang xử lý...' : 'Đặt lịch'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BookAppointment;