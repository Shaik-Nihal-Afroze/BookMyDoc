import React, { useState } from 'react'

import { useAuthStore } from '../../store/useAuthStore';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {Link} from 'react-router-dom'

import "./loginPage.css"

const LoginPage = () => {

  const {login} = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',


  })

  const handleLogin = async (e) => {
    e.preventDefault()
    login(formData)
  }


  return (
    <div className="login-container">
     {/* <img src = "https://res.cloudinary.com/dze7v0evj/image/upload/v1754737731/bookMyDocLOginImage_ibaqef.png" className='login-cover-image' alt = "BYD" /> */}
      <form onSubmit={handleLogin} className="login-form">
         <img src="https://res.cloudinary.com/dze7v0evj/image/upload/v1754734152/BookMyDocLogo_ptnx4u.png" className='credit-logo'/>
        <div className="form-group1">
          <label htmlFor="email" className='label'>Email</label>
          <input
            type="email"
            id="email"
            className='login-input'
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e)=>setFormData({...formData,email:e.target.value})}
            required
          />
        </div>

        <div className="form-group1">
          <label htmlFor="password" className='label'>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              className='login-input'
              onChange={(e)=>setFormData({...formData,password:e.target.value})}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="eye-btn"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="login-btn-login-page">Login</button>
        <p className="signup-link">
          Don't have an account? <Link to="/register" className='link'>Sign Up</Link>
        </p>
        </div>

        
      </form>
    </div>
  );
}

export default LoginPage