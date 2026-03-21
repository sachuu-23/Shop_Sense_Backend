//5

import pool from "../../config/db";
//do create the interface if there are multiple things coming as an parmater in our input data
//in ts this is also called as type definition where we have to before hand defined that what kind of data is coming and only those values can come which its set in interface

import {UserInput, refreshTokenInput} from "./auth.types";


export const createUser = async (data : UserInput)=>{
    const result = await pool.query(
        `INSERT INTO users (username, email, password_hash)
        VALUES($1,$2,$3) RETURNING *`,
        [
            data.username,
            data.email,
            data.password
        ]
    );
    return result.rows[0];
};

export const findUserByEmail = async (email : string)=>{
    const result = await pool.query(
        `SELECT * FROM users 
        WHERE email = $1 `,
        [   
            email
        ]
    );//never forget to keep semicolon here 

    return result.rows[0];
};

export const findUserById = async(user_id :string)=>{
    const result = await pool.query(
        `SELECT * FROM users
        WHERE user_id = $1`,
        [
            user_id
        ]
    );
    return result.rows[0];
}


//Insert refresh token which is hashd into the rerfresh token table 
export const saveRefreshToken = async (data : refreshTokenInput)=>{
    const result = await pool.query(
        `INSERT INTO refresh_token (user_id, token_hash, expires_at)
        VALUES($1,$2,$3) RETURNING *`,
        [
            data.user_id,
            data.token_hash,
            data.expires_at

        ]
        
    );
    return result.rows[0];
};


//To find refrehtoken for regenerating access token

export const findRefreshToken = async (refresh_token : string)=>{
    const result = await pool.query(
        `SELECT * FROM refresh_token
        WHERE token_hash =$1`,
        [
            refresh_token
        ]
    );
    return result.rows[0];
};


//To revoke the token_hash from database

export const revokedRefreshToken = async (refresh_token : string) =>{
    const result = await pool.query(
        `UPDATE refresh_token
         SET revoked = True 
         WHERE token_hash = $1`,
        
        [
            refresh_token
        ]
    );
};
   

