//9
//In this file we will be writing logics for jwt middleware verification.

import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

const jwtVerification = async(req:Request, res:Response,next :NextFunction) =>{
    try{
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];
        if(!token){
            res.status(401).json({
                message : "Token is missing"
            })
        }
    }
}