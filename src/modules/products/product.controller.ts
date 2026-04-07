//4
//In this file we take care about incoming request for products and responding it back to the user.

import {Request, Response} from "express";
import {Get_All_Products} from "./product.service";


export const getAllProduct = async(req:Request , res:Response)=>{

    try {
        const {page ,limit} = req.query;
        const pageNumber = Number(page) || 1;
        const limitNumber = Number(limit) || 20;
        const result = await Get_All_Products(pageNumber,limitNumber);
        res.status(200).json(result);
    }
    catch(error){
        
    }

}