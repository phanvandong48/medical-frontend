import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { format } from 'date-fns';

const MedicalRecordDetails = () => {
    const { recordId } = useParams();
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [record, setRecord] = useState(null);
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);
    const [editedRecord, setEditedRecord] = useState({
        title: '',
        description: ''
    });

    useEffect(() => {
        fetchRecordDetails();
    }, [recordId]);

    const fetchRecordDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/medical-records/${recordId}`);
            setRecord(res.data.data.record);
            setDetails(res.data.data.details);
            setEditedRecord({
                title: res.data.data.record.title,
                description: res.data.data.record.description || ''
            });
            setLoading(false);
        } catch (error) {
            setError('Không thể tải chi tiết hồ sơ bệnh án');
            console.error(error);
            setLoading(false);
        }
    };

    const handleUpdateRecord = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/api/medical-records/${recordId}`, editedRecord);
            setShowEditForm(false);
            fetchRecordDetails();
        } catch (error) {
            setError('Không thể cập nhật hồ sơ bệnh án');
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedRecord(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDownloadFile = (file) => {
        window.open(`${axios.defaults.baseURL}/${file.filePath.replace(/\\/g, '/')}`, '_blank');
    };

    const handleDeleteFile = async (fileId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa file này?')) {
            try {
                await axios.delete(`/api/medical-records/files/${fileId}`);
                // Refresh the record details to update the UI
                fetchRecordDetails();
            } catch (error) {
                setError('Không thể xóa file. Vui lòng thử lại.');
                console.error(error);
            }
        }
    };

    if (loading) {
        return <div className="loading">Đang tải dữ liệu...</div>;
    }

    if (!record) {
        return <div className="error-message">Không tìm thấy hồ sơ bệnh án</div>;
    }

    const isDoctor = currentUser.role === 'doctor';
    const isAdmin = currentUser.role === 'admin';
    const isPatientRecord = currentUser.id === record.patientId;

    return (
        <div className="medical-record-details">
            <div className="back-button">
                <button onClick={() => navigate('/medical-records')}>
                    &larr; Quay lại
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="record-header">
                <div className="record-title">
                    <h2>{record.title}</h2>
                    <p className="record-date">
                        Cập nhật: {format(new Date(record.updatedAt), 'dd/MM/yyyy')}
                    </p>
                </div>

                {(isPatientRecord || isAdmin) && (
                    <button
                        className="edit-record-btn"
                        onClick={() => setShowEditForm(!showEditForm)}
                    >
                        {showEditForm ? 'Hủy' : 'Chỉnh sửa'}
                    </button>
                )}
            </div>

            {showEditForm ? (
                <div className="edit-record-form">
                    <form onSubmit={handleUpdateRecord}>
                        <div className="form-group">
                            <label htmlFor="title">Tiêu đề</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={editedRecord.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Mô tả</label>
                            <textarea
                                id="description"
                                name="description"
                                value={editedRecord.description}
                                onChange={handleInputChange}
                                rows="4"
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn">Cập nhật</button>
                    </form>
                </div>
            ) : (
                <div className="record-description">
                    <p>{record.description}</p>
                </div>
            )}

            <div className="patient-info">
                <h3>Thông tin bệnh nhân</h3>
                <p><strong>Họ tên:</strong> {record.patient.fullName}</p>
                <p><strong>Email:</strong> {record.patient.email}</p>
                <p><strong>Số điện thoại:</strong> {record.patient.phoneNumber}</p>
            </div>

            <div className="record-details-section">
                <h3>Chi tiết bệnh án</h3>

                {details.length === 0 ? (
                    <p className="no-details">Chưa có chi tiết bệnh án nào.</p>
                ) : (
                    <div className="details-list">
                        {details.map(detail => (
                            <div key={detail.id} className="detail-card">
                                <div className="detail-header">
                                    <h4>Lần khám ngày {format(new Date(detail.recordDate), 'dd/MM/yyyy')}</h4>
                                    <span className="doctor-name">Bác sĩ: {detail.Doctor.User.fullName}</span>
                                </div>

                                <div className="detail-content">
                                    <div className="detail-section">
                                        <h5>Chẩn đoán</h5>
                                        <p>{detail.diagnosis}</p>
                                    </div>

                                    {detail.prescription && (
                                        <div className="detail-section">
                                            <h5>Đơn thuốc</h5>
                                            <p>{detail.prescription}</p>
                                        </div>
                                    )}

                                    {detail.notes && (
                                        <div className="detail-section">
                                            <h5>Ghi chú</h5>
                                            <p>{detail.notes}</p>
                                        </div>
                                    )}

                                    {detail.MedicalFiles && detail.MedicalFiles.length > 0 && (
                                        <div className="detail-section">
                                            <h5>Tài liệu đính kèm</h5>
                                            <div className="files-list">
                                                {detail.MedicalFiles.map(file => (
                                                    <div key={file.id} className="file-item">
                                                        <div className="file-info">
                                                            <span className="file-icon">
                                                                {file.fileType === 'image' ? '🖼️' :
                                                                    file.fileType === 'pdf' ? '📄' : '📎'}
                                                            </span>
                                                            <span className="file-name">{file.fileName}</span>
                                                            <span className="file-size">
                                                                {(file.fileSize / 1024).toFixed(2)} KB
                                                            </span>
                                                        </div>
                                                        <div className="file-actions">
                                                            <button
                                                                className="download-btn"
                                                                onClick={() => handleDownloadFile(file)}
                                                            >
                                                                Tải xuống
                                                            </button>

                                                            {(isDoctor || isAdmin) && (
                                                                <button
                                                                    className="delete-btn"
                                                                    onClick={() => handleDeleteFile(file.id)}
                                                                >
                                                                    Xóa
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {(isDoctor || isAdmin) && (
                    <div className="add-detail-section">
                        <button
                            className="add-detail-btn"
                            onClick={() => navigate(`/medical-records/${recordId}/add-detail`)}
                        >
                            Thêm chi tiết mới
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MedicalRecordDetails;