import React ,{useEffect, useState} from 'react'
import {useAppointmentStore} from '../../store/useAppointmentStore.js'
import "./appointmentForm.css";
import { useAuthStore } from '../../store/useAuthStore.js';
import { useUsersStore } from '../../store/useUsersStore.js';
import { useParams } from 'react-router-dom';
const AppointmentForm = ({onHandleCancel}) => {
    const {authUser, checkAuth} = useAuthStore()
    
    
    const {doctorDetails,getDoctorDetails} = useUsersStore() 
    const {createAppointment} = useAppointmentStore()
    // const [date, setDate] = useState("");
    // const [time, setTime] = useState("");
    const [appointmentData, setAppointmentData] = useState({
        patient: authUser._id,
        doctor: doctorDetails._id,
        appointmentDate: "",
        appointmentTime: "",
        reason: ""
    })

    useEffect(() => {
      // getDoctorDetails()
      checkAuth()
      console.log({authUser: authUser, doctorDetails: doctorDetails});
      
    },[getDoctorDetails, checkAuth]);

    const handleSubmit = async(event) => {
        event.preventDefault();   
        console.log("Appointment Data:", appointmentData);
        await createAppointment(appointmentData);
        // Handle form submission logic here
        setAppointmentData({
        
            appointmentDate: "",
            appointmentTime: "",
            reason: ""
        });
        onHandleCancel()
        console.log("Appointment booked successfully!");    

    };
  return (
    <div className="appointment-form">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="reason">Reason</label>
          <input type="text" id="reason" value={appointmentData.reason} onChange={(e) => setAppointmentData({...appointmentData, reason: e.target.value})} required />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentDate">Date</label>
          <input type="date" id="appointmentDate" onChange={(e) => setAppointmentData({...appointmentData, appointmentDate: e.target.value})} required />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentTime">Time</label>
          <input type="time" id="appointmentTime" onChange={(e) => setAppointmentData({...appointmentData, appointmentTime: e.target.value})} required />
        </div>
        <button type="submit">Book Appointment</button>
        <button className="cancel-button2" onClick={onHandleCancel} >Cancel</button>
      </form>
    </div>
  )
}

export default AppointmentForm
