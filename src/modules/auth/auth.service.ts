//6
import {UserInput,loginInput} from "./auth.types";
import {findUserByEmail,
        createUser,
        saveRefreshToken,
        findRefreshToken,
        revokedRefreshToken} from "./auth.repo";
import bcrypt from "bcrypt";
import jwt from  "jsonwebtoken";
import crypto from "crypto";


const SaltRound = 12;
// this is a salt constant that doesnt change , which means a config kind of thing , this salt is important from hashing password.



//UserRegister ->





export const registerUser = async (data : UserInput)=>{
    try{

        //First check does the user even exist
        const existingUserCheck = await findUserByEmail(data.email);
     
    if(existingUserCheck){
        throw new Error("User Already Exist");
    }


    //there are three main concepts in auth servcie layer , which is bcrypt, jwt and crypt for refresh token genration
      

    //Then hash the password
    const HashPassword = await bcrypt.hash(data.password,SaltRound);
    

    //Create a new input, which will be passed in repo as UserInput 
    const newUserData = {
        username : data.username,
        email : data.email,
        password : HashPassword
    }
      

    //here in registersUser we will get back userId which we will use further 
    const registerUsers = await createUser(newUserData);
    const jwt_signature = jwt.sign({user_id : registerUsers.user_id},process.env.JWT_SECRET!,{expiresIn: "15m"});

    
                                                  
    //here we generate refresh token using crypto , but we never store raw token in out database , we need to hash it but using diff hashing concepts.

    const refresh_token = crypto.randomBytes(32).toString("hex");
    
    
    //return this to controller ,as this is used as refreshToken in client side and is stored in cookies , whcih is http only 

    //random bytes we choose to be 32 = 256 bits of});
//whcih outputs the data as 256 bits , so there is no use of geenrating of large values.

    const hashed_refresh_token = crypto.createHash("sha256").update(refresh_token).digest("hex");

    const expiresAt  = new Date(Date.now() + 7*24*60*60*1000);//7 days

    const Token_result = await saveRefreshToken({
        user_id : registerUsers.user_id,
        token_hash : hashed_refresh_token, 
        expires_at : expiresAt });

        return {
            accessToken : jwt_signature,
            refreshToken : refresh_token
        };


}
 catch(error){
    throw error;
}
};



//UserLogin -> 



const UserLogin = async (data:loginInput)=>{

    try{
    const loginCheck = await findUserByEmail(data.email);

    if(!loginCheck){
        throw new Error("Invlaid Credentials");
    }
    //As user exist compare the password usinh bcrypt compare

    const ComparePassword = await bcrypt.compare(data.password,loginCheck.password_hash) ;

    if(!ComparePassword){
        throw new Error("Invalid Credentials");
    }


    const jwt_signature = jwt.sign({
        user_id : loginCheck.user_id},
        process.env.JWT_SECRET!,{expiresIn : "15m"});

        const raw_refresh_token = crypto.randomBytes(32).toString("hex");

        const hashed_refresh_token = crypto.createHash("sha256").update(raw_refresh_token).digest("hex");

        const expiresAt = new Date(Date.now() + 7 * 24* 60* 60 * 1000);

        const final_token =  await saveRefreshToken({
            user_id : loginCheck.user_id,
            token_hash : hashed_refresh_token,
            expires_at : expiresAt

        });


        return {
            accessToken : jwt_signature,
            refreshToken : raw_refresh_token
        };   
    }

   catch(error){
    throw error;
   }
};




//Client need new Access Token which is JWT token
//So we need to write the function for generating new JWT token when user send raw refresh token from cookie from client side 




export const refreshAcessToken = async (RefreshToken : string)=>{
    try{
         const HashToken  = crypto.createHash("sha256").update(RefreshToken).digest("hex");

         const FindTokenInDatabase = await findRefreshToken(HashToken);//heer we will get the userid and remainig details , so we will start using this an object to use the fetaures of specific column ok.

         if(!FindTokenInDatabase){
            throw new Error("Invalid refresh Token");
         }

         if(FindTokenInDatabase.revoked){
            throw new Error("Invalid refresh Token");
         }

         if(FindTokenInDatabase.expires_at<new Date()){
            throw new Error("Invalid refresh Token");
         }

         const NewJwt = jwt.sign({
            user_id : FindTokenInDatabase.user_id
         },
         process.env.JWT_SECRET!,
          {expiresIn : "15m"}

        );

        return {
            accessToken : NewJwt
        };



    }
    catch(error){
        throw error;

    }

};



//LogoutUser ->


export const UserLogout = async(rawToken : string)=>{
    try{
        const hashToken = crypto.createHash("sha256").update(rawToken).digest("hex");

        const RevokedToken = await revokedRefreshToken(hashToken);
    }
}


























