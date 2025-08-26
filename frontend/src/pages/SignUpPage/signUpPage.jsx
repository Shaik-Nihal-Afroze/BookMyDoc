import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';
import './signUpPage.css';



const SignupPage = () => {
  
  const [formData,setFormData] = useState({
    fullName:'',
    email:'',
    password:'',
    role:'patient',
    gender:'male',
    phoneNumber:'',
    patientInfo:{
      bloodGroup:'',
      age:0
    },
    doctorInfo:{
      specialization:'',
      bio:'',
      experience:0,
      unAvailableDay:'Sunday',
      timeSlots:{startTime:"09:00",
      endTime:"18:00"}
    },
    image:""
    
    

  })

  const {signup} = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim())
      return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (!formData.phoneNumber.trim() || formData.phoneNumber.length !== 10)
      return toast.error("Phone Number must be 10 digits");
    if (!formData.gender) return toast.error("Gender is required");

    if (formData.role === "patient") {
      if (!formData.patientInfo.bloodGroup)
        return toast.error("Blood group is required");
      if (!formData.patientInfo.age)
        return toast.error("Age is required");
    }

    if (formData.role === "doctor") {
      if (!formData.doctorInfo.specialization)
        return toast.error("Specialization is required");
      if (!formData.doctorInfo.bio) return toast.error("Bio is required");
      if (!formData.doctorInfo.experience)
        return toast.error("Experience is required");
      if (!formData.doctorInfo.unAvailableDay)
        return toast.error("Unavailable day is required");
      if (!formData.doctorInfo.timeSlots.startTime ||
          !formData.doctorInfo.timeSlots.endTime)
        return toast.error("Time slots are required");
    }

    return true;
  };

  const bloodGroupArray = [{id:'A+'}, {id:'A-'}, {id:'B+'}, {id:'B-'}, {id:'AB+'}, {id:'AB-'}, {id:'O+'}, {id:'O-'}]

  const specializationArray = [{id:'Cardiologist'}, {id:'Dermatologist'}, {id:'Neurologist'}, {id:'Pediatrician'}, {id:'Gynecologist'}, {id:'Orthopedic'}, {id:"Dentist"}]
  const HolidayArray = [{id:'Monday'}, {id:'Tuesday'}, {id:'Wednesday'}, {id:'Thursday'}, {id:'Friday'}, {id:'Saturday'}, {id:"Sunday"}]
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role);
    data.append("gender", formData.gender);
    data.append("phoneNumber", formData.phoneNumber);

    if (formData.image) {
      data.append("image", formData.image);
    }

    if (formData.role === "patient") {
      data.append(
        "patientInfo",
        JSON.stringify({
          bloodGroup: formData.patientInfo.bloodGroup,
          age: formData.patientInfo.age,
        })
      );
    }

    if (formData.role === "doctor") {
      data.append(
        "doctorInfo",
        JSON.stringify({
          specialization: formData.doctorInfo.specialization,
          bio: formData.doctorInfo.bio,
          experience: formData.doctorInfo.experience,
          unAvailableDay: formData.doctorInfo.unAvailableDay,
          timeSlots: {
            startTime: formData.doctorInfo.timeSlots.startTime,
            endTime: formData.doctorInfo.timeSlots.endTime,
          },
        })
      );
    }

    await signup(data);
    console.log(formData)
  };

  
  
  
  return (
    <div className="register-container">
      
      <form className="register-form" onSubmit={handleSubmit}>
        <img src = "https://res.cloudinary.com/dze7v0evj/image/upload/v1754734152/BookMyDocLogo_ptnx4u.png" className='register-img'/>
        <h2 className='form-heading'>Register</h2>

        <label htmlFor="username" className='signup-label'> Full Name</label>
        <input
          id="username"
          type="text"
          placeholder="Enter full name"
          value={formData.fullName}
          className='signup-input'
          onChange={(e)=>setFormData({...formData,fullName:e.target.value})}
          required
        />

        <label htmlFor="email" className='signup-label'>Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          className='signup-input'
          value={formData.email}
          onChange={(e)=>setFormData({...formData,email:e.target.value})}
          required
          
        />
        <label htmlFor="phoneNumber" className='signup-label'>Phone Number</label>
        <input
          id="phoneNumber"
          type="phoneNumber"
          placeholder="Enter phoneNumber"
          className='signup-input'
          value={formData.phoneNumber}
          onChange={(e)=>setFormData({...formData,phoneNumber:e.target.value})}
          required
          
        />

        <label htmlFor="password" className='signup-label'>Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
           className='signup-input'
          value={formData.password}
         onChange={(e)=>setFormData({...formData,password:e.target.value})}
          required
        />

        <label htmlFor="role" className='label'>Select Role</label>
        <select
          id="role"
          value={formData.role}
          className='select-options'
          
          onChange={(e)=>setFormData({...formData,role:e.target.value})}
          required
        >
          <option value="patient"  className='options'>Patient</option>
          <option value="doctor" className='options'>Doctor</option>
          {/* <option value="admin" className='options'>Admin</option> */}
        </select>
        <label htmlFor="gender" className='label'>Gender</label>
        <select
          id="gender"
          value={formData.gender}
          className='select-options'
          
          onChange={(e)=>setFormData({...formData,gender:e.target.value})}
          required
        >
          <option value="male"  className='options'>Male</option>
          <option value="female" className='options'>Female</option>
          <option value="other" className='options'>Other</option>
        </select>
       
        {formData.role === "patient" && (
          <>
            <label className="signup-label">Blood Group</label>
            <select id = "bloodGroup" value = {formData.patientInfo.bloodGroup} className='select-options' onChange={(e)=>setFormData({...formData,
                  patientInfo: {
                    ...formData.patientInfo,
                    bloodGroup: e.target.value,
                  }})}
          required
        >
          {bloodGroupArray.map((bloodGroup)=>{
            return <option  value = {bloodGroup.id} className='options'>{bloodGroup.id}</option>
          })}
          {/* <option value="A+" className='options'>A+</option>
          <option value="B+" className='options'>B+</option> */}
        </select>
            <label className="signup-label">Age</label>
            <input
              type="number"
              className="signup-input"
              value={formData.patientInfo.age}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  patientInfo: {
                    ...formData.patientInfo,
                    age: e.target.value,
                  },
                })
              }
            />
          </>
        )}

        {formData.role === "doctor" && (
          <>
            <label className="signup-label">Specialization</label>
            <select id = "specialization" value = {formData.doctorInfo.specialization} className='select-options' onChange={(e)=>setFormData({...formData,
                  doctorInfo: {
                    ...formData.doctorInfo,
                    specialization: e.target.value,
                  }})}
          required
        >
          {specializationArray.map((specialization)=>{
            return <option  value = {specialization.id} className='options'>{specialization.id}</option>
          })}
          {/* <option value="A+" className='options'>A+</option>
          <option value="B+" className='options'>B+</option> */}
        </select>
            <label className="signup-label">Bio</label>
            <textarea
              className="signup-input"
              value={formData.doctorInfo.bio}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  doctorInfo: {
                    ...formData.doctorInfo,
                    bio: e.target.value,
                  },
                })
              }
            />
            <label className="signup-label">Experience (years)</label>
            <input
              type="number"
              className="signup-input"
              value={formData.doctorInfo.experience}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  doctorInfo: {
                    ...formData.doctorInfo,
                    experience: e.target.value,
                  },
                })
              }
            />
            <label className="signup-label">Holiday</label>
            <select id = "holiday" value = {formData.doctorInfo.unAvailableDay} className='select-options' onChange={(e)=>setFormData({...formData,
                  doctorInfo: {
                    ...formData.doctorInfo,
                    unAvailableDay: e.target.value,
                  }})}
          required
        >
          {HolidayArray.map((holiday)=>{
            return <option  value = {holiday.id} className='options'>{holiday.id}</option>
          })}
          {/* <option value="A+" className='options'>A+</option>
          <option value="B+" className='options'>B+</option> */}
        </select>
            <label className="signup-label">Start Time</label>
            <input
              type="time"
              className="signup-input"
              value={formData.doctorInfo.timeSlots.startTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  doctorInfo: {
                    ...formData.doctorInfo,
                    timeSlots: {
                      ...formData.doctorInfo.timeSlots,
                      startTime: e.target.value,
                    },
                  },
                })
              }
            />
            <label className="signup-label">End Time</label>
            <input
              type="time"
              className="signup-input"
              value={formData.doctorInfo.timeSlots.endTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  doctorInfo: {
                    ...formData.doctorInfo,
                    timeSlots: {
                      ...formData.doctorInfo.timeSlots,
                      endTime: e.target.value,
                    },
                  },
                })
              }
            />
          </>
        )}

        <label className="signup-label">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          className="signup-input"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
        />
        
        <button type="submit">Register</button>
        <p className='login-link'>
          Already have an account? <Link to="/login" className='link'>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage