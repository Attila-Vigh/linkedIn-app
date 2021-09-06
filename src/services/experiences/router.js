import { Router } from "express";
import experiencesHandler from "./handler.js";

const router = Router();

router.route( "/" )
    .get( experiencesHandler.getAll )
    .post( experiencesHandler.add );

router.route( '/:id' )
    .get   (experiencesHandler.findById )
    .put   ( experiencesHandler.update )
    .delete( experiencesHandler.delete )



export default router;
