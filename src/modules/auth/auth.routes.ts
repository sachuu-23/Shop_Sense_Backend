//8
//In this file our main aim is to pass the incoming request to its valid controller function. In this file we will be handling all the routing logics and if in case we need to call middleware , we would do that too.

import { Router } from "express";
import {RegisterUser,LoginUser,logoutUser,RefreshAccessToken,GetMe} from "./auth.controller";

const router = Router();

//route for register
router.post("/register",RegisterUser);

//route for login
router.post("/login",LoginUser);

//route for refreshToken
router.post("/refresh",RefreshAccessToken);

//route for logout
router.post("/logout",logoutUser);

//route for GetMe
router.get("/me",GetMe);


export default router;