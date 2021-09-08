import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";    // grabs CLOUDINARY_URL from process.env.CLOUDINARY_URL
import { CloudinaryStorage } from "multer-storage-cloudinary";

import { saveStudentsPicture } from "../../lib/fs-tools.js";




const storage = new CloudinaryStorage( {
    cloudinary: cloudinary,
} );


export const parseFile = multer( { storage } );

const cloudinaryStorage = new CloudinaryStorage( { cloudinary, params: { folder: "strive-books", }, } );

const filesRouter = express.Router();



filesRouter.post(
    "/register"
    ,
    multer( { storage: cloudinaryStorage } ).single( "profilePic" )

    ,
    async ( req, res, next ) => {
        try
        {
            req.file                                       console.log( req.file ); //! TODO: remove
            const newStudent = { profilePic: req.fil.epath };   // multer-storage-cloudinary gives us back req.file.path --> save this info in your db
            res.send( "Uploaded!" );
        }
        catch ( error )
        {
            next( error );
        }
    }
);

filesRouter.post( "/uploadMultiple", multer().array( "profilePic" ), async ( req, res, next ) => {
    try
    {
        console.log( req.files );

        const arrayOfPromises = req.files.map( file => saveStudentsPicture( file.originalname, file.buffer ) );

        await Promise.all( arrayOfPromises );

        res.send( "Uploaded!" );
    } catch ( error )
    {
        next( error );
    }
} );


export default filesRouter;