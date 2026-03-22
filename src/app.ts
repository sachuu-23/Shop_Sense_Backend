//1
import express, {Request, Response} from "express";
import router from "./modules/auth/auth.routes";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json({"limit": "10kb"}));
app.use(cookieParser());

//Server check up 
app.get("/health",(req:Request,res:Response)=>{
    res.status(200).json({
        message : "Server is Active"
    })
})
app.use("/api/v1/auth", router);

export default app;



