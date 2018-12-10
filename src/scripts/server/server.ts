import {createServer, Server} from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

export default class WebHooksServer {
    private app: express.Application = express();
    private port: string | number = process.env.PORT || 8999;
    private server: Server = createServer(this.app);
    private io: SocketIO.Server = socketIo(this.server);

    constructor() {
        this.listen();
        this.sendMessage = this.sendMessage.bind(this);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);
            socket.on('message', (m: any) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    sendMessage(message: any): void {
        this.io.emit('message', message);
    }

    getApp(): express.Application {
        return this.app;
    }
}
