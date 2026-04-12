//5

import {Router} from "express";
import {getAllProduct, getProductById, getAllVariantsByProductId, getVariantById} from "./product.controller";
import {jwtVerification} from "../../middleware/auth.middleware";


const router = Router();//this is we create an instance platform for Router module from express library


//GetAllProduct routes 
router.get("/",jwtVerification,getAllProduct);


//GetProductByID -->this routes give every detail of product and its variants everything in detail
router.get("/:productId",jwtVerification,getProductById);

//getAllVariantByProductId
router.get("/:productId/variants",jwtVerification,getAllVariantsByProductId);
//well this route just gives us all the variant only no product details at all 

//getVariantById
router.get("/single/:variantId",jwtVerification,getVariantById);

export default router;