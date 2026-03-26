//10

//So technically Zod concepts contain two things like zod schema and zod validation function which takes diff or multiple schema and then verify it.And that verification is done in authmiddleware.ts file.

import {z} from "zod";


//RegisterUser Zod Schema 
export const RegisterUserSchema = z.object({
    username : z.string().min(3,"Username must be atleast 3 character")
    .max(30,"Username shouldn't exceeds 30 character"),

    email : z.string().email().trim().toLowerCase(),

    password : z.string().min(8,"Password must be atleast 8 character").max(100,"Password shouldn't exceeds 100 character")

});


//LoginUser Zod Schema
export const LoginUserSchema = z.object({
    email : z.string().email().trim().toLowerCase(),
    password : z.string().min(8,"Password must be ateast 8 character").max(100,"Password shouldn't exceeds 100 character")
});

