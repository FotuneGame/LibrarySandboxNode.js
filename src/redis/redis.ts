import {createClient} from "redis";

const setting = {
    name:"new_user",
    password:"12345",
    host:"0.0.0.0",
    port: 6379,
    db: 0 // от 0-15 штук
}


export const redisConnection = async () =>{
    return await createClient({
        //redis[s]://[[username][:password]@][host][:port][/db-number]
        url:`redis://${setting.host}:${setting.port}/${setting.db}` // для подключения без пользователя
        //url:`redis://${setting.name}:${setting.password}@${setting.host}:${setting.port}/${setting.db}`,
    })
    .on("error", (error) => console.log('Что-то пошло не так', error))
    .connect();
};
