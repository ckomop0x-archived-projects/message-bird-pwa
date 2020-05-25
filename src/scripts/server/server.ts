import { createServer, Server } from 'http';
import express from 'express';
import socketIo from 'socket.io';

export default class WebHooksServer {
  private app: express.Application = express();
  private port: string | number = process.env.PORT || 8999;
  private server: Server = createServer(this.app);
  private io: SocketIO.Server = socketIo(this.server);

  constructor() {
    this.listen();
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

    this.io.on('connect', (socket: socketIo.Socket) => {
      console.log('Connected client on port %s.', this.port);
      socket.on('message', (message: string) => {
        console.log('[server](message): %s', JSON.stringify(message));
        this.io.emit('message', message);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  sendMessage = (message: string): void => {
    this.io.emit('message', message);
  };

  getApp(): express.Application {
    return this.app;
  }
}
