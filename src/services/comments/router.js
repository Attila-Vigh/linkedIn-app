import { Router } from "express";
import CommentHandler from "./handler.js";
import uploadPostImage from "../utils/uploadFiles.js";

const router = Router();

router.route( "/:postId" )
    .get( CommentHandler.getAll )
    .post(
        uploadPostImage("linkedjobs/posts-images").single( "image" ),
        CommentHandler.add 
    );

router.route( '/:postId/:commentId' )
    .get( CommentHandler.findById )
    .put( CommentHandler.update )
    .delete( CommentHandler.delete );


export default router;