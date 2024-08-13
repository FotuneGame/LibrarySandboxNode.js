import { Kafka, logLevel } from "kafkajs";
import fs from "fs";

//Брокер запускаю в ubuntu 
const kafka = new Kafka({
    clientId: 'some-identificator-app',
    brokers: ['localhost:9092'], // экзепляры kafka = брокер
    logLevel: logLevel.ERROR,
    /*
    ssl: {
        rejectUnauthorized: false,
        ca: [fs.readFileSync('/my/custom/ca.crt', 'utf-8')],
        key: fs.readFileSync('/my/custom/client-key.pem', 'utf-8'),
        cert: fs.readFileSync('/my/custom/client-cert.pem', 'utf-8')
      },
    */
})




//для отправителя
export const send = async () =>{
    const producer = kafka.producer();
    await producer.connect()
    await producer.send({
      topic: 'some-topic', //тема
      messages: [
        { 
            //необходимо настроить кол-во разделов на сервере с kafka
            partition:0, //выбор в какую раздел отправить (очередь) для защиты топика от переполнения + постоянное копирование данных во избежание их потери
            key:"some key for find", //key - Используется для разбиения на разделы
            value: JSON.stringify({ some: 'data' }),
            headers: {
                'system-id': 'my-system',
            } //доп мета данные
        },
      ],
    })
    
    await producer.disconnect()
}




// Для получателя
export const subscribe = async () =>{
    const consumer = kafka.consumer({ groupId: 'some-group',heartbeatInterval:1000 }) //groupId - Группа потребителей, heartbeatInterval - интервал работы проверки сообщений
    await consumer.connect()
    await consumer.subscribe({ topic: 'some-topic', fromBeginning: true }) // fromBeginning - Смещение, т.е при true сообщения получат все потребители, при false только один, кто первый получил
    // topics - массив заголовков, fromBeginning - Можно начать с начала темы
    //await consumer.subscribe({ topics: ['topic-B', 'topic-C'], fromBeginning: true })
    await consumer.run({
        //eachBatch - для работы с пакетом сообщений 
        //partitionsConsumedConcurrently: 3 - для распараллеливания (3 сообщения за раз а не 1)
        eachMessage: async ({ topic, partition, message }) => {
          if(!message.value || !message.headers) return;
          console.log({
            topic:topic,
            partition:partition,
            value: JSON.parse(message.value.toString()),
            header: message.headers['system-id']?.toString()
          })
        },
      })
}

//При повтороной подписки с одного и того же адресса будет ошибка перебалансировки //The group is rebalancing, so a rejoin is needed 