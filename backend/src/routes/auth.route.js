
import {Router} from 'express';
import multer from 'multer'
import {protectedRoute} from '../middlewares/protectedRoute.js';
import { signup ,login,logout,checkAuth} from '../controllers/auth.controller.js';
const router = Router();

const storage = multer.memoryStorage()
const upload = multer({storage})

router.post("/register", upload.single("image"),signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/checkuser",protectedRoute, checkAuth);

export default router;