import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
        password: Yup.string().required('Mật khẩu là bắt buộc')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await login(values.email, values.password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Đăng nhập thất bại');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Đăng nhập</h2>
            {error && <div className="error-message">{error}</div>}

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
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

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
                        </button>
                    </Form>
                )}
            </Formik>

            <p>
                Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
            </p>
        </div>
    );
};

export default Login;