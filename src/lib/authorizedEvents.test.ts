/**
 * distributedEventHandler.ts ** 
 * handles event distribution between server and (web) client
 * 
 * 2019-09-19 by Ab Reitsma
 */

import { Authorization, AuthorizedEventEmitter, AuthorizedEventListener } from "./authorizedEvents";

let authorization1 = new Set(["access1", "access2", "access3"]);
let authorization2 = new Set(["access4", "access5", "access6"]);
let authorization3 = new Set(["access3", "access4"]);


describe("Test AuthorizedEventListener class", () => {
    test.each([
        ["access1", "access1", true],
        ["access1", authorization1, true],
        [authorization1, "access1", true],
        [authorization1, authorization3, true],
        ["access0", "access1", false],
        ["access0", authorization1, false],
        [authorization1, "access0", false],
        [authorization1, authorization2, false]
    ])
        ("should be executed when authorized (%p && %p => %s)",
            (accessListener, accessEvent, expectListenerCalled) => {
                let listenerCalled = false;
                let listener = new AuthorizedEventListener(<Authorization>accessListener, (event: string, data: any) => {
                    expect(event).toBe("event");
                    expect(data).toBe("data");
                    listenerCalled = true;
                });
                listener.receive(<Authorization>accessEvent, "event", "data");
                expect(listenerCalled).toBe(expectListenerCalled);
            });
});

describe("Test AuthorizedEventEmitter class", () => {
    test.each([
        ["access1", "access1", true, "access1", true],
        ["access1", "access1", true, "access2", false],
        ["access1", "access2", false, "access1", true],
        ["access1", "access2", false, "access2", false],
    ])
        ("should execute event \"event\" with access %p on listener1 with access %p (%s) and on listener 2 with access %p (%s)",
            (emitterAccess, listener1Access, expectListener1Called, listener2Access, expectListener2Called) => {
                let listener1Called = false;
                let listener2Called = false;
                let emitter = new AuthorizedEventEmitter();
                let listener1 = new AuthorizedEventListener(<Authorization>listener1Access, (event: string, data: any) => {
                    listener1Called = true;
                });
                let listener2 = new AuthorizedEventListener(<Authorization>listener2Access, (event: string, data: any) => {
                    listener2Called = true;
                });
                emitter.subscribe(listener1, "event");
                emitter.subscribe(listener2, "event");
                emitter.emit(<Authorization>emitterAccess, "event", "data");
                expect(listener1Called).toBe(expectListener1Called);
                expect(listener2Called).toBe(expectListener2Called);
            });

    test("a listener should only be subscribed once to an event", () => {
        let listenerCalledCount = 0;
        let emitter = new AuthorizedEventEmitter();
        let listener = new AuthorizedEventListener("access", (event: string, data: any) => {
            listenerCalledCount++;
        });
        emitter.subscribe(listener, "event");
        emitter.subscribe(listener, "event");
        emitter.emit("access", "event", "data");
        expect(listenerCalledCount).toBe(1);
    });

    test("a listener can be subscribed to multiple events", () => {
        let listenerCalledCount = 0;
        let emitter = new AuthorizedEventEmitter();
        let listener = new AuthorizedEventListener("access", (event: string, data: any) => {
            listenerCalledCount++;
        });
        emitter.subscribe(listener, "event1");
        emitter.subscribe(listener, "event2");
        emitter.emit("access", "event1", "data");
        emitter.emit("access", "event2", "data");
        expect(listenerCalledCount).toBe(2);
    });

    test("a listener can be unsubscribed from an event", () => {
        let listenerCalledCount = 0;
        let emitter = new AuthorizedEventEmitter();
        let listener = new AuthorizedEventListener("access", (event: string, data: any) => {
            listenerCalledCount++;
        });
        emitter.subscribe(listener, "event");
        emitter.emit("access", "event", "data");
        expect(listenerCalledCount).toBe(1);
        expect (emitter.unsubscribe(listener, "event")).toBe(true);
        emitter.emit("access", "event", "data");
        expect(listenerCalledCount).toBe(1);
        expect (emitter.unsubscribe(listener, "event")).toBe(false);     
    });

    test("a listener can be unsubscribed from a nonexisting event", () => {
        let emitter = new AuthorizedEventEmitter();
        let listener = new AuthorizedEventListener("access", (event: string, data: any) => {
            return;
        });
        expect (emitter.unsubscribe(listener, "nonexistingevent")).toBe(false);  
    });
});

