import express, {Express,Router,Request, Response, NextFunction} from "express";
import {redisConnection} from "./redis";

const PORT = process.env.PORT || 3001;

const app:Express = express();
const router:Router = express.Router();


router.get("/",async (req:Request,res:Response,next:NextFunction)=>{
    const client = await redisConnection();
    const cacheData = await client.get("variable");
    if(cacheData){
        res.send("cacheData из redis: "+cacheData);
    }else{
        res.send("cacheData пока что нет в redis((( => запишем variable:1 в redis");
        await client.set("variable",1);
    }
    await client.quit();
})

app.use(express.json());
app.use('/',router);


//Подключение к redis (перед подключением запустить redis в консоле: redis-server в ubuntu)
app.listen(PORT, async () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

