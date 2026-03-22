//9
//In this file we will be writing logics for jwt middleware verification.

import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

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
        //after this verifyjwy cotnain decoded payload which is user_id, iat and expiration of token
        req.user = {user_id : decoded.user_id};
        //this req.user contains the user id whcih we will need in getme in controller
        //and we defined this req.user format in express.d.ts
        
        next();
    }
    catch(error){
        res.status(401).json({
            message : "Token is not valid, authenticate again"
        });

    }
};