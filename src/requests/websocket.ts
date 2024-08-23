import WebSocket from "ws";
import { createServer } from 'http';

const server = createServer();
const wss = new WebSocket.Server({server});

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.send('New client!');
    ws.on('message', function message(data) {
      console.log('received: %s', data);
      ws.send('Answer from server: "'+data+'"');
    });
    ws.on('close',()=>{
        console.log("close connetction(((")
    })
  });
  

server.listen(8080,()=>{
    console.log("[websocket server]: Websocket`s server  is running at http://localhost:8080");
});
