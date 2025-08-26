import {create} from 'zustand';
import {toast} from 'react-toastify';
import axiosInstance from '../lib/axios'; 

export const useAppointmentStore = create((set) => ({
  appointments: [],
  isLoading: false,
  getDoctorAppointments: async () => {
    set({ isLoading: true });
    try {
        const res = await axiosInstance.get("/appointment/getAllAppointments");
        set({ appointments: res.data });
        
      } catch (error) {
        console.log("Error fetching appointments:", error);
        toast.error("Failed to fetch appointments");
      } finally {
        set({ isLoading: false });
      }
    },
  getPatientAppointments: async () => {
    set({ isLoading: true });
    try {
        const res = await axiosInstance.get("/appointment/getPatientAppointments");
        set({ appointments: res.data });
        
      } catch (error) {
        console.log("Error fetching appointments:", error);
        toast.error("Failed to fetch appointments");
      } finally {
        set({ isLoading: false });
      }
    },
    createAppointment: async (data) => {
      try {
        const res = await axiosInstance.post("/appointment/createAppointment", data);
        set((state) => ({
          appointments: [...state.appointments, res.data.appointment],
        }));
        toast.success("Appointment created successfully");
      } catch (error) {
        console.log("Error creating appointment:", error);
        toast.error(error.response.data.message || "Failed to create appointment");
      }
    },
    updateAppointmentStatus: async (appointmentId,status) => {
        try {
            const appointment = await axiosInstance.put(`/appointment/${appointmentId}`,{status});
            // const updatedAppointment = appointment.status = action;
            set((state) => ({
            appointments: state.appointments.map((eachAppointment)=>eachAppointment._id === appointmentId?{...eachAppointment,status:status}:eachAppointment),
            }));
            
            toast.success(`Appointment ${status} successfully`);
        } catch (error) {
            console.log("Error confirming appointment:", error);
            toast.error(error.response.data.message || "Failed to confirm appointment");
        }
    },
    cancelAppointment: async (appointmentId) => {   
        try {
            const appointment = await axiosInstance.put(`/appointments/${appointmentId}/cancel`);
            const updatedAppointment = appointment.status = "canceled";
            set((state) => ({
            appointments: [...state.appointments, updatedAppointment],
            }));
            toast.success("Appointment cancelled successfully");
        } catch (error) {
            console.log("Error cancelling appointment:", error);
            toast.error(error.response.data.message || "Failed to cancel appointment");
        }
        },

}));

