import { Router } from "express";
import experiences from "./experiences/router.js";
import profile from "./profile/router.js";
import post from "./post/router.js";
import comment from "./comments/router.js"


const services = Router();

services.use("/experiences", experiences);
// services.use( "/profile"   , profile);
services.use("/post", post);
services.use("/comments", comment)

services.use( "/profile", experiences);

services.use( "/profile", profile);
services.use( "/post", post);


export default services;