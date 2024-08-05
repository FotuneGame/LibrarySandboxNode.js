import express, { Express,Router, Request, Response,NextFunction } from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";

import errorWare from "./middleware/errorWare";
import ApiError from "./error/ApiError";




//Создание объектов для работы с express и навигацией
const port = process.env.PORT || 3000;

const app:Express = express();
const router:Router = express.Router();


//добавление к навигации путей и способов обращения к ним
router.get('/', (req:Request, res:Response, next:NextFunction) => {
    //http://localhost:3000/?id=2
    res.send('Express + TypeScript Server link 1 (id:'+req.query.id+")");
    res.end();
});
//REST API
router.get('/get', (req:Request, res:Response,next:NextFunction) => {
    next(ApiError.forbidden("Exemple","error exception get")); // при этом не изменяем res до этого
});
router.post('/post', (req:Request, res:Response,next:NextFunction) => {
    next(ApiError.forbidden("Exemple","error exception post")); // при этом не изменяем res до этого
});
router.put('/put', (req:Request, res:Response,next:NextFunction) => { // обновление объекта целиком 
    next(ApiError.forbidden("Exemple","error exception put")); // при этом не изменяем res до этого
});
router.delete('/delete', (req:Request, res:Response,next:NextFunction) => {
    next(ApiError.forbidden("Exemple","error exception delete")); // при этом не изменяем res до этого
});
//ДОП
router.patch('/post', (req:Request, res:Response,next:NextFunction) => { // обновление части объекта 
    next(ApiError.forbidden("Exemple","error exception patch")); // при этом не изменяем res до этого
});
//Для любого запроса get put delete post и т.д.
router.all('/all', (req:Request, res:Response,next:NextFunction) => {
    const FILE_NAME = "lol.txt";
    const OPTION = {
        root:path.resolve(__dirname,"public")
    }
    res.sendFile(FILE_NAME,OPTION, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', FILE_NAME);
        }
    });
});




//Использования промежуточных узлов для express сервера
const ULR_CORS = ["http://localhost:3000"]
app.use(cors({
    origin: function (origin,callback){
        if(!origin || origin && ULR_CORS.includes(origin))
            callback(null,true);
        else
            callback(ApiError.badRequest("CORS","Not allowed by CORS"));
    },
    allowedHeaders:['Authorization','Content-Type']
}));
app.use(express.json())
app.use("/static",express.static(path.join(__dirname, 'public'))); // статичные файлы (доступны get запросом)
app.use(fileUpload({createParentPath: true})); // для загрузки файлов от клента
app.use("/",router);
app.use(errorWare); // middleware ошибок (стоит в конце ОБЯЗАТЕЛЬНО)



//Включения сервера
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});