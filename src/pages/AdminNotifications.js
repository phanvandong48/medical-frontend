import React, { useState } from 'react';
import axios from 'axios';

const AdminNotifications = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSendReminders = async () => {
        try {
            setLoading(true);
            setMessage('');
            setError('');

            const response = await axios.post('/api/reminders/send-reminders');

            setMessage(response.data.message);
        } catch (error) {
            setError(error.response?.data?.message || 'Lỗi khi gửi nhắc nhở');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendCustomNotification = async (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const content = e.target.content.value;
        const notificationType = e.target.notificationType.value;

        if (!title || !content) {
            setError('Vui lòng nhập đầy đủ tiêu đề và nội dung');
            return;
        }

        try {
            setLoading(true);
            setMessage('');
            setError('');

            // Endpoint này cần được tạo thêm
            const response = await axios.post('/api/notifications/send-custom', {
                title,
                content,
                type: notificationType
            });

            setMessage(response.data.message);
            e.target.reset();
        } catch (error) {
            setError(error.response?.data?.message || 'Lỗi khi gửi thông báo');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-notifications">
            <h2>Quản lý thông báo</h2>

            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <div className="card">
                <h3>Gửi nhắc nhở lịch hẹn</h3>
                <p>Gửi email và SMS nhắc nhở cho các lịch hẹn vào ngày mai.</p>
                <button
                    onClick={handleSendReminders}
                    disabled={loading}
                    className="primary-btn"
                >
                    {loading ? 'Đang gửi...' : 'Gửi nhắc nhở'}
                </button>
            </div>

            <div className="card">
                <h3>Gửi thông báo tùy chỉnh</h3>
                <form onSubmit={handleSendCustomNotification}>
                    <div className="form-group">
                        <label htmlFor="notificationType">Loại thông báo</label>
                        <select id="notificationType" name="notificationType" required>
                            <option value="all">Tất cả người dùng</option>
                            <option value="patients">Chỉ bệnh nhân</option>
                            <option value="doctors">Chỉ bác sĩ</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">Tiêu đề</label>
                        <input type="text" id="title" name="title" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Nội dung</label>
                        <textarea id="content" name="content" rows="5" required></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="primary-btn"
                    >
                        {loading ? 'Đang gửi...' : 'Gửi thông báo'}
                    </button>
                </form>
            </div>

            <div className="card">
                <h3>Lịch sử thông báo</h3>
                <p>Tính năng này sẽ được phát triển trong phiên bản sau.</p>
            </div>
        </div>
    );
};

export default AdminNotifications;