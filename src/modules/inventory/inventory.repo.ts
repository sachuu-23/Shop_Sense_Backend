//2 

//In this file we need to handle how inventory features is being manipulated.

import {Inventory,ReserveStockInput} from "./inventory.types";
import pool from "../../config/db";


//Get Invenotry By Id
//This get us the details and everything about current variantid product 
export const getInventoryById = async(variantId : string) : Promise<Inventory | null>=>{
    const result = await pool.query(`SELECT inventory_id, product_variant_id, available_qty, reserved_qty, updated_at FROM inventory
    WHERE product_variant_id = $1`,
    [
        variantId 
    ]
);

return result.rows[0] ?? null ;//if left is null or undefined then return right one
};




//Reserve Stock 
//This function helps us in locking a specific vavriant row, for a specific user, so that nmo other client can access this variant row in database 
export const reserveStock = async(quantity:number,variantId : string) : Promise<void>=>{
    try{
        await pool.query(`BEGIN`);
        const result = await pool.query(`SELECT product_variant_id,available_qty FROM inventory WHERE product_variant_id = $1
            FOR UPDATE`,
        [
           variantId 
        ]);
        const AvailableQty = result.rows[0].available_qty;
          if(AvailableQty < quantity){
            throw new Error("Insufficient Stock");
          }
            await pool.query(`
            UPDATE inventory 
            SET available_qty = available_qty - $1,
            reserved_qty = reserved_qty + $1
            WHERE product_variant_id = $2
            `,
            [
                quantity,
                variantId
               
            ]);
            await pool.query(`COMMIT`);
        }
        catch(error){
            await pool.query(`ROLLBACK`);
            throw error;
        }

};



// 