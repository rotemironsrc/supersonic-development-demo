/**
 * distributedEventHandler.ts ** 
 * handles event distribution between server and (web) client
 * 
 * 2019-09-19 by Ab Reitsma
 */

import socket from "socket.io";
import { Server } from "http";

export class DistributedEventHandler {
    io: socket.Server;
    constructor(server: Server) {
        this.io = socket(server);
    }

    emit(message: any, channel: any) {
        throw new Error("Not implemented yet");
    }

    subscribe(endpoint: any, channel: any) {
        throw new Error("Not implemented yet");
    }

    unsubscribe(endpoint: any, channel: any) {
        throw new Error("Not implemented yet");
    }

    connect(endpoint: any) {
        throw new Error("Not implemented yet");
    }

    disconnect(endpoint: any) {
        throw new Error("Not implemented yet");
    }
}