import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const AdminMedicalRecords = () => {
    const [records, setRecords] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedPatient, setSelectedPatient] = useState('');

    useEffect(() => {
        fetchPatients();
    }, []);

    useEffect(() => {
        if (selectedPatient) {
            fetchPatientRecords(selectedPatient);
        } else {
            setRecords([]);
        }
    }, [selectedPatient]);

    const fetchPatients = async () => {
        try {
            const res = await axios.get('/api/users/patients');
            setPatients(res.data);
            setLoading(false);
        } catch (error) {
            setError('Không thể tải danh sách bệnh nhân');
            console.error(error);
            setLoading(false);
        }
    };

    const fetchPatientRecords = async (patientId) => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/medical-records/patient/${patientId}`);
            setRecords(res.data.data);
            setLoading(false);
        } catch (error) {
            setError('Không thể tải hồ sơ bệnh án');
            console.error(error);
            setLoading(false);
        }
    };

    const handleCreateRecord = async () => {
        if (!selectedPatient) {
            setError('Vui lòng chọn bệnh nhân trước khi tạo hồ sơ');
            return;
        }

        try {
            const patient = patients.find(p => p.id === parseInt(selectedPatient));

            const response = await axios.post('/api/medical-records', {
                patientId: selectedPatient,
                title: `Hồ sơ bệnh án - ${patient.fullName}`,
                description: `Hồ sơ bệnh án của bệnh nhân ${patient.fullName}`
            });

            fetchPatientRecords(selectedPatient);
        } catch (error) {
            setError('Không thể tạo hồ sơ bệnh án');
            console.error(error);
        }
    };

    if (loading && patients.length === 0) {
        return <div className="loading">Đang tải dữ liệu...</div>;
    }

    return (
        <div className="admin-medical-records">
            <h2>Quản lý hồ sơ bệnh án</h2>
            {error && <div className="error-message">{error}</div>}

            <div className="patient-selector">
                <label htmlFor="patient">Chọn bệnh nhân:</label>
                <select
                    id="patient"
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                >
                    <option value="">-- Chọn bệnh nhân --</option>
                    {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>
                            {patient.fullName} - {patient.email}
                        </option>
                    ))}
                </select>

                {selectedPatient && (
                    <button
                        className="create-record-btn"
                        onClick={handleCreateRecord}
                    >
                        Tạo hồ sơ mới
                    </button>
                )}
            </div>

            {selectedPatient && (
                <>
                    {loading ? (
                        <div className="loading">Đang tải hồ sơ bệnh án...</div>
                    ) : (
                        <>
                            {records.length === 0 ? (
                                <p className="no-records">Bệnh nhân này chưa có hồ sơ bệnh án nào.</p>
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
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminMedicalRecords;