import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import appointmentRoutes from './routes/appointment.route.js';
import userRoutes from './routes/user.route.js';

const app = express();
app.use(express.json());
dotenv.config()
const allowedOrigins = ['http://localhost:5173', '']; // Add your allowed origins here
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(cookieParser())



app.use("/api/auth",authRoutes)
app.use("/api/appointment",appointmentRoutes)
app.use("/api/user", userRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});