--4

--In this file we are going to write all our schema for this project , like users, prodcuts, refresh token, inventory etc , basically defiening the structure of how our data will be stored in our database and the relationship between those tables.

--USER TABLE ->

CREATE TABLE IF NOT EXISTS users(
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),--uuid are strings
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

--PRODUCT TABLE ->
CREATE TABLE IF NOT EXISTS product(
    product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT ,
    category VARCHAR(200) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),

);
--PRODUCT VARIANT TABLE 
CREATE TABLE IF EXISTS product_variant(
    product_variant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),--PRIMARY KEY FOR VARIANT TABLE
    product_id UUID REFERENCES product(product_id) ON DELETE CASCADE,
    stock_keeping_unit VARCHAR(255) UNIQUE NOT NULL,
    product_size VARCHAR(50),
    product_colour VARCHAR(50),
    product_price Numeric(10,2) NOT NULL, --HERE 2 MEANS IN PRICE AFTER . ADD JUST 2 EXTRA NUMBER eg 45,000.00
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFUALT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);