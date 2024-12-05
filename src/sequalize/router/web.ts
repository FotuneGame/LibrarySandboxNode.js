import express, { Router,  Request, Response, NextFunction } from "express";
import path from "path";


export const web: Router = express.Router();

web.get("/",(req:Request,res:Response, next: NextFunction)=>{
    res.sendFile(path.resolve(__dirname,'..', 'public', 'index.html'),(er)=> er && console.log(er));
})