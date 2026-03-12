import pool from "../../config/db";

//Interface to the data which we are rechiving or the types of data which we will receive we have to define that in out interface.
interface CreateUserInput {
    username : string,
    email  : string,
    password : string
};

//fucnction to insert the user details and mark it export , because we will call this function from other file with data.
 export const createUser = async (data : CreateUserInput)=>{
    const result = await pool.query(
        `INSERT INTO users (username,email,password_hash)
         VALUES($1,$2,$3) RETURNING *`,
         [
            data.username,
            data.email,
            data.password
         ]
    );
    return result.rows[0];
};


