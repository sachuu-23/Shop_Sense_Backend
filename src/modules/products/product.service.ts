//3
import { getAllProducts,getProductById,
    getAllVariantByProductId,getVariantById } from "./product.repo";

//GetAllProducts
export const Get_All_Products = async(page:number,limit :number)=>{
    try{
        const allProducts = await getAllProducts(page,limit);
        return allProducts;
    }
    catch(error){
        throw error;
    }
};

//GetProductById
export const Get_Product_By_Id = async(productId : string)=>{
    try{
        const get_product_by_id = await getProductById(productId);

        if(!get_product_by_id){
            throw new Error("Product Not found");
        }
        return get_product_by_id;
    }
    catch(error){
        throw error;
    }
};



//GetVariantById 

export const Get_Variant_By_Id = async(variantId: string)=>{
    try{
        const get_variant_by_id = await getVariantById(variantId);
        if(!get_variant_by_id){
             throw new Error("Variant Not Found");
        }
        return get_variant_by_id;
    }catch(error){
        throw error;
    }

};

//getVariantByProductId

export const Get_All_Variant_By_Product_Id = async(productId : string)=>{
    try{
      const get_variant_by_product_id = await getAllVariantByProductId(productId);

      if(!get_variant_by_product_id){
        return [];
      }
      return get_variant_by_product_id;

    }catch(error){
        throw error;
    }
};

