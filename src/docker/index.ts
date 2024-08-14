import express, { Express,Request,Response, Router } from "express";
import path from "path";
import fs from "fs";

const PORT = process.env.PORT || 3003;
const FILE_PATH = path.resolve(__dirname,"..","..","data","test.txt");

const app:Express = express();
const router:Router = express.Router();

router.get("/",(req:Request,res:Response)=>{
    try{
        if(!fs.existsSync(FILE_PATH)){
            fs.writeFile(FILE_PATH, new Date().toDateString(), err => {
                if (err) {
                  console.error(err);
                } else {
                  // file written successfully
                }
              });
            res.send("Wow docker container is working!!! And create file in volumes...");
        }else{
            fs.readFile(FILE_PATH, 'utf8', (err, data) => {
                if (err) {
                  console.error(err);
                  return;
                }
                res.send("Wow docker container is working!!!  File in volumes have: "+data);
              });
        }
    }catch(e){
        console.log(e);
    }
});

app.use(express.json());
app.use("/",router);

app.listen(PORT,()=>{
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});