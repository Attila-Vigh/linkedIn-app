import { Router } from "express";
import experienceHandler from "./handler.js";

const router = Router();

router.route( "/" )
    .get( experienceHandler.getAll )
    .post( experienceHandler.add );

router.route( '/:id' )
    .get   (experienceHandler.findById )
    .put   ( experienceHandler.update )
    .delete( experienceHandler.delete )



export default router;
