
import {Router} from 'express';
import {protectedRoute} from '../middlewares/protectedRoute.js';
import { getAllDoctors,getDoctor,getAllUsers,submitRating, updateProfile} from '../controllers/user.controller.js';
const router = Router();
router.get("/get-doctors", protectedRoute, getAllDoctors);
router.get("/getAllUsers", protectedRoute, getAllUsers);
router.get("/getDoctor/:id", protectedRoute, getDoctor);
router.put("/submit-rating", protectedRoute, submitRating);
router.put("/update-profile", protectedRoute, updateProfile);

export default router;