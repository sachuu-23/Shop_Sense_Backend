//8
//In this file our main aim is to pass the incoming request to its valid controller function. In this file we will be handling all the routing logics and if in case we need to call middleware , we would do that too.

import { Router } from "express";
import {RegisterUser,LoginUser,logoutUser,RefreshAccessToken,GetMe} from "./auth.controller";
import {jwtVerification,zodValidationCheck} from "./../../middleware/auth.middleware";
import {RegisterUserSchema,LoginUserSchema} from "../../middleware/auth.zodValidation"

 const router = Router();

//route for register , middle function with passing parameter is middleware verification
 router.post("/register",zodValidationCheck(RegisterUserSchema),RegisterUser);

//route for login
router.post("/login",zodValidationCheck(LoginUserSchema),LoginUser);

//route for refreshToken
router.post("/refresh",RefreshAccessToken);

//route for logout
router.post("/logout",jwtVerification , logoutUser);

//route for GetMe
router.get("/me",jwtVerification,GetMe);


export default router;