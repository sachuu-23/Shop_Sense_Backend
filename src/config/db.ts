//this pool helps us in building multiple conneciton with database , just like connections are there come use and this connection will be idle after the use.
import {Pool} from "pg";    

const pool = new Pool({
    user : process.env.POSTGRES_USER,
    host : process.env.POSTGRES_HOST,
    database : process.env.POSTGRES_DATABASE,
    password :process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT)
    //in port number because in env its like string ,but here want number so we do need to convert it 
});