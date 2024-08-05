// если вызовем то сработает блок с .on("stopped",()=>{...})
//task.stop();
import { CronosTask } from "cronosjs";

const DELEY = 1000;

const task = new CronosTask([new Date().getTime()+DELEY]);

task.on('run',(timestamp:number)=>{
    console.log(`Время начала (run) (+ задана через ${DELEY} мс): `+timestamp);
})
.on("ended",()=>{
    console.log("Конец выполнения задачи ended: "+ new Date().getTime())
})
.on('started',()=>{
    console.log("Начало выжидания задачи started: "+new Date().getTime());
})
.on("stopped",()=>{
    console.log("Остановка выжидания задачи stopped: "+new Date().getTime());
})
.start()




/// план выполнять задачу каждые 10 секунд
import { scheduleTask } from "cronosjs";

scheduleTask('*/10 * * * * *', (timestamp: number) => {
    console.log(`Задача A задача выполняется каждые 10 сек ${timestamp}`)
},{})

scheduleTask('*/1 * * * * *', (timestamp: number) => {
    console.log(`Задача Б задача выполняется каждые 1 сек ${timestamp}`)
},{})