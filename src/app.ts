//1
import express, {Request, Response} from "express";
import authRouter from "./modules/auth/auth.routes";
import productRouter from "./modules/products/product.routes";
import cookieParser from "cookie-parser";
const app = express();;

app.use(express.json({"limit": "10kb"}));
app.use(cookieParser());

//Server check up 
app.get("/health",(req:Request,res:Response)=>{
    res.status(200).json({
        message : "Server is Active"
    })
})
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products",productRouter);
app.use("/api/v1/variants",productRouter);

export default app;



