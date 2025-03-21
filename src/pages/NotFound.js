import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>404 - Trang không tồn tại</h2>
            <p>Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
            <Link to="/" className="home-link">Quay lại trang chủ</Link>
        </div>
    );
};

export default NotFound;