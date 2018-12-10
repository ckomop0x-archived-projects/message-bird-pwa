import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
const path = require('path');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {origins: '*:*'});
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
io.set('origins', '*.*');

app.use(express.static(path.join(__dirname, '../client')));
app.use(cors());
app.get('/', cors(corsOptions), (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// const server = http.createServer(app);
// const wss = new WebSocket.Server({server});
// const urlencodedParser = bodyParser.urlencoded({extended: false});

io.on('connection', (socket: any) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('message', (message: any) => {
        console.log('Client message', message);
    });
});

// wss.on('connection', (ws: WebSocket) => {
//     ws.on('message', (message: string) => {
//         console.log('received: %s', message);
//     });
//
//     // send immediatly a feedback to the incoming connection
//     ws.send('Hi there, I am a WebSocket server');
// });

// app.post('/', urlencodedParser, (request, response) => {
//     if (!request.body) {
//         return response.sendStatus(400);
//     }
// wss.clients.forEach((client) => {
//     client.send(`new message`);
// });
// });

// start our server
server.listen(process.env.PORT || 8999, () => {
    // @ts-ignore
    console.log(`Server started on port ${server.address().port} :)`);
});
