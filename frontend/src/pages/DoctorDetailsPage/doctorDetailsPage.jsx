import React,{useState, useEffect} from 'react'
import { useUsersStore } from '../../store/useUsersStore.js'
import { useAuthStore } from '../../store/useAuthStore.js'
import { useParams ,useNavigate} from 'react-router-dom'
import AppointmentForm from '../AppointmentForm/appointmentForm'
import PatientAppointmentPage from '../PatientAppointmentPage/patientAppointmentPage'
import { FaArrowLeft } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import './doctorDetailsPage.css'

const DoctorDetailsPage = () => {


  const navigate = useNavigate()
  const { checkAuth, authUser } = useAuthStore()
  const { doctorDetails, getDoctorDetails } = useUsersStore()
  const { id } = useParams();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showAppointments,setShowAppointment] = useState(false)
  const handleBookingAppointment = () => {
    setShowBookingForm(true);
    console.log("Booking appointment for doctor ID:", id);
  }
  const handleAppointmentsList = () => {
    setShowAppointment(true);
     setShowBookingForm(false);
    
    // console.log("Booking appointment for doctor ID:", id);
  }

  const onClickHandleForm = () => {
    setShowBookingForm(!showBookingForm);
   
    console.log("Booking form closed");
  }

  const onhandlenavigate = ()=>{
    navigate("/patient")
  }
useEffect(() => {
    getDoctorDetails(id);   
    checkAuth();
    // console.log(showAppointments)
    console.log(showBookingForm)
  }, [getDoctorDetails, checkAuth, id]);


  const DoctorData = ()=>{
    return (doctorDetails  && !showAppointments && (
          <div  className = "doctor-details-bg-container">
            <button className='back-arrow-button' onClick={onhandlenavigate}>
              <FaArrowLeft size = {20} />
            </button>
            
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
            
              <p className='schedule-text'>{doctorDetails.doctorInfo.bio}</p>
            
            
           
            <p className='working-time'>Holiday<br/>
               <span  className='schedule-text' >{doctorDetails.doctorInfo.unAvailableDay}</span></p>
            
          {authUser.role ==="patient" ? (
            <div className='appointment-button-container'>
            <button onClick = {handleBookingAppointment} className='book-appointment-button'>Book Appointment</button>
            <button onClick = {handleAppointmentsList} className='book-appointment-button view-button'>View Appointment</button>
            </div>
            ):<button onClick = {handleAppointmentsList} className='book-appointment-button view-button'>View Appointments</button>}
          
    
          </div>))
  }
  const Appointmentpages = ()=>{
    if (showAppointments && !showBookingForm){
      
      return   <PatientAppointmentPage  onBack = {()=>setShowAppointment(false)} />
       
      

    }
    else if(!showAppointments && showBookingForm){

      return <AppointmentForm onHandleCancel={onClickHandleForm} doctor = {doctorDetails._id}/>
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
      
      {Appointmentpages()}
    
    </div>
     )
     
  }
export default DoctorDetailsPage
