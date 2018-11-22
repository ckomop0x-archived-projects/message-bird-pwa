import * as express from 'express';
import * as http from 'http';
import * as WebSocketServer from 'ws';

const app = express();
var port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/'))

const server = http.createServer(app)
server.listen(port)

console.log('http server listening on %d', port)

var wss = new WebSocketServer.Server({server: server})
console.log('websocket server created on port ${server.address().port}')

wss.on('connection', function (ws) {
    var id = setInterval(function () {
        ws.send(JSON.stringify(new Date()), function () {
        })
    }, 1000)

    console.log('websocket connection open')

    ws.on('close', function () {
        console.log('websocket connection close')
        clearInterval(id)
    })
})

// //initialize a simple http server
// const server = http.createServer(app);
//
// //initialize the WebSocket server instance
// const wss = new WebSocket.Server({ server });
//
// wss.on('connection', (ws: WebSocket) => {
//
//     //connection is up, let's add a simple simple event
//     ws.on('message', (message: string) => {
//
//         //log the received message and send it back to the client
//         console.log('received: %s', message);
//
//         const broadcastRegex = /^broadcast\:/;
//
//         if (broadcastRegex.test(message)) {
//             message = message.replace(broadcastRegex, '');
//
//             //send back the message to the other clients
//             wss.clients
//                 .forEach(client => {
//                     if (client != ws) {
//                         client.send(`Hello, broadcast message -> ${message}`);
//                     }
//                 });
//
//         } else {
//             ws.send(`Hello, you sent -> ${message}`);
//         }
//     });
//
//     //send immediatly a feedback to the incoming connection
//     ws.send('Hi there, I am a WebSocket server');
// });

//start our server
server.listen(8999, () => {
    // @ts-ignore
    console.log(`Server started on port ${server.address().port} :)`);
});
