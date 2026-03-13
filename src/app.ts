//1
import express, {Request, Response,NextFunction} from "express";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

app.use(express.json({"limit": "10kb"}));

//Server check up 
app.get("/health",(req:Request,res:Response)=>{
    res.status(200).json({
        message : "Server is Active"
    })
})
app.use("/auth", authRoutes);

export default app;



