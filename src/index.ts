const readline = require('node:readline');
require("dotenv").config();
console.log(process.env.GLOBAL)


//Можно также через файл .env с dotenv
if(process.env.NODE_ENV==='production'){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    rl.question(`set library (1-cronos,2-express,other-close)`, (set:number) => {
        switch(Number(set)){
            case 1:
                console.log("Cronos js:");
                require("./cronos_test");
                break;
            case 2:
                console.log("Express:");
                require("./express");
                break;
            default:
                rl.close();
        }
    });
}

if (process.env.NODE_ENV==='development') {
    console.log("Cronos js:");
    require("./cronos_test");
    
    
    console.log("Express:");
    require("./express");
}

