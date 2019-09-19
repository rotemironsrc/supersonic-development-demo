/**
 * distributedEventHandler.ts ** 
 * handles event distribution between server and (web) client
 * 
 * 2019-09-19 by Ab Reitsma
 */

import { ServerEventEmitter } from "./Events";
import { Server } from "http";

const server = new Server();

test ("basic distributed event handler exists", () => {
    expect(new ServerEventEmitter(server)).toBeDefined();
});
