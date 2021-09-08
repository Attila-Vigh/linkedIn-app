import { Router } from "express";
import postHandler from "./handler.js";
import uploadPostImage from "../utils/uploadFiles.js";

const router = Router();

router.route( "/" )
    .get( postHandler.getAll )
    .post(
        uploadPostImage("linkedjobs/posts-images").single( "image" ),
        postHandler.add 
    );

router.route( '/:id' )
    .get( postHandler.findById )
    .put( postHandler.update )
    .delete( postHandler.delete );


export default router;