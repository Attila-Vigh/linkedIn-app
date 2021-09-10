import { Router } from "express";
import experiencesHandler from "./handler.js";

import uploadImage from "../utils/uploadFiles.js";

const router = Router();



router.route( "/:userName/experiences" )
    .get( experiencesHandler.getAll )
    .post(

        uploadImage( "linkedjobs/experiences-images" ).single( "image" ),
        
        experiencesHandler.add
    );

router.route( '/:userName/experiences/:expId' )
    .get( experiencesHandler.findById )
    .put( experiencesHandler.update )
    .delete( experiencesHandler.delete );

router.route( '/:userName/experiences/:expId/picture' )
    .post( 
        uploadImage( "linkedjobs/experiences-images" ).single( "image" ), 
        experiencesHandler.uploadPicture );


router.route( '/:userName/experiences/CSV' )

// router.route( "/image" )
//     .post(
//         multer( { storage: cloudinaryStorage } ).single( "image" ),
//         async ( req, res, next ) => {
//             req.body.image = req.file.path;
//             res.send( req.body.image );
//         }

//     );

export default router;