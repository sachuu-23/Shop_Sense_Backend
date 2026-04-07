//4
//In this file we take care about incoming request for products and responding it back to the user.

import {Request, Response} from "express";
import {Get_All_Products,Get_Product_By_Id }from "./product.service";


//Handle getAllProducts routes or call 
export const getAllProduct = async(req:Request , res:Response)=>{

    try {
        const {page ,limit} = req.query;
        const pageNumber = Number(page) || 1;
        const limitNumber = Number(limit) || 20;
        const result = await Get_All_Products(pageNumber,limitNumber);
        return res.status(200).json(result);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            message :"Unexpected server error "
        });

    }

};


//Handle GetProductById request 

export const getProductById = async(req:Request, res:Response) =>{
    try{
        const id = req.params.id;
        const result = await Get_Product_By_Id(id);

        //if product is not found then check for that also 

        if(!result){
            return res.status(404).json({
                message : "Product Not Found"
            });
        }

        return res.status(200).json(result);
    }

    catch(error){
        console.error(error);
        return res.status(500).json({
            message : "Unexpected Server Error"
        });
    }
};