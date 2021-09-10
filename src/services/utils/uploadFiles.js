import multer from "multer";
import { v2 as cloudinary } from "cloudinary"; // grabs CLOUDINARY_URL from process.env.CLOUDINARY_URL
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const cloudinaryStorage = (folder = 'https://res.cloudinary.com/photo-wan/image/upload/c_thumb,w_200,g_face/v1631019916/linkedjobs/experiences-images/wsur1uxzyvkknou7vl1s.jpg') =>
    multer({
        storage: new CloudinaryStorage({
            cloudinary,
            params: { folder: folder, },
        })
    })

export default cloudinaryStorage;