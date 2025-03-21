import axios from 'axios';

// Lấy danh sách cuộc hẹn của bệnh nhân
export const getMyAppointments = async () => {
    try {
        const response = await axios.get('/api/appointments/my-appointments');
        return response.data;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
};

// Tạo cuộc hẹn mới
export const createAppointment = async (appointmentData) => {
    try {
        const response = await axios.post('/api/appointments', appointmentData);
        return response.data;
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw error;
    }
};

// Hủy cuộc hẹn
export const cancelAppointment = async (appointmentId) => {
    try {
        const response = await axios.put(`/api/appointments/${appointmentId}/cancel`);
        return response.data;
    } catch (error) {
        console.error('Error cancelling appointment:', error);
        throw error;
    }
}; 