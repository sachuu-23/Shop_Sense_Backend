--4

--In this file we are going to write all our schema for this project , like users, prodcuts, refresh token, inventory etc , basically defiening the structure of how our data will be stored in our database and the relationship between those tables.

--USER TABLE 

CREATE TABLE IF NOT EXISTS users(
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) NOT NULL, 
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

--REFRESH TOKEN TABLE

CREATE TABLE IF NOT EXISTS refresh_token(
   refresh_token_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
   token_hash TEXT NOT NULL,
   revoked BOOLEAN DEFAULT false,--revoked becomes true if the user logout 
   expires_at TIMESTAMPTZ DEFAULT now(),
   created_at TIMESTAMPTZ DEFAULT now()
);

--PRODUCT TABLE 

CREATE TABLE IF NOT EXISTS product(
    product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_name VARCHAR(100) NOT NULL ,
    category VARCHAR(100) NOT NULL,
    product_description TEXT ,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()

);

--PRODUCT VARIANT TABLE 

CREATE TABLE IF NOT EXISTS product_variant(
    product_variant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES product(product_id) ON DELETE CASCADE,
    stock_keeping_unit VARCHAR(100) UNIQUE NOT NULL ,
    product_size VARCHAR(50),--this means it can be null or not 
    product_colour VARCHAR(50),
    product_price Numeric(10,2) NOT NULL,--here numeric(10,2 means that point left 10 digit is allowed and decimal right just 2 digit extra)
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);
--ON DELETE CASCADE MEANS IF THE SPECIFIC ID IN PARENT IS DELETED THEN DELETE HERE ALSO 
--product specifications is unique and null because for eg a product oppo f11 in its specifictaiton it will be like oppo f11, 8 gb ram , 256 gm rom and this so yeah this des should not be same with other property in the same column.