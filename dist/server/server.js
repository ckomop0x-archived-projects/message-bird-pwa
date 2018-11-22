"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const path = require('path');
const WebSocket = require("ws");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static(path.join(__dirname, '../client')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});
//initialize a simple http server
const server = http.createServer(app);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({ extended: false });
wss.on('connection', (ws) => {
    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {
        console.log('received: %s', message);
    });
    //send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
});
app.post('/', urlencodedParser, function (request, response) {
    if (!request.body)
        return response.sendStatus(400);
    wss.clients
        .forEach(client => {
        client.send(`new message`);
    });
});
//start our server
server.listen(process.env.PORT || 8999, () => {
    // @ts-ignore
    console.log(`Server started on port ${server.address().port} :)`);
});
//# sourceMappingURL=server.js.map