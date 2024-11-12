

const multer=require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const Cloudinary = require("cloudinary").v2;

function ImageLayer(){

    Cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.CLOUD_API_KEY,
        api_secret:process.env.CLOUD_SECRET_KEY
    })


    const storage = new CloudinaryStorage({
        cloudinary:Cloudinary,
        params:{
folder:"upload",
allowed_formats:["png","jpg"]
        }
    })

    const upload = multer({storage})
    return upload
}

module.exports={
    ImageLayer
}