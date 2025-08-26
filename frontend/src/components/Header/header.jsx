import React ,{useState,useEffect}from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore.js';
import {Camera} from 'lucide-react'
import './header.css';
// import { useState } from 'react';
const Header = () => {
  const { authUser,logout,checkAuth,updateProfile ,isUpdatingProfile} = useAuthStore();
  const [selectedImg,setselectedImg] = useState(null)
  
    const handleLogout = () => {
        if (authUser) {
            logout();
        }
        
    };
  
  return (
     <div className="header-container">
      <div className="logo-container">
        <div className = "profile-container">
          <img src= {authUser.image || authUser.fullName[0].toUpperCase()} alt = {authUser.fullName[0].toUpperCase()} className='user-profile'/>
            


          {/* <p className="user-profile">{authUser.fullName[0].toUpperCase()}</p> */}
        </div>
                
                <div className="user-info-container">
                    <h1 className="user-name">{authUser.fullName}</h1>
                    <p className="welcome-message">How is your health?</p>
                </div>
                
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
  )
}

export default Header
