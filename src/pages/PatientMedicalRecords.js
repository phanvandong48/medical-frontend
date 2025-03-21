import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { format } from 'date-fns';

const PatientMedicalRecords = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { currentUser } = useContext(AuthContext);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newRecord, setNewRecord] = useState({
        title: '',
        description: ''
    });

    useEffect(() => {
        fetchMedicalRecords();
    }, []);

    const fetchMedicalRecords = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/medical-records/patient');
            setRecords(res.data.data);
            setLoading(false);
        } catch (error) {
            setError('Không thể tải hồ sơ bệnh án');
            console.error(error);
            setLoading(false);
        }
    };

    const handleCreateRecord = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/medical-records', newRecord);
            setNewRecord({ title: '', description: '' });
            setShowCreateForm(false);
            fetchMedicalRecords();
        } catch (error) {
            setError('Không thể tạo hồ sơ bệnh án');
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecord(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) {
        return <div className="loading">Đang tải dữ liệu...</div>;
    }

    return (
        <div className="medical-records-container">
            <h2>Hồ sơ bệnh án của tôi</h2>
            {error && <div className="error-message">{error}</div>}

            <div className="records-header">
                <button
                    className="create-record-btn"
                    onClick={() => setShowCreateForm(!showCreateForm)}
                >
                    {showCreateForm ? 'Hủy' : 'Tạo hồ sơ mới'}
                </button>
            </div>

            {showCreateForm && (
                <div className="create-record-form">
                    <h3>Tạo hồ sơ bệnh án mới</h3>
                    <form onSubmit={handleCreateRecord}>
                        <div className="form-group">
                            <label htmlFor="title">Tiêu đề</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={newRecord.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Mô tả</label>
                            <textarea
                                id="description"
                                name="description"
                                value={newRecord.description}
                                onChange={handleInputChange}
                                rows="4"
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn">Tạo hồ sơ</button>
                    </form>
                </div>
            )}

            {records.length === 0 ? (
                <p className="no-records">Bạn chưa có hồ sơ bệnh án nào.</p>
            ) : (
                <div className="records-list">
                    {records.map(record => (
                        <div key={record.id} className="record-card">
                            <h3>{record.title}</h3>
                            <p className="record-description">{record.description}</p>
                            <p className="record-date">
                                Cập nhật: {format(new Date(record.updatedAt), 'dd/MM/yyyy')}
                            </p>
                            <Link to={`/medical-records/${record.id}`} className="view-details-btn">
                                Xem chi tiết
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PatientMedicalRecords;