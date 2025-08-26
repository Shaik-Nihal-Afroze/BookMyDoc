import {Router} from 'express';
import {protectedRoute} from '../middlewares/protectedRoute.js';
import {createAppointment,getAllAppointments,getPatientAppointments, updateAppointmentStatus} from '../controllers/appointment.controller.js';

const router = Router();

router.post("/createAppointment", protectedRoute, createAppointment);
router.put("/:appointmentId", protectedRoute, updateAppointmentStatus);
router.get("/getAllAppointments", protectedRoute, getAllAppointments);
router.get("/getPatientAppointments", protectedRoute, getPatientAppointments);

export default router;
