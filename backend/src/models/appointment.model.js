import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: "User",
        required: [true, 'Patient is required']
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Doctor is required']
    },
    reason:{
        type: String,
        required: [true, 'Reason for appointment is required'],
        trim: true,
        maxlength: 200
    },
    appointmentDate: {
        type: Date,
        required: [true, 'Appointment date is required']
    },
    appointmentTime: {
        type: String,
        required: [true, 'Appointment time is required']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'canceled'],
        default: 'pending'
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

export default Appointment