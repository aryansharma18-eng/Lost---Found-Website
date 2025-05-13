// export const cloudinary = require('cloudinary').v2;
import Cloudinary from 'cloudinary';
export const cloudinary = Cloudinary.v2;
import { CloudinaryStorage } from 'multer-storage-cloudinary';
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
import multer from 'multer';
// const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up CloudinaryStorage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lost-and-found',
    allowed_formats: ['jpg', 'jpeg', 'png']
  }
});

// Initialize multer middleware with the configured storage
export const upload = multer({ storage });

// module.exports = { cloudinary, upload };