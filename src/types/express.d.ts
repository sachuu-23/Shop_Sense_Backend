//In this file we are adding the defiend property inside request type of express

 declare global  {
    namespace Express{
        interface Request{
            user?:{user_id : string};

            //so we can use this user property inside the request of express
        }
    }
}
export{};