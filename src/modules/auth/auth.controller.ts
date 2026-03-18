//In this layer, our task is to take input which is coming from the user and extracting important stuffs according to the requirment and then forwarding it to service layer.
//This layer also takes care of rsponse and diff status codes.

import {Request, Response, NextFunction} from "express";
import {registerUser} from "./auth.service";

const RegisterUser = async(req:Request, res:Response)=>{
    try{
        const {username, email, password} = req.body;
        //here we have used the logic of destructuring , whcich means we extract username , email and password from our body.
        //the other method is 
        //const body = req.body;
         //body.username and body.email and body.password


      const result = await registerUser({username, email,password});
      res.status(201).json({result});

    }catch(error){
        if(error instanceof Error && error.message === "User Already Exist"){
            res.status(409).json({
                message : "User Already Exist"});
                //always send json data in the form of key and value.

        }else{
            res.status(500).json({
                message : "Unexpected Server Error"
            });
            

        }
    }

};

//if you are sending an error from sevice layer to controller in that case during the compile time ts cannot identify the error, so we do need to explicitly add error instanceofe Error && error.message which means if the error is an error messgae and if both are true or not.