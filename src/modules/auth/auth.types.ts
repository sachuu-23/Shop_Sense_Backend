 //Storage for storing all the interfaces 
 
 
 export interface UserInput{
    username : string,
    email : string,
    password : string
}

export interface refreshTokenInput{
    user_id :string,
    token_hash :string,
    expires_at : string

}