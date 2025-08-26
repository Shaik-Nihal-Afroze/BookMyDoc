import React,{useState, useEffect} from 'react'
import { useUsersStore } from '../../store/useUsersStore.js'
import { useAuthStore } from '../../store/useAuthStore.js'
import { useParams ,useNavigate} from 'react-router-dom'
import AppointmentForm from '../AppointmentForm/appointmentForm'
import PatientAppointmentPage from '../PatientAppointmentPage/patientAppointmentPage'
import { FaArrowLeft } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import '../DoctorDetailsPage/doctorDetailsPage.css'
import Header from '../../components/Header/header.jsx'
import { useAppointmentStore } from '../../store/useAppointmentStore'

const DoctorAppointmentPage = ({onBack})=>{
  const {getDoctorAppointments,updateAppointmentStatus,appointments} = useAppointmentStore()
      const {authUser,checkAuth} = useAuthStore()
      const {doctorDetails} = useUsersStore()
      const [statusButtonClicked,setStatusButton] = useState(null)
      const [updatedAppointmentStatus,setAppointmentStatus] = useState(null)
      const [appointmentId,setAppointmentId] = useState(null)

      const navigate = useNavigate()

      useEffect(()=>{
        if(authUser?._id){
          getDoctorAppointments(authUser._id)
          checkAuth()
        }
          
          // updateAppointmentStatus(appointmentId,action)
          console.log(appointments)
          console.log(statusButtonClicked)
          console.log(updatedAppointmentStatus)
          
          
          
      },[authUser._id])

      
      const onChangeStatus = async (appointmentId,action)=>{
         await updateAppointmentStatus(appointmentId,action)
         setAppointmentStatus(action)
        console.log(appointmentId,action)
      }

      const onClickStatusButton = (appointmentId)=>{
        setAppointmentId((prevId)=>(prevId === appointmentId?null:appointmentId))
      }


      const onClickStatusChange = (action)=>{
        onChangeStatus(appointmentId,action)
        setAppointmentId(null)
        console.log("status clicked")
      }
      const statusBackgroundColor  = (status)=>{
        if (status ==="confirmed"){
          return 'confirm-status'
        }
        else{
          return 'cancel-status'
        }
      }
      // =  updatedAppointmentStatus==="confirmed" ? 'confirm-status' :"cancel-status"
  return (
    <div className='patient-appointment-bg-container'>
            <button onClick={onBack}>
            <FaArrowLeft size = {20} />
          </button>
          <ul className='patient-appointment-list'>
            {appointments.map((eachAppointment)=>(
              
               <li className='appointment-item' key = {eachAppointment._id}>
                
                <img src = {doctorDetails.image} className='doctor-appointment-picture' alt = {doctorDetails.fullName[0].toUpperCase()}/>
                    <div className='doctor-name-reason mid'>
                      
                        <span className='appointment-doctor-name'>{eachAppointment.patient.fullName}</span>
                        <span className='appointment-doctor-reason'>{eachAppointment.reason}</span>
                    </div>
                    <div className='doctor-name-reason'>
                        <span className={`appointment-doctor-status ${eachAppointment.status !=="pending"?statusBackgroundColor(eachAppointment.status):''}
                      }`}>{eachAppointment.status}</span>
                        <span className='appointment-doctor-time'>{eachAppointment.appointmentTime}</span>
                    </div>
                    <button className='status-button' onClick ={()=>onClickStatusButton(eachAppointment._id)}>
                      <BsThreeDotsVertical size = {20}/>
                    </button>
                    {eachAppointment._id === appointmentId ?<div className='status-value-button-container'>
                      <button  className = 
                      "status-value-button confirm" onClick = {()=>onClickStatusChange("confirmed")}>Confirm</button><button className = 
                      "status-value-button cancel" onClick = {()=>onClickStatusChange("canceled")}>Cancel</button></div>:''}
                </li>
            ))}
          </ul>
          
        </div>
  )
}


const DoctorPage = () => {


  const navigate = useNavigate()
  const { checkAuth, authUser } = useAuthStore()
  const { doctorDetails, getDoctorDetails } = useUsersStore()
  const {appointments} = useAppointmentStore()
  const  id  = authUser._id;
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showAppointments,setShowAppointment] = useState(false)
  // const handleBookingAppointment = () => {
  //   setShowBookingForm(true);
  //   console.log("Booking appointment for doctor ID:", id);
  // }
  const handleAppointmentsList = () => {
    setShowAppointment(true);
    //  setShowBookingForm(false);
    
    // console.log("Booking appointment for doctor ID:", id);
  }

  // const onClickHandleForm = () => {
  //   setShowBookingForm(!showBookingForm);
   
  //   console.log("Booking form closed");
  // }
let noOfPatient = 0;
let countValue = appointments.filter(eachAppointment=>eachAppointment.doctor === doctorDetails._id && eachAppointment.status === "confirmed"?noOfPatient=noOfPatient+1:noOfPatient)

useEffect(() => {
    getDoctorDetails(id);   
    checkAuth();
    console.log(showAppointments)
    console.log(noOfPatient)
    console.log(appointments)

    // console.log(showBookingForm)
  }, [getDoctorDetails, checkAuth, id]);


  const DoctorData = ()=>{
    return (doctorDetails  && !showAppointments && (
          <div  className = "doctor-details-bg-container">
            
            
            <div className='doctor-profile-container'>

              <img src={doctorDetails.image} alt="Doctor Profile" className="doctor-profile-picture" />
              <div className='doctor-profile-info'>
                <h1 className='doctor-name'> Dr.{doctorDetails.fullName}</h1> 
                <p className='doctor-rating'>4.8 <span><FaStar size = {13}/></span></p>
                <span className='doctor-specialization'>{doctorDetails.doctorInfo.specialization}</span>
                
              </div>
            </div>    
           
           <div className='doctor-numeric-main-container'>
            <div className='doctor-numeric-container'>
              <img src = "https://res.cloudinary.com/dze7v0evj/image/upload/v1754394396/patientLogo_vwredt.png" className='doctor-numeric-logo' alt="PL"/>
              <p className='doctor-numeric-text'>{doctorDetails.doctorInfo.ratings?.length}</p>
            </div>
            <div className='doctor-numeric-container'>
              <img src = "https://res.cloudinary.com/dze7v0evj/image/upload/v1754394435/experienceLogo_jgw1uy.png" className='doctor-numeric-logo' alt="PL"/>
              <p className='doctor-numeric-text'>{doctorDetails.doctorInfo.experience}+</p>
            </div>
            <div className='doctor-numeric-container'>
              <img src = "https://res.cloudinary.com/dze7v0evj/image/upload/v1754394487/ratingLogo_cjbnma.png" className='doctor-numeric-logo' alt="PL"/>
              {/* <p className='doctor-numeric-text'>{doctorDetails.doctorInfo.patientCount}</p> */}
              <p className='doctor-numeric-text'>{doctorDetails.doctorInfo.ratings.length ? doctorDetails.doctorInfo.ratings.reduce((acc, curr) => acc + curr.score, 0) / doctorDetails.doctorInfo.ratings.length : 0} <br/>Ratings</p>
              
            </div>
          </div>
            
            <p className='working-time'>Working Time<br/><br/>
            <span className='schedule-text'> Mon-Sun ({doctorDetails.doctorInfo.timeSlots.startTime} - {doctorDetails.doctorInfo.timeSlots.endTime})</span></p>
            <p className='working-time'>Bio<br/></p>
            
              <p className='schedule-text'>Dr. <span>{doctorDetails.fullName}</span> is a highly experienced neurologist with over 16 years of expertise in treating neurological disorders like epilepsy, stroke, and migraines. Dedicated to patient-centered care, Dr.<span>{doctorDetails.fullName} </span>combines deep clinical knowledge with the latest medical advancements to deliver personalized, effective treatment for long-term neurological health and improved well-being.</p>
            
            
           
            <p>Holiday: {doctorDetails.doctorInfo.unAvailableDay}</p>
            
          {authUser.role ==="patient" ? (
            <div>
            <button onClick = {handleBookingAppointment} className='book-appointment-button'>Book Appointment</button>
            <button onClick = {handleAppointmentsList} className='book-appointment-button view-button'>View Appointment</button>
            </div>
            ):<button onClick = {handleAppointmentsList} className='book-appointment-button view-button'>View Appointments</button>}
          
    
          </div>))
  }
  const Appointmentpages = ()=>{
    if (showAppointments ){
      
      return   <DoctorAppointmentPage onBack = {()=>setShowAppointment(false)} />
       
      

    }
    
    else{
      return(DoctorData())
      // (doctorDetails  && !showAppointments && (
      //     <div  className = "doctor-details-bg-container">
      //       <button className='back-arrow-button' onClick={onhandlenavigate}>
      //         <FaArrowLeft size = {20} />
      //       </button>
            
      //       <div className='doctor-profile-container'>

      //         <img src={doctorDetails.image} alt="Doctor Profile" className="doctor-profile-picture" />
      //         <div className='doctor-profile-info'>
      //           <h1 className='doctor-name'> Dr.{doctorDetails.fullName}</h1> 
      //           <p className='doctor-rating'>4.8 <span><FaStar size = {13}/></span></p>
      //           <span className='doctor-specialization'>{doctorDetails.doctorInfo.specialization}</span>
                
      //         </div>
      //       </div>    
           
      //      <div className='doctor-numeric-main-container'>
      //       <div className='doctor-numeric-container'>
      //         <img src = "https://res.cloudinary.com/dze7v0evj/image/upload/v1754394396/patientLogo_vwredt.png" className='doctor-numeric-logo' alt="PL"/>
      //         <p className='doctor-numeric-text'>{doctorDetails.doctorInfo.patientCount}</p>
      //       </div>
      //       <div className='doctor-numeric-container'>
      //         <img src = "https://res.cloudinary.com/dze7v0evj/image/upload/v1754394435/experienceLogo_jgw1uy.png" className='doctor-numeric-logo' alt="PL"/>
      //         <p className='doctor-numeric-text'>{doctorDetails.doctorInfo.experience}+</p>
      //       </div>
      //       <div className='doctor-numeric-container'>
      //         <img src = "https://res.cloudinary.com/dze7v0evj/image/upload/v1754394487/ratingLogo_cjbnma.png" className='doctor-numeric-logo' alt="PL"/>
      //         {/* <p className='doctor-numeric-text'>{doctorDetails.doctorInfo.patientCount}</p> */}
      //         <p className='doctor-numeric-text'>{doctorDetails.doctorInfo.ratings.length ? doctorDetails.doctorInfo.ratings.reduce((acc, curr) => acc + curr.score, 0) / doctorDetails.doctorInfo.ratings.length : 0} <br/>Ratings</p>
              
      //       </div>
      //     </div>
            
      //       <p className='working-time'>Working Time<br/><br/>
      //       <span className='schedule-text'> Mon-Sun ({doctorDetails.doctorInfo.timeSlots.startTime} - {doctorDetails.doctorInfo.timeSlots.endTime})</span></p>
      //       <p className='working-time'>Bio<br/></p>
            
      //         <p className='schedule-text'>Dr. <span>{doctorDetails.fullName}</span> is a highly experienced neurologist with over 16 years of expertise in treating neurological disorders like epilepsy, stroke, and migraines. Dedicated to patient-centered care, Dr.<span>{doctorDetails.fullName} </span>combines deep clinical knowledge with the latest medical advancements to deliver personalized, effective treatment for long-term neurological health and improved well-being.</p>
            
            
           
      //       <p>Holiday: {doctorDetails.doctorInfo.unAvailableDay}</p>
           
      //       <button onClick = {handleBookingAppointment} className='book-appointment-button'>Book Appointment</button>
      //       <button onClick = {handleAppointmentsList} className='book-appointment-button view-button'>View Appointment</button>
          
            
      //     </div>))
    }
  }
  return (
    <div className="doctor-details-page">
      <Header/>
      {Appointmentpages()}
    
    </div>
     )
     
  }
export default DoctorPage
