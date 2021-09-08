import { Router } from "express";
import experiences from "./experiences/router.js";
// import profile    from "./profile/router.js";
// import experience from "./experience/router.js";
import profile from "./profile/router.js";
import post from "./post/router.js";


const services = Router();

services.use("/experiences", experiences);
// services.use( "/profile"   , profile);
services.use("/post", post);

// import experience from "./experience/router.js";
import profile from "./profile/router.js";
// import post       from "./post/router.js";

//const services = Router();

// services.use( "/experience", experience);
services.use("/profile", profile);
// services.use( "/post"      , post);

export default services;