//6
import {UserInput} from "./auth.types";
import {findUserByEmail,createUser} from "./auth.repo";
import bcrypt from "bcrypt";
import jwt from  "jsonwebtoken";
const SaltRound = 12;// this is a salt constant that doesnt change , which means a config kind of thing , this salt is important from hashing password.
export const registerUser = async (data : UserInput)=>{
    try{

        //First check does the user even exist
        const existingUserCheck = await findUserByEmail(data.email);
     
    if(existingUserCheck){
        throw new Error("User Already Exist");
    }
      

    //Then hash the password
    const HashPassword = await bcrypt.hash(data.password,SaltRound);
    

    //Create a new input, which will be passed in repo as UserInput 
    const newUserData = {
        username : data.username,
        email : data.email,
        password : HashPassword
    }

    const registerUsers = await createUser(newUserData);
    const jwt_signature = jwt.sign({user_id : registerUsers.user_id},process.env.JWT_SECRET!,{expiresIn: "15m"});
}
}