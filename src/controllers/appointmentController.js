// Lấy danh sách cuộc hẹn của bệnh nhân
exports.getMyAppointments = async (req, res) => {
    try {
        const patientId = req.user.id;

        const appointments = await Appointment.findAll({
            where: { patientId },
            include: [
                {
                    model: Schedule,
                    include: [{
                        model: Doctor,
                        include: [{
                            model: User,
                            attributes: ['fullName', 'email', 'phoneNumber']
                        }]
                    }]
                },
                {
                    model: DoctorRating,
                    attributes: ['id', 'rating', 'comment']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}; 