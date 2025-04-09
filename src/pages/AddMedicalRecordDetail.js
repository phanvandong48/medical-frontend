import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';


const AddMedicalRecordDetail = () => {
    const { recordId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const appointmentId = location.state?.appointmentId;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [record, setRecord] = useState(null);
    const [formData, setFormData] = useState({
        diagnosis: '',
        prescription: '',
        notes: '',
        recordDate: format(new Date(), 'yyyy-MM-dd'),
        appointmentId: appointmentId || ''
    });
    const [appointments, setAppointments] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        fetchRecord();
        fetchAppointments();
    }, [recordId]);

    const fetchRecord = async () => {
        try {
            const res = await axios.get(`/api/medical-records/${recordId}`);
            setRecord(res.data.data.record);
        } catch (error) {
            setError('Không thể tải thông tin hồ sơ bệnh án');
            console.error(error);
        }
    };

    const fetchAppointments = async () => {
        try {
            // Lấy danh sách các cuộc hẹn đã hoàn thành của bệnh nhân
            const res = await axios.get(`/api/appointments/doctor-appointments`);
            const completedAppointments = res.data.filter(
                app => app.status === 'completed' && app.patient.id === record?.patientId
            );
            setAppointments(completedAppointments);
        } catch (error) {
            console.error('Không thể tải danh sách cuộc hẹn:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');

            // Tạo một bản sao của formData để gửi đi
            const dataToSend = { ...formData };

            // Xử lý appointmentId trước khi gửi
            if (!dataToSend.appointmentId || dataToSend.appointmentId === '') {
                delete dataToSend.appointmentId; // Xóa trường này nếu rỗng
            }

            // Gửi thông tin chi tiết bệnh án
            const detailRes = await axios.post(`/api/medical-records/${recordId}/details`, dataToSend);
            const newDetailId = detailRes.data.data.id;

            // Nếu có file được chọn, tải lên file
            if (selectedFile) {
                try {
                    const formFileData = new FormData();
                    formFileData.append('file', selectedFile);

                    await axios.post(
                        `/api/medical-records/details/${newDetailId}/files`,
                        formFileData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            onUploadProgress: (progressEvent) => {
                                const percentCompleted = Math.round(
                                    (progressEvent.loaded * 100) / progressEvent.total
                                );
                                setUploadProgress(percentCompleted);
                            }
                        }
                    );
                } catch (fileError) {
                    // Log lỗi nhưng vẫn tiếp tục
                    console.error("Lỗi khi tải file:", fileError);
                    setError("Chi tiết bệnh án đã được tạo nhưng không thể tải lên file đính kèm");
                    // Vẫn chuyển hướng sau khi lưu chi tiết bệnh án
                    setTimeout(() => navigate(`/medical-records/${recordId}`), 3000);
                    return;
                }
            }

            navigate(`/medical-records/${recordId}`);

        } catch (error) {
            setError(error.response?.data?.message || 'Không thể thêm chi tiết bệnh án');
            console.error("Lỗi chi tiết:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!record) {
        return <div className="loading">Đang tải dữ liệu...</div>;
    }

    return (
        <div className="add-record-detail-container">
            <div className="back-button">
                <button onClick={() => navigate(`/medical-records/${recordId}`)}>
                    &larr; Quay lại
                </button>
            </div>

            <h2>Thêm chi tiết bệnh án</h2>
            <h3>{record.title}</h3>
            <p className="patient-name">Bệnh nhân: {record.patient.fullName}</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="appointmentId">Cuộc hẹn liên quan (nếu có)</label>
                    <select
                        id="appointmentId"
                        name="appointmentId"
                        value={formData.appointmentId}
                        onChange={handleInputChange}
                    >
                        <option value="">-- Chọn cuộc hẹn --</option>
                        {appointments.map(appointment => (
                            <option key={appointment.id} value={appointment.id}>
                                {format(new Date(appointment.Schedule.date), 'dd/MM/yyyy')} - {appointment.reason.substring(0, 50)}...
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="recordDate">Ngày khám</label>
                    <input
                        type="date"
                        id="recordDate"
                        name="recordDate"
                        value={formData.recordDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="diagnosis">Chẩn đoán</label>
                    <textarea
                        id="diagnosis"
                        name="diagnosis"
                        value={formData.diagnosis}
                        onChange={handleInputChange}
                        rows="4"
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="prescription">Đơn thuốc</label>
                    <textarea
                        id="prescription"
                        name="prescription"
                        value={formData.prescription}
                        onChange={handleInputChange}
                        rows="4"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Ghi chú</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows="4"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="file">Tài liệu đính kèm</label>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                    />
                    <p className="file-hint">Hỗ trợ: Hình ảnh (JPEG, PNG), PDF, Word (DOC, DOCX)</p>
                </div>

                {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="upload-progress">
                        <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
                        <span>{uploadProgress}%</span>
                    </div>
                )}

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                >
                    {loading ? 'Đang xử lý...' : 'Lưu chi tiết bệnh án'}
                </button>
            </form>
        </div>
    );
};

export default AddMedicalRecordDetail;