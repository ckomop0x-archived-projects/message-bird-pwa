"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var http = require("http");
var WebSocket = require("ws");
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, '../client')));
app.get('*', function (_req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});
var server = http.createServer(app);
var wss = new WebSocket.Server({ server: server });
var urlencodedParser = bodyParser.urlencoded({ extended: false });
wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('received: %s', message);
    });
    ws.send('Hi there, I am a WebSocket server');
});
app.post('/', urlencodedParser, function (request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }
    wss.clients.forEach(function (client) {
        client.send("new message");
    });
});
server.listen(process.env.PORT || 8999, function () {
    console.log("Server started on port " + server.address().port + " :)");
});
//# sourceMappingURL=server.js.map