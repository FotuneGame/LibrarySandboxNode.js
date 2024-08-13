import express, { Express,Router, Request, Response, NextFunction } from "express";

import {send,subscribe} from "./kafka";


const PORT = process.env.PORT || 3002;

const app:Express = express();
const router:Router = express.Router();




router.get("/",async (req:Request,res:Response,next:NextFunction)=>{
    res.send(" /produce - to send message, /sub - subscribe to event");
})
router.get("/produce",async (req:Request,res:Response,next:NextFunction)=>{
    await send();
    res.send("Send message...");
})
router.get("/sub",async (req:Request,res:Response,next:NextFunction)=>{
    const resKafka = await subscribe();
    res.send("Subscibe on event with topic... check console if you sub and send after");
})




app.use(express.json());
app.use("/",router);

app.listen(PORT, async ()=>{
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
})