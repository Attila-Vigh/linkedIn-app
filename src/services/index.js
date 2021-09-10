import { Router } from "express";
import experiences from "./experiences/router.js";
import profile from "./profile/router.js";
import post from "./post/router.js";


const services = Router();

// services.use("/profile/:userName/experiences", experiences);
// services.use("/experiences", experiences);

services.use( "/profile", experiences);

services.use( "/profile", profile);
services.use( "/post", post);


export default services;