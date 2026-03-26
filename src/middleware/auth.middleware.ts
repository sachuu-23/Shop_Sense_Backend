//9
//In this file we will be writing logics for handling diff middleware checks like jwtVerification and zodValidationCheck 

import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {z} from "zod";

 

 export const jwtVerification = (req:Request, res:Response,next :NextFunction) =>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message : "Invalid token format"
            })
        }
        const token = authHeader?.split(' ')[1];
        if(!token){
          return res.status(401).json({
                message : "Token is missing"
            });
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET!) as {user_id : string};
        //after this verifyjwt cotnain decoded payload which is user_id, iat and expiration of token
        req.user = {user_id : decoded.user_id};
        //this req.user contains the user id whcih we will need in getme in controller
        //and we defined this req.user format in express.d.ts
        
        next();
    }
    //here in this error we are catching id decode is wrong , then for that we need to catch the error and resturn the error.
    catch(error){
        res.status(401).json({
            message : "Token is not valid, authenticate again"
        });

    }
};


//ZodVaidation Function for zod schemas :

export const zodValidationCheck = (schema:z.ZodSchema) =>{
    return (req:Request, res:Response , next:NextFunction)=>{
        const result = schema.safeParse(req.body);
        if(!result.success){
           return res.status(400).json({
                result : result.error
            })
        }else{
            next();
        }
    };
};

