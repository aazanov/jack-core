const express                = require('express');
const http                   = require('http');
const io                     = require('socket.io');
const SocketIOFile           = require('socket.io-file');
const app                    = express();


export class Transport {

    constructor(){
        Transport.instance = this;
    }

    private connections     : Array<any> = [];
    private server          : any = null;
    private io              : any = null;

    public listen(port: number){
        this.server = new http.Server(app);
        this.server.listen(port, () => console.log('listening'));

        this.io = io(this.server);
        this.io.on('connection', (socket: any)=> this.onIOConnection(socket));

        this.shareStatic();
    }

    private shareStatic(){
        app.use(express.static('./public'));
    }

    private onIOConnection(socket: any){
        console.log('a user connected');
        this.connections.push(socket);

        let uploader = new SocketIOFile(socket, {
            uploadDir: 'temp',
            maxFileSize: 1e7,
        });

        uploader.on('start', (fileInfo: any) => {
            console.log('Start uploading');
        });

        socket.on('disconnect', () => this.onSocketDisconnect(socket));
        socket.on('message', (message: any) => this.onSocketMessage(socket, message));
    }

    private onSocketDisconnect(socket: any){
        console.log('a user disconnected');
        let index = this.connections.indexOf(socket);
        return index > -1 && this.connections.splice(index, 1);
    }

    private onSocketMessage(socket: any, message: any){
        console.log('message:');
        console.log(message);
        message.payload = 'PONG';
        socket.emit('message', message);
    }

    //SECTION SINGLETON -----------------------------------------------------------------------------------------------
    private static instance: Transport = null;

    static getInstance(){
        return this.instance || new Transport();
    }

}