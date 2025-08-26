import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";
export const createAppointment = async(req,res)=>{
    try {
        const { patient, doctor, appointmentDate, appointmentTime, reason } = req.body;

        if (!appointmentDate || !appointmentTime || !reason) {
            return res.status(400).json({ message: "All fields are required" });
        }
    
        // Check if the doctor is available at the requested time
        const Doctor = await User.findById(doctor);
        if (!Doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        
    
        // Create the appointment
        const newAppointment = new Appointment({
        patient,
        doctor,
        appointmentDate,
        appointmentTime,
        reason,
        });
    
        await newAppointment.save();
        
        res.status(201).json({ message: "Appointment created successfully", appointment: {
            _id: newAppointment._id,
            patient: newAppointment.patient,
            doctor: newAppointment.doctor,
            appointmentDate: newAppointment.appointmentDate,
            appointmentTime: newAppointment.appointmentTime,
            reason: newAppointment.reason,
        }});
    } catch (error) {
        console.log("Error in createAppointment controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateAppointmentStatus =async(req,res)=>{
    try{
        const {appointmentId} = req.params
        const {status} = req.body
       
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment){
            return res.status(404).json({message:"Appointment not found"})
        }
         if (!status){
            return res.status(400).json({message:"Action is required"})
        }
        appointment.status = status
        await appointment.save()
        res.status(200).json(appointment)
    }catch(error){
    console.log("Error in updateAppointmentStatus controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({doctor: req.user._id})
            .populate("patient", "fullName email")
            .populate("doctor", "fullName email");
        res.status(200).json(appointments);
    } catch (error) {
        console.log("Error in getAllAppointments controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getPatientAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({patient: req.user._id})
            .populate("patient", "fullName email")
            .populate("doctor", "fullName email");
        res.status(200).json(appointments);
    } catch (error) {
        console.log("Error in getPatientAppointments controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};