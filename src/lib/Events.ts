/**
 * distributedEventHandler.ts ** 
 * handles event distribution between server and (web) client
 * 
 * 2019-09-19 by Ab Reitsma
 */

// import socket from "socket.io";
// import { Server } from "http";
// import { EventEmitter } from "events";

// const emitter = new EventEmitter();

type AccessGroup = string | Set<string>;
type EventListener = (eventName: string, ...args: any[]) => void;

/**
 * member of an event, contains the set of accessgroups it is allowed to receive events from
 */
export class EventMember {
    public allowedAccessGroups: Set<string>;
    listener: EventListener;

    constructor(listener: EventListener, allowedAccessGroups?: Set<string>) {
        this.listener = listener;
        if (allowedAccessGroups) {
            this.allowedAccessGroups = allowedAccessGroups;
        } else {
            this.allowedAccessGroups = new Set<string>();
        }
    }

    public isMember(accessGroup: AccessGroup): boolean {
        if (typeof accessGroup === "string") {
            return this.allowedAccessGroups.has(accessGroup);
        }
        // accessGroup should be a set
        for (const member of accessGroup) {
            if (this.allowedAccessGroups.has(member)) {
                return true;
            }
        }
        return false;
    }
}

/**
 * The server event emitter 
 */
export class ServerEventEmitter {
    server: any;
    events: Map<string, EventMember[]>

    constructor(server?: any) {
        this.server = server; //socket.io server for client event distribution
    }

    public emit(accessGroup: AccessGroup, eventName: string, ...args: any[]) {
        let members = this.events.get(eventName);
        if (members) {
            for (let member of members) {
                if (member.isMember(accessGroup)) {
                    // send event
                    member.listener(eventName, ...args);
                }
            }
        }
    }

    public subscribe(member: EventMember, event: string) {
        throw new Error("Not implemented yet");
    }

    public unsubscribe(member: EventMember, event: string) {
        throw new Error("Not implemented yet");
    }
}