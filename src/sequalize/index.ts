import express, {Express} from "express";
import sequelize from "./database";
import {router} from "./router/";

const app: Express = express();

app.use(express.json());
app.use("/",router);

app.listen(3007, async ()=>{
    console.log(__dirname  + "/models/**/*.models.ts");
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`[server]: Server is running at http://localhost:3007`);
});