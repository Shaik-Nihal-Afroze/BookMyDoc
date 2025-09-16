import React,{useEffect} from "react";

import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from "react-toastify";

import {Routes,Route,Navigate} from "react-router-dom";

import {ClipLoader} from 'react-spinners'
import {useAuthStore} from "./store/useAuthStore.js";
import PatientPage from "./pages/PatientPage/patientPage"; 
import LoginPage from "./pages/LoginPage/loginPage";
import SignUpPage from "./pages/SignUpPage/signUpPage";
import DoctorDetailsPage from "./pages/DoctorDetailsPage/doctorDetailsPage";

import './App.css';

import DoctorPage from "./pages/DoctorPage/doctorPage";
const App = () => {
  const {authUser,isCheckingAuth,checkAuth} = useAuthStore()
  useEffect(() => {
    checkAuth();
  }, [authUser])
  return (
    <div>
      
      <Routes>
        <Route path="/" element={!authUser ? <Navigate to="/login"/> :<Navigate to={`/${authUser.role.toLowerCase()}`}/> } />
        <Route path="/login" element = {!authUser?<LoginPage/>:<Navigate to = {`/${authUser.role.toLowerCase()}`} />}/>
        <Route path="/register" element = {!authUser?<SignUpPage/>:<Navigate to = {`/${authUser.role.toLowerCase()}`} />}/>
        <Route path="/doctor" element={authUser?.role ==="doctor" ? <DoctorPage /> : <Navigate to="/login" />} />
        <Route path="/patient" element={authUser?.role ==="patient" ? <PatientPage /> : <Navigate to="/login" />} />
        <Route path="/doctor/:id" element={!authUser?<LoginPage/>:<DoctorDetailsPage />} />
        
      </Routes>
      
      <ToastContainer />
    </div>
  );
}

export default App