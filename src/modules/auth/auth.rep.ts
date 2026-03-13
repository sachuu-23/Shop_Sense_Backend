import pool from "../../config/db";
//do create the interface if there are multiple things coming as an parmater in our input data
//in ts this is also called as type definition where we have to before hand defined that what kind of data is coming and only those values can come which its set in interface

interface CreateUserByInput {
    username : string,
    email : string ,
    password : string
}

interface refreshTokenInput {
    user_id :string,
    token_hash : string,
    expires_at : string
}


export const createUser = async (data : CreateUserByInput)=>{
    const result = await pool.query(
        `INSERT INTO users (username, email, pasword_hash)
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
}