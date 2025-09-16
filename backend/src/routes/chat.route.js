// backend/src/routes/chat.route.js
import { Router } from 'express';
import { protectedRoute } from '../middlewares/protectedRoute.js';
import { getMessages } from '../controllers/chat.controller.js';

const router = Router();

router.get('/:appointmentId', protectedRoute, getMessages);

export default router;
