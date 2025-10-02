
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import appointmentRoutes from './routes/appointment.route.js';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';
import uploadRoutes from './routes/upload.route.js';

import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from './models/user.model.js';
import Appointment from './models/appointment.model.js';
import Message from './models/message.model.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const allowedOrigins = ['http://localhost:5173','https://book-my-doc-rose.vercel.app']; 
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());


app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/upload', uploadRoutes);

// create HTTP server and attach socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173','https://book-my-doc-rose.vercel.app'],
    credentials: true
  }
});

// helper to parse cookie header into object
function parseCookies(cookie = '') {
  return cookie.split(';').map(c => c.split('=')).reduce((acc, [k, v]) => {
    if (!k) return acc;
    acc[k.trim()] = decodeURIComponent(v || '');
    return acc;
  }, {});
}

// socket auth using jwt token from cookie (jwtToken)
io.use(async (socket, next) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie;
    if (!cookieHeader) return next(new Error('No cookie'));
    const cookies = parseCookies(cookieHeader);
    const token = cookies.jwtToken;
    if (!token) return next(new Error('No token'));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return next(new Error('Invalid token'));
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return next(new Error('User not found'));
    socket.user = user;
    next();
  } catch (err) {
    console.error('Socket auth error:', err.message);
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id, 'user:', socket.user._id.toString());

  socket.on('joinRoom', async ({ appointmentId }) => {
    try {
      const appt = await Appointment.findById(appointmentId);
      if (!appt) return socket.emit('error', 'Invalid appointment');
      const uid = socket.user._id.toString();
      if (appt.patient.toString() !== uid && appt.doctor.toString() !== uid) {
        return socket.emit('error', 'Not authorized for this chat');
      }
      socket.join(appointmentId);
      socket.emit('joinedRoom', appointmentId);
    } catch (err) {
      console.error('joinRoom error', err);
    }
  });

  // Single event for sending a message (text or image)
  socket.on('sendMessage', async ({ appointmentId, text, imageUrl }) => {
    try {
      const uid = socket.user._id;
      const appt = await Appointment.findById(appointmentId);
      if (!appt) return socket.emit('error', 'Invalid appointment');
      const isParticipant = appt.patient.toString() === uid.toString() || appt.doctor.toString() === uid.toString();
      if (!isParticipant) return socket.emit('error', 'Not authorized');

      const msg = new Message({
        appointment: appointmentId,
        sender: uid,
        text: text || null,
        imageUrl: imageUrl || null,
      });
      await msg.save();
      await msg.populate('sender', 'fullName image role');

      io.to(appointmentId).emit('newMessage', msg);
    } catch (err) {
      console.error('sendMessage error', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('DB connect error:', err);
    process.exit(1);
  });
