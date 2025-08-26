import {create} from 'zustand';
import {toast} from 'react-toastify';
import axiosInstance from '../lib/axios.js'; // Adjust the import path as necessary
import { getDoctor } from '../../../backend/src/controllers/user.controller.js';

export const useUsersStore = create((set,get) => ({
  users: [],
  doctorDetails: null,

  getAllUsers: async () => {
    try {
      const res = await axiosInstance.get("/user/getAllUsers");
      set({ users: res.data });
      
      
      
      
    } catch (error) {
      console.log("Error fetching all users:", error);
      // toast.error("Failed to fetch users");
    }
  },

  

  deleteUser: async (userEmail) => {
    try {
      await axiosInstance.delete("/admin/deleteUser", { data: { userEmail } });
      const updatedUsers = get().users.filter((user) => user.email !== userEmail);
      set({ users: updatedUsers });
      toast.success("User deleted successfully");
    } catch (error) {
      console.log("Error in deleting user:", error);
    }
  },

  getDoctorDetails: async (doctorDetailsId) => {
    
    try {
      
      const res = await axiosInstance.get(`/user/getDoctor/${doctorDetailsId}`);
      set({ doctorDetails: res.data });
      console.log("Doctor details fetched successfully:", res.data);
    } catch (error) {
      console.log("Error fetching doctor details:", error);
      // toast.error("Failed to fetch doctor details");
    }
  },

  updateDoctorRating :async(doctor,patient,score) =>{
    try {
      const res = await axiosInstance.put("/user/submit-rating",{doctor,patient,score})
      toast.success("Review Submitted Successfully")
      console.log(res)
    } catch (error) {
      console.log("Error updating doctor rating:", error)
    }
  }

}));




