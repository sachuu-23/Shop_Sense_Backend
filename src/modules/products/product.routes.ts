//5

import {Router} from "express";
import {getAllProduct, getProductById, getAllVariantsByProductId, getVariantById} from "./product.controller";
import {jwtVerification} from "../../middleware/auth.middleware";


const router = Router();//this is we create an instance platform for Router module from express library


//GetAllProduct routes 
router.get("/",jwtVerification,getAllProduct);


//GetProductByID
router.get("/:id",jwtVerification,getProductById);

//getAllVariantByProductId
router.get("/:id/variants",jwtVerification,getAllVariantsByProductId);

//getVariantById
router.get("/:variantId",jwtVerification,getVariantById);

export default router;