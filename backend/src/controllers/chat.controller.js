// backend/src/controllers/chat.controller.js
import Message from '../models/message.model.js';
import Appointment from '../models/appointment.model.js';

export const getMessages = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appt = await Appointment.findById(appointmentId);
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });

    const uid = req.user._id.toString();
    if (appt.patient.toString() !== uid && appt.doctor.toString() !== uid) {
      return res.status(403).json({ message: 'Not authorized to view messages' });
    }

    const messages = await Message.find({ appointment: appointmentId })
      .populate('sender', 'fullName image role')
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error('getMessages error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
