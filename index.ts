//2

import dotenv from "dotenv";
dotenv.config();
import app from "./src/app";

//Dotenv help us in reading the .env file


const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});