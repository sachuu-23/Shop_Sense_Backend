//6
import {UserInput} from "./auth.types";
import {findUserByEmail,createUser} from "./auth.repo";
import bcrypt from "bcrypt";
const SaltRound = 12;// this is a salt constant that doesnt change , which means a config kind of thing , this salt is important from hashing password.
export const registerUser = async (data : UserInput)=>{
    try{
        const existingUserCheck = await findUserByEmail(data.email);
     
    if(existingUserCheck){
        throw new Error("User Already Exist");
    }

    const HashPassword = await bcrypt.hash(data.password,SaltRound);

    }
}