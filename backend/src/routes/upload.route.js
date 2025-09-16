// backend/src/routes/upload.route.js
import { Router } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { protectedRoute } from '../middlewares/protectedRoute.js';

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// define storage for multer with cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'bookmydoc_chat', // all uploads go inside this folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }], // optional resize
  },
});

const upload = multer({ storage });

const router = Router();

// POST /api/upload/image
router.post('/image', protectedRoute, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  // Cloudinary returns a URL in req.file.path
  res.status(200).json({ imageUrl: req.file.path });
});

export default router;
