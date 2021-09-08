import { Router } from "express";
import experiencesHandler from "./handler.js";

import uploadImage from "../utils/uploadFiles.js";

const router = Router();



router.route( "/" )
    .get( experiencesHandler.getAll )
    .post(

        uploadImage( "linkedjobs/experiences-images" ).single( "image" ),
        
        experiencesHandler.add
    );

router.route( '/:id' )
    .get( experiencesHandler.findById )
    .put( experiencesHandler.update )
    .delete( experiencesHandler.delete );


// router.route( "/image" )
//     .post(
//         multer( { storage: cloudinaryStorage } ).single( "image" ),
//         async ( req, res, next ) => {
//             req.body.image = req.file.path;
//             res.send( req.body.image );
//         }

//     );

export default router;

