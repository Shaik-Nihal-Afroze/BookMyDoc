// frontend/src/store/useChatStore.js
import { create } from 'zustand';
import { io } from 'socket.io-client';
import axiosInstance from '../lib/axios';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
let socket;

export const useChatStore = create((set, get) => ({
  socketConnected: false,
  messagesByAppointment: {}, // { appointmentId: [msg,...] }
  activeAppointment: null,

  connectSocket: () => {
    if (socket) return;
    socket = io(SOCKET_URL, { withCredentials: true });
    socket.on('connect', () => set({ socketConnected: true }));
    socket.on('disconnect', () => set({ socketConnected: false }));
    socket.on('newMessage', (msg) => {
      set((state) => {
        const apptId = msg.appointment.toString();
        const prev = state.messagesByAppointment[apptId] || [];
        return { messagesByAppointment: { ...state.messagesByAppointment, [apptId]: [...prev, msg] } };
      });
    });
    socket.on('error', (err) => console.error('socket error:', err));
  },

  joinAppointment: (appointmentId) => {
    get().connectSocket();
    socket.emit('joinRoom', { appointmentId });
    set({ activeAppointment: appointmentId });
  },

  loadMessages: async (appointmentId) => {
    try {
      const res = await axiosInstance.get(`/chat/${appointmentId}`);
      set((state) => ({ messagesByAppointment: { ...state.messagesByAppointment, [appointmentId]: res.data } }));
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  },

  sendText: (appointmentId, text) => {
    if (!socket) get().connectSocket();
    socket.emit('sendMessage', { appointmentId, text });
  },

  sendImage: async (appointmentId, file) => {
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await axiosInstance.post('/upload/image', fd, { headers: { 'Content-Type': 'multipart/form-data' }});
      const { imageUrl } = res.data;
      if (!socket) get().connectSocket();
      socket.emit('sendMessage', { appointmentId, imageUrl });
    } catch (err) {
      console.error('sendImage error:', err);
    }
  },

  getMessagesFor: (appointmentId) => (get().messagesByAppointment[appointmentId] || []),
}));
