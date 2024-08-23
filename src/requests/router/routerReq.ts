import express, { Router,  Request, Response, NextFunction } from "express";


export const routerReq: Router = express.Router();

routerReq.get("/get",(req:Request,res:Response, next: NextFunction)=>{
    const {id} = req.query;

    if(!id || !Number(id))return next(console.log("id is not number!"));
    
    return res.json({info:`id: ${id} Date: ${new Date().toDateString()}`});
})


routerReq.post("/post",(req:Request,res:Response, next: NextFunction)=>{
    const {refresh_token} = req.cookies;
    const {access_token} = req.headers;
    const {id} = req.body;

    if(!id || !Number(id) || !access_token)return next(console.log("id is not number or HAVE NOT access_token!"));
      
    if(!refresh_token) 
        res.cookie("refresh_token","lol",{
            httpOnly: false, //запрет на манипуляцию с coockie js (dockument.cookie)
            secure: false, //is https?
            signed: false, // подписанныей файлы куки is https?,
            maxAge: new Date(Date.now() + 60).getTime(), // дата смерти 1 минута поосле создания
         }); //добавляем куки параметр в ответе
    return res.json({info:`id: ${id}; Date: ${new Date().toDateString()}; access:${access_token}; refresh:${refresh_token}`});
})