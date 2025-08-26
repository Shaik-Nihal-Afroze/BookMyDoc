import {create} from 'zustand';
import {toast} from 'react-toastify';
import axiosInstance from '../lib/axios.js'; // Adjust the import path as necessary


export const useAuthStore = create((set) => ({

    authUser: null,
    isCheckingAuth: true,
    isUpdatingProfile:false,
    allusers: [],

  signup: async (data) => {
    
    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data });
      toast.success("Account created successfully", {
        position:'bottom-center'
      });
    } catch (error) {
      console.log("Error fetching sigup controller:", error);
      toast.error(error.response.data.message)
    } finally {
      
    }
  },

  login: async (data) => {
    
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully", {
        position:'bottom-center'
      });

    } catch (error) {
      console.log("Error fetching login controller:", error);
      toast.error(error.response.data.message)
    } finally {
      
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully",{
        position:'bottom-center'
      });
    } catch (error) {
      console.log("Error fetching logout controller:", error);
    }
  },

  updateProfile :async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res = await axiosInstance.put("/user/update-profile",data)
            set({authUser:res.data})
            toast.success("Profile Pic is Updated")
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isUpdatingProfile:true})
        }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkuser");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

    getAllUsers: async () => {
        try {
        const res = await axiosInstance.get("/user/getAllUsers");
        set({ allusers: res.data });
        } catch (error) {
        console.log("Error fetching all users:", error);
        toast.error("Failed to fetch users");
        }
    },

//      deleteUser :async(userEmail)=>{
//     try {
//       await axiosInstance.delete("/admin/deleteUser",{data:{userEmail}})
//       const updatedUsers = get().allUsers.filter(user=>user.email!==userEmail)
//       set({allUsers:updatedUsers})
//       // await get().getAllUsers()
//       toast.success("User deleted successfully")
//     } catch (error) {
//       console.log('Error in deleting store in useApplicationsStore:',error)
//     }
//   }
}));


