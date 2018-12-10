"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express = require("express");
var socketIo = require("socket.io");
var WebHooksServer = (function () {
    function WebHooksServer() {
        this.app = express();
        this.port = process.env.PORT || 8999;
        this.server = http_1.createServer(this.app);
        this.io = socketIo(this.server);
        this.listen();
        this.sendMessage = this.sendMessage.bind(this);
    }
    WebHooksServer.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });
        this.io.on('connect', function (socket) {
            console.log('Connected client on port %s.', _this.port);
            socket.on('message', function (m) {
                console.log('[server](message): %s', JSON.stringify(m));
                _this.io.emit('message', m);
            });
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        });
    };
    WebHooksServer.prototype.sendMessage = function (message) {
        this.io.emit('message', message);
    };
    WebHooksServer.prototype.getApp = function () {
        return this.app;
    };
    return WebHooksServer;
}());
exports.default = WebHooksServer;
//# sourceMappingURL=server.js.map