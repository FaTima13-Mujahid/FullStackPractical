


// STEP - 01 - CLOUDINARY SETUP -

const multer = require("multer");

const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");

function ImageUpload() {
  // STEP - 02 - Cloudinary API keys setup 

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // Cloudinary ka cloud name
    api_key: process.env.CLOUD_API_KEY, // Cloudinary API key
    api_secret: process.env.CLOUD_SECRET_KEY, // Cloudinary API secret key
  });

  // STEP - 03 - Cloudinary ke liye multer storage configuration

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "uploads", // Cloudinary mein folder ka naam
      allowed_formats: ["jpg", "png"], // Allow sirf jpg aur png formats
    },
  });

  // STEP - 04 - Upload function setup karna

  const upload = multer({ storage });

  return upload;
}

module.exports = { ImageUpload }; // Exporting ImageUpload function
