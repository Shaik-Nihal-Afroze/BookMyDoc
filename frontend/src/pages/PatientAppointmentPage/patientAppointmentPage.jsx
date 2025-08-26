import React ,{useEffect} from 'react'
import { useAppointmentStore } from '../../store/useAppointmentStore.js'
import {useUsersStore} from "../../store/useUsersStore.js"
import "./patientAppointmentPage.css"
import { FaArrowLeft } from 'react-icons/fa'
import { useAuthStore } from '../../store/useAuthStore.js'
import { useState } from 'react'
import { toast } from 'react-toastify'
const PatientAppointmentPage = ({onBack}) => {
    const {getPatientAppointments,appointments} = useAppointmentStore()
    const {authUser,checkAuth} = useAuthStore()
    const {doctorDetails,updateDoctorRating} = useUsersStore()
    const [score,setScore] = useState(0)
    const [doctor,setDoctorId] = useState(null)
    useEffect(()=>{
        getPatientAppointments()
        console.log(appointments)
        checkAuth()
        if(score && doctor ){
          updateDoctorRating(doctor,authUser._id,score)
        }
        // console.log(doctor,authUser._id,score)
        
    },[getPatientAppointments,checkAuth])

    // const onChangeStatus = async (appointmentId,score)=>{
    //      await updateDoctorRating(appointmentId,score)
    //      setAppointmentStatus(score)
    //     console.log(appointmentId,score)
    //   }

      // const onClickStatusButton = (appointmentId)=>{
      //   setDoctorId((prevId)=>(prevId === appointmentId?null:appointmentId))
      // }

    const onScoreChange = (value) =>{
      setScore(value)
    }

    const onSubmitRating = async(e)=>{
      e.preventDefault()
      try {
        const updatingRating = await updateDoctorRating(doctor,authUser._id,score)
        console.log(updatingRating)
        toast.success("Review Submitted Successfully")
      } catch (error) {
        console.log("Error submitting review",error)
      }

    }

    const statusBackgroundColor  = (status)=>{
        if (status ==="confirmed"){
          return 'confirm-status'
        }
        else{
          return 'cancel-status'
        }
    }

  return (
    <div className='patient-appointment-bg-container'>
        <button onClick={onBack}>
        <FaArrowLeft size = {20} />
      </button>
      <ul className='patient-appointment-list' >
        {appointments.map((eachAppointment)=>(

           <li className='appointment-item' key = {eachAppointment._id} onClick={()=>setDoctorId(eachAppointment.doctor._id)}>
            <img src = {authUser.image} className='doctor-appointment-picture' alt = {doctorDetails.fullName[0].toUpperCase()}/>
                <div className='doctor-name-reason mid'>
                  
                    <span className='appointment-doctor-name'>{eachAppointment.doctor?.fullName}</span>
                    <span className='appointment-doctor-reason'>{eachAppointment.reason}</span>
                </div>
                <div className='doctor-name-reason mid'>
                  {eachAppointment.status === "confirmed"?
                  <form onSubmit = {onSubmitRating} className='rating-form'>
                    <select value={score}  onChange={(e) => onScoreChange(Number(e.target.value))}>
                      <option value={0} className='select-container' key = {eachAppointment._id}>Select</option>
                      {[1, 2, 3, 4, 5].map(star => (
                        <option key={star} value={star} className='select-container'>{star}</option>
                      ))}
                    </select>
                    <button type ="submit" id='rating-submit'>Submit</button>
                  </form>
                    :''}
                </div>
                 <div className='doctor-name-reason'>
                        <span className={`appointment-doctor-status ${eachAppointment.status !=="pending"?statusBackgroundColor(eachAppointment.status):''}
                      }`}>{eachAppointment.status}</span>
                        <span className='appointment-doctor-time'>{eachAppointment.appointmentTime}</span>
                    </div>
            </li>
        ))}
      </ul>
      
    </div>
  )
}

export default PatientAppointmentPage
