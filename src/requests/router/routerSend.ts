import express, { Router,  Request, Response, NextFunction } from "express";
import path from "path";


export const routerSend: Router = express.Router();

routerSend.get("/",(req:Request,res:Response, next: NextFunction)=>{
    res.sendFile(path.resolve(__dirname,'..', 'public', 'index.html'),(er)=> er && console.log(er));
})



routerSend.get("/fetch/get",async (req:Request,res:Response, next: NextFunction)=>{
    res.sendFile(path.resolve(__dirname,'..', 'public', 'fetch', 'get.html'),(er)=> er && console.log(er));
})
routerSend.get("/fetch/post",async (req:Request,res:Response, next: NextFunction)=>{
    res.sendFile(path.resolve(__dirname,'..', 'public', 'fetch', 'post.html'),(er)=> er && console.log(er));
})




routerSend.get("/xhr/get",(req:Request,res:Response, next: NextFunction)=>{
    res.sendFile(path.resolve(__dirname,'..', 'public', 'xhr', 'get.html'),(er)=> er && console.log(er));
})
routerSend.get("/xhr/post",(req:Request,res:Response, next: NextFunction)=>{
    res.sendFile(path.resolve(__dirname,'..', 'public', 'xhr', 'post.html'),(er)=> er && console.log(er));
})




routerSend.get("/axios/get",(req:Request,res:Response, next: NextFunction)=>{
    res.sendFile(path.resolve(__dirname,'..', 'public', 'axios', 'get.html'),(er)=> er && console.log(er));
})

routerSend.get("/axios/post",(req:Request,res:Response, next: NextFunction)=>{
    res.sendFile(path.resolve(__dirname,'..', 'public', 'axios', 'post.html'),(er)=> er && console.log(er));
})



routerSend.get("/websocket",(req:Request,res:Response, next: NextFunction)=>{
    res.sendFile(path.resolve(__dirname,'..', 'public', 'websocket', 'index.html'),(er)=> er && console.log(er));
})




