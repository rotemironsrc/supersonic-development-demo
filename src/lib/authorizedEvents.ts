/**
 * authorizedEventEmitter.ts ** 
 * eventEmitter that omly sends events to authorized listeners.
 * The authorized listeners must be member of the accessgroups the event is emitted to to be able to receive it
 * 
 * 2019-09-19 by Ab Reitsma
 */

export type Authorization = string | Set<string>;
export type EventListener = (eventName: string, ...args: any[]) => void;

/**
 * listener to an event, contains the set of accessgroups it is member of and thus allowed to receive events from
 */
export class AuthorizedEventListener {
    private allowedAccessGroups: Set<string>;
    private listener: EventListener;

    constructor(allowedAccessGroups: Authorization, listener: EventListener) {
        this.listener = listener;
        if (typeof allowedAccessGroups === "string") {
            this.allowedAccessGroups = new Set([allowedAccessGroups])
        } else {
            this.allowedAccessGroups = <Set<string>>allowedAccessGroups;
        }
    }

    public receive(authorization: Authorization, eventName: string, ...args: any[]): boolean {
        if (typeof authorization === "string") {
            if (this.allowedAccessGroups.has(authorization)) {
                this.listener(eventName, ...args);
                return true;
            }
        }
        for (const access of authorization) {
            if (this.allowedAccessGroups.has(access)) {
                this.listener(eventName, ...args);
                return true;
            }
        }
        return false;
    }

    public grantAccess(authorization: Authorization) {
        if (typeof authorization === "string") {
            this.allowedAccessGroups.add(authorization);
        } else {
            
        }
    }

    public removeAccess(authorization: Authorization) {
        throw Error("Not implemented yet");
    }
}

/**
 * The authorized event emitter 
 */
export class AuthorizedEventEmitter {
    authorizedEvents: Map<string, Set<AuthorizedEventListener>>;

    constructor() {
        this.authorizedEvents = new Map<string, Set<AuthorizedEventListener>>();
    }

    public emit(authorization: Authorization, eventName: string, ...args: any[]) {
        let listeners = this.authorizedEvents.get(eventName);
        if (listeners) {
            for (let listener of listeners) {
                listener.receive(authorization, eventName, ...args);
            }
        }
    }

    public subscribe(listener: AuthorizedEventListener, eventName: string) {
        let listeners = this.authorizedEvents.get(eventName);
        if (listeners) {
            listeners.add(listener);
        } else { // event does not exist, create it
            this.authorizedEvents.set(eventName, new Set([listener]));
        }
    }

    public unsubscribe(listener: AuthorizedEventListener, eventName: string): boolean {
        let listeners = this.authorizedEvents.get(eventName);
        if (listeners) {
            return listeners.delete(listener);
        }
        return false;
    }
}