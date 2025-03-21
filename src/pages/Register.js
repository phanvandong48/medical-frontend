import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const initialValues = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        role: 'patient',
        specialization: '',
        experience: '',
        description: ''
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Họ tên là bắt buộc'),
        email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
        password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
            .required('Xác nhận mật khẩu là bắt buộc'),
        phoneNumber: Yup.string().required('Số điện thoại là bắt buộc'),
        role: Yup.string().required('Vai trò là bắt buộc'),
        specialization: Yup.string().when('role', {
            is: 'doctor',
            then: () => Yup.string().required('Chuyên khoa là bắt buộc'),
            otherwise: () => Yup.string()
        }),
        experience: Yup.number().when('role', {
            is: 'doctor',
            then: () => Yup.number().required('Số năm kinh nghiệm là bắt buộc'),
            otherwise: () => Yup.number()
        })
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const { confirmPassword, ...userData } = values;
            await register(userData);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Đăng ký thất bại');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Đăng ký tài khoản</h2>
            {error && <div className="error-message">{error}</div>}

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="fullName">Họ tên</label>
                            <Field type="text" name="fullName" id="fullName" />
                            <ErrorMessage name="fullName" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" id="email" />
                            <ErrorMessage name="email" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Mật khẩu</label>
                            <Field type="password" name="password" id="password" />
                            <ErrorMessage name="password" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                            <Field type="password" name="confirmPassword" id="confirmPassword" />                            <ErrorMessage name="confirmPassword" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNumber">Số điện thoại</label>
                            <Field type="text" name="phoneNumber" id="phoneNumber" />
                            <ErrorMessage name="phoneNumber" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">Vai trò</label>
                            <Field as="select" name="role" id="role">
                                <option value="patient">Bệnh nhân</option>
                                <option value="doctor">Bác sĩ</option>
                            </Field>
                        </div>

                        {values.role === 'doctor' && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="specialization">Chuyên khoa</label>
                                    <Field type="text" name="specialization" id="specialization" />
                                    <ErrorMessage name="specialization" component="div" className="error" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="experience">Số năm kinh nghiệm</label>
                                    <Field type="number" name="experience" id="experience" />
                                    <ErrorMessage name="experience" component="div" className="error" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Mô tả</label>
                                    <Field as="textarea" name="description" id="description" rows="4" />
                                </div>
                            </>
                        )}

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
                        </button>
                    </Form>
                )}
            </Formik>

            <p>
                Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </p>
        </div>
    );
};

export default Register;