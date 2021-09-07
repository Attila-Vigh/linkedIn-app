import { Router } from "express";
import profileHandler from "./handler.js";

const router = Router();

router.route( '/')
    .get ( profileHandler.list )
    .post( profileHandler.add  )

router.route( '/:profileId' )
    .get   ( profileHandler.single )
    .put   ( profileHandler.update )
    .delete( profileHandler.delete )
    .get   ( profileHandler.getCV )


export default router;

