import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadToCloudinary = async (localFilePath)=>{
  try {
    await cloudinary.uploader.upload(localFilePath,{
      folder: "FypApp",
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type: "auto"
    })
  } catch (error) {
    
  }
}

