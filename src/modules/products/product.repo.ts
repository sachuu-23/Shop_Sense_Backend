//2

import pool from "../../config/db";
import {Product,Product_Variant} from "./product.types";


//GetAllProducts 
export const getAllProducts = async(page:number,limit:number):Promise<Product[]>=>{
    const offset  =  (page - 1) * limit;
    const result = await pool.query(
        `SELECT * FROM product 
         WHERE is_active = true
         limit $1 OFFSET $2`,
        [limit, offset]
    );
    return result.rows;
};


//GetProductById

export const getProductById = async(productId : string):Promise<Product>=>{
    const result = await pool.query(
        `SELECT product.product_id, product.product_name, product.product_description, product.category, product.is_active AS product_is_active, product.created_at AS product_created_at, product.updated_at AS product_updated_at,

         product_variant.product_variant_id, product_variant.stock_keeping_unit, product_variant.product_size, product_variant.product_colour, product_variant.product_price, product_variant.is_active AS product_variant_is_active, 

         product_variant.created_at AS product_variant_created_at,product_variant.updated_at AS product_variant_updated_at FROM product

         JOIN product_variant ON product.product_id = product_variant.product_id
         WHERE product.product_id = $1`,

       [productId]
    );
  
    //we create a new map which conatins all the rows data of variant table
    const variants = result.rows.map(row => ({
        product_variant_id : row.product_variant_id,
        product_id : row.product_id,
        stock_keeping_unit : row.stock_keeping_unit,
        product_size : row.product_size,
        product_colour : row.product_colour,
        product_price : row.product_price,
        is_active : row.product_variant_is_active,
        created_at :row.product_variant_created_at,
        updated_at : row.product_variant_updated_at

      }));


      //here insatad of reading product name , id, des from every row we just read it form rows[0] it self 
      //so we have variants of and the small product detail , so now combine them 
      const Product = {
        product_id : result.rows[0].product_id,
        product_name : result.rows[0].product_name,
        product_description : result.rows[0].product_description,
        category :result.rows[0].category,
        is_active : result.rows[0].product_is_active,
        created_at : result.rows[0].product_created_at,
        updated_at : result.rows[0].product_updated_at,
        variants : variants
      };

      return Product;

    
};  


//GetVariantsByProductId --> This function helps to get all the varniants for a product but not product details , we need this fucntion becuase when then user clicks on diff colour or diff size then we need to fetch them the variant and show them, as they are able to see only 

export const getVariantByProductId = async(productId :string) : Promise<Product_Variant[]> =>{
    const result = await pool.query(
        ` SELECT * FROM product_variant
          WHERE product_id = $1`,
          [
            productId
          ]
    );

    return result.rows;

};


//GetVariantById   --> this means given a variant id return a single variant, which means we will only return a single rows, so because of that we  have use rows[0]

export const getVariantByid = async(variantId: string) : Promise<Product_Variant>=>{
    const result = await pool.query(
        `SELECT * FROM product_variant
        WHERE product_variant_id = $1`,
        [
            variantId 
        ]
    );

    return result.rows[0];
};