import { Router } from "express";
import postHandler from "./handler.js";

const router = Router();

router.route( "/" )
    .get( postHandler.getAll )
    .post( postHandler.add );

router.route( '/:id' )
    .get( postHandler.findById )
    .put( postHandler.update )
    .delete( postHandler.delete );


export default router;