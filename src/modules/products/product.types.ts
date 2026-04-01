//1
//We started building our product feature from this file 

export interface Product{
    product_id : string,
    product_name : string,
    product_description : string | null,
    category : string,
    is_active : boolean, 
    created_at : Date,
    updated_at : Date
};

export interface Product_Variant{
    product_variant_id : string,
    product_id : string,
    stock_keeping_unit :string,
    product_size : string | null,
    product_colour : string | null,
    product_price : number,
    is_active : boolean,
    created_at : Date,
    updated_at : Date,~;

};