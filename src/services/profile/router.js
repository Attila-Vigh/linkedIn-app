import { Router } from "express";
import profileHandler from "./handler.js";
import upload from '../../lib/fs-tools.js'


const router = Router();


router.route('/')
    .get(profileHandler.list)
    .post(profileHandler.add)

router.route('/:profileId')
    .get(profileHandler.single)
    .put(profileHandler.update)
    .delete(profileHandler.delete)
    .get(profileHandler.getCV)

// router.route('/:profileId/picture')
//     .get(profileHandler.getImage)
//     .post(upload.single('image'), profileHandler.addImage)


export default router;