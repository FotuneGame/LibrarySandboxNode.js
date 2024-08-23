import express, {Express} from "express";
import cookieParser from 'cookie-parser';
import {router} from "./router";
import "./websocket";

const app: Express = express();

app.use(cookieParser());
app.use(express.json());
app.use("/",router);

app.listen(3006,()=>{
    console.log(`[server]: Server is running at http://localhost:3006`);
});