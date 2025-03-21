import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <h2>Quản lý hệ thống</h2>
            <div className="admin-menu">
                <div className="admin-card">
                    <h3>Quản lý hồ sơ bệnh nhân</h3>
                    <p>Xem và quản lý hồ sơ bệnh án của các bệnh nhân trong hệ thống</p>
                    <Link to="/admin/medical-records" className="btn btn-primary">
                        Quản lý hồ sơ bệnh nhân
                    </Link>
                </div>
                {/* Thêm các chức năng quản lý khác tại đây nếu cần */}
            </div>
        </div>
    );
};

export default AdminDashboard; 