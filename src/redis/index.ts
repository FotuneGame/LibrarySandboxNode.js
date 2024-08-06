import express, {Express,Router,Request, Response, NextFunction} from "express";
import redis from "redis";

const PORT = process.env.PORT || 3001;

const app:Express = express();
const router:Router = express.Router();


app.use(express.json());
app.use('/',router);


//https://habr.com/ru/articles/821363/
//Подключение к redis (перед подключением запустить redis в консоле: redis-server в ubuntu)
(async () => {
    const client = redis.createClient();
  
    client.on("error", (error) => console.log('Что-то пошло не так', error)); // вешаем хук на ошибку подключения к серверу Redis
  
    await client.connect(); // подключаемся к серверу
})();

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});