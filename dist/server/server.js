"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var path = require('path');
var cors = require('cors');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server, { origins: '*:*' });
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
io.set('origins', '*.*');
app.use(express.static(path.join(__dirname, '../client')));
app.use(cors());
app.get('/', cors(corsOptions), function (_req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on("disconnect", function () {
        console.log("Client disconnected");
    });
    socket.on("message", function (message) {
        console.log("Client message", message);
    });
});
server.listen(process.env.PORT || 8999, function () {
    console.log("Server started on port " + server.address().port + " :)");
});
//# sourceMappingURL=server.js.map