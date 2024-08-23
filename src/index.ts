const readline = require('node:readline');
require("dotenv").config();
console.log(process.env.GLOBAL)


//Можно также через файл .env с dotenv
if(process.env.NODE_ENV==='production'){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    rl.question(`set library (1-cronos, 2-express, 3-redis, 4-kafka, 5-docker, 6-requests other-close)`, (set:number) => {
        switch(Number(set)){
            case 1:
                console.log("Cronos js:");
                require("./cronos_test");
                break;
            case 2:
                console.log("Express:");
                require("./express");
                break;
            case 3:
                console.log("Redis:");
                require("./redis");
                break;
            case 4:
                console.log("Kafka:");
                require("./kafka");
                break;
            case 5:
                console.log("Docker:");
                require("./docker");
                break;
            case 6:
                console.log("Requsets:");
                require("./requests");
                break;
            default:
                rl.close();
        }
    });
}

if (process.env.NODE_ENV==='development') {
    /*
    console.log("Cronos js:");
    require("./cronos_test");
    
    
    console.log("Express:");
    require("./express");

    console.log("Redis:");
    require("./redis");

    console.log("Kafka:");
    require("./kafka");

    console.log("Docker:");
    require("./docker");
    */

    console.log("Requsets:");
    require("./requests");
}

