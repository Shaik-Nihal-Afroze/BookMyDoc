import React, { use, useEffect ,useState

} from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import "./patientPage.css";
import {useAuthStore} from "../../store/useAuthStore.js";
import Header from "../../components/Header/header";
import {useUsersStore} from "../../store/useUsersStore.js";
import Cardiologist from "../../assets/doctorProjectImages/Cardiologist.png";
import CardiologistLogo from "../../assets/doctorProjectImages/CardiologistLogo.png";
// import CardiologistLogo from "../../assets/doctorProjectImages/CardiologistLogo.png";
import DermatologistLogo from "../../assets/doctorProjectImages/DermatologistLogo.png"
import GynecologistLogo from "../../assets/doctorProjectImages/GynecologistLogo.png"
import Dentist from "../../assets/doctorProjectImages/DentistLogo.png";
import Gynecologist from "../../assets/doctorProjectImages/GynecologistLogo.png";
// import Dermatologist from "../../assets/doctorProjectImages/DermatologistLogo.png";
import Pediatrician from "../../assets/doctorProjectImages/PediatricianLogo.png";
import Neurologist from "../../assets/doctorProjectImages/NeurologistLogo.png";
import Orthopedic from "../../assets/doctorProjectImages/OrthopedicLogo.png";
import AllDoctors from "../../assets/doctorProjectImages/AllDoctors.png";
const PatientPage = () => {
   const {checkAuth, authUser} = useAuthStore();
    const { users, getAllUsers,getDoctorDetails } = useUsersStore()
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchedDoctor,setSearchedDoctor] = useState('')

    const allDoctorsCategories = [{id: 'Cardiologist', image: CardiologistLogo}, {id: 'Dermatologist', image: DermatologistLogo}, {id: 'Neurologist', image: Neurologist}, {id: 'Pediatrician', image: Pediatrician}, {id: 'Gynecologist', image: GynecologistLogo}, {id: 'Orthopedic', image: Orthopedic}, {id: "Dentist", image: Dentist},{id: 'All',image:AllDoctors}]

    const handleDoctorClick = (id) => {
        getDoctorDetails(id);

        console.log("Doctor ID clicked:", id);
    }
    useEffect(() => {
        getAllUsers();
       console.log({users});
        checkAuth();
    }, [checkAuth, getAllUsers,getDoctorDetails]);

    useEffect(() => {
        console.log({users})
        console.log(searchedDoctor)
    },[ users,searchedDoctor]);

//     let filteredDoctorsArray = users.filter((user) => {
//     const isDoctor = user.role === 'doctor';
//     const matchesCategory = selectedCategory === 'All' || user.doctorInfo.specialization === selectedCategory;
//     const matchesSearch = (searchedDoctor === '' || searchedDoctor === 'All') || user.fullName.toLowerCase().includes(searchedDoctor.toLowerCase());

//   return isDoctor && (matchesCategory || matchesSearch);
// });
    let filteredDoctorsArray = selectedCategory !== "All" ? users.filter((user) => user.role === 'doctor' &&  user.doctorInfo.specialization === selectedCategory && user.fullName.toLowerCase().includes(searchedDoctor.toLowerCase())) : users.filter((user) => user.role === 'doctor' && user.fullName.toLowerCase().includes(searchedDoctor.toLowerCase()));
    let avgRating;
    let noOfRatings;
    let selectedCategoryBgColor =  selectedCategory === allDoctorsCategories.id ?"selected-category":""
    return (
        <div className="patient-bg-page">
            <Header/>
            <div className="patient-main-container">
                <h1 className="doctor-category-title">Categories</h1>
                <ul className="doctor-category-list">
                    {allDoctorsCategories.map((category, index) => (
                        <li key={index} className={`doctor-category-item ${selectedCategory === category.id?"selected-category":""}`}>
                            <button onClick={() => setSelectedCategory(category.id)} className="doctor-category-button">
                                <img src = {category.image} alt={category.id} className="doctor-category-image" />
                                {/* <span>{category.id}</span> */}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="input-container">
                    
                    <input type= "input" value = {searchedDoctor} onChange = {(e)=>setSearchedDoctor(e.target.value)} placeholder = "Search a doctor" className="doctor-name-input"/>
                </div>
                <ul className="doctor-list">
                    {filteredDoctorsArray.map((doctor) => {
                        avgRating = doctor.doctorInfo.ratings.length?doctor.doctorInfo.ratings.reduce((acc, currentValue) => acc + Number(currentValue.score || 0), 0) /doctor.doctorInfo.ratings.length : 0;
                        noOfRatings = doctor.doctorInfo.ratings.length;
                        return (
                            <Link to={`/doctor/${doctor._id}`} className="doctor-link" key={doctor._id} onClick={() => handleDoctorClick(doctor._id)}>
                            <li key={doctor._id} className="doctor-card">
                                <img src = {doctor.image} className="doctor-card-image" alt = {doctor.fullName[0].toUpperCase()}/>
                                <div>

                                     <h2 className="doctor-card-name">Dr. {doctor.fullName}</h2>
                                <p className="doctor-card-specialization">{doctor.doctorInfo.specialization}</p>
                                <p className="doctor-card-rating"><FaStar size = {14} /> {avgRating.toFixed(1)} Rating</p>
                                </div>
                               
                            </li>
                            </Link>
                        );
                    })}
                </ul>
                </div>
            </div>

    );
};

export default PatientPage;
