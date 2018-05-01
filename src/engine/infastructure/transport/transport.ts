const express                = require('express');
const http                   = require('http');
const io                     = require('socket.io');


export class Transport {

    constructor(){
        Transport.instance = this;
    }

    private connections     : Array<any> = [];
    private server          : any = null;
    private io              : any = null;

    public listen(port: number){
        this.server = new http.Server(express());
        this.server.listen(port, () => console.log('listening'));

        this.io = io(this.server);
        this.io.on('connection', (socket: any)=> this.onIOConnection(socket));
    }

    private onIOConnection(socket: any){
        console.log('a user connected');
        this.connections.push(socket);

        socket.on('disconnect', () => this.onSocketDisconnect(socket));
        socket.on('data', (data: any) => this.onSocketData(data));
    }

    private onSocketDisconnect(socket: any){
        console.log('a user disconnected');
        let index = this.connections.indexOf(socket);
        return index > -1 && this.connections.splice(index, 1);
    }

    private onSocketData(data: any){
        console.log('data:');
        console.log(data);
    }

    //SECTION SINGLETON -----------------------------------------------------------------------------------------------
    private static instance: Transport = null;

    static getInstance(){
        return this.instance || new Transport();
    }

}