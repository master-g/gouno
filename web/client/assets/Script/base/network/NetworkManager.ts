import L from "../log/Log";
import { BinaryWebSocket, ISocketDelegate } from "./BinaryWebSocket";

export class NetworkManager implements ISocketDelegate {
    private static _instance: NetworkManager;

    public static get Instance() {
        return this._instance || (this._instance = new NetworkManager());
    }

    private socket: BinaryWebSocket;

    private static CALLBACK_CONNECT: number = 0;
    private static CALLBACK_DISCONNECT: number = 1;
    private static CALLBACK_ERROR: number = 2;
    private static CALLBACK_MESSAGE: number = 3;
    private static CALLBACK_SENT: number = 4;

    private once: Function[][];
    private callback: Function[][];

    private constructor() {
        this.once = [];
        this.callback = [];
    }

    public addConnectCallback(cb: Function, key?: string, once?: boolean): void {
        this.addCallback(NetworkManager.CALLBACK_CONNECT, once, key, cb);
    }

    public removeConnectCallback(key: string, once?: boolean): boolean {
        return this.addCallback(NetworkManager.CALLBACK_CONNECT, once, key);
    }

    public addDisconnectCallback(cb: Function, key?: string, once?: boolean): void {
        this.addCallback(NetworkManager.CALLBACK_DISCONNECT, once, key, cb);
    }

    public removeDisconnectCallback(key: string, once?: boolean): boolean {
        return this.addCallback(NetworkManager.CALLBACK_DISCONNECT, once, key);
    }

    public addErrorCallback(cb: Function, key?: string, once?: boolean): void {
        this.addCallback(NetworkManager.CALLBACK_ERROR, once, key, cb);
    }

    public removeErrorCallback(key: string, once?: boolean): boolean {
        return this.addCallback(NetworkManager.CALLBACK_ERROR, once, key);
    }

    public addMessageCallback(cb: Function, key?: string, once?: boolean): void {
        this.addCallback(NetworkManager.CALLBACK_MESSAGE, once, key, cb);
    }

    public removeMessageCallback(key: string, once?: boolean): boolean {
        return this.addCallback(NetworkManager.CALLBACK_MESSAGE, once, key);
    }

    public addSentCallback(cb: Function, key?: string, once?: boolean): void {
        this.addCallback(NetworkManager.CALLBACK_SENT, once, key, cb);
    }

    public removeSentCallback(key: string, once?: boolean): boolean {
        return this.addCallback(NetworkManager.CALLBACK_SENT, once, key);
    }

    private addCallback(type: number, isOnce: boolean, key: string, cb?: Function): boolean {
        let m = this.getCallbacks(type, isOnce);
        if (m && m[key]) {
            if (!cb) {
                // delete success
                delete (m[key])
                return true;
            }
            // replace
            L.d("[NETWORKMGR] callback with key" + key + " already exists, replace...");
        }
        // delete failed
        if (!cb) {
            return false;
        }

        // set
        m[key] = cb;
        return true;
    }

    private getCallbacks(type: number, isOnce: boolean): Map<string, Function> {
        let callbacks = null;
        if (isOnce) {
            callbacks = this.once;
        } else {
            callbacks = this.callback;
        }
        if (!callbacks[type]) {
            callbacks[type] = [];
        }

        return callbacks[type];
    }

    private calls(type: number, data?: any): void {
        const onceMap = this.once[type];
        if (onceMap) {
            for (let i in onceMap) {
                onceMap[i](data);
            }
            delete (this.once[type]);
        }

        const callMap = this.callback[type];
        if (callMap) {
            for (let i in callMap) {
                callMap[i](data);
            }
        }
    }

    public conn(remoteAddr: string): void {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
        this.socket = new BinaryWebSocket({
            remoteAddr: remoteAddr,
            maxReconnectTries: 5,
            intervalBetweenRetry: 5000,
            jitterInterval: 3000
        });

        this.socket.delegate = this;
        this.socket.conn();
    }

    public send(data: Uint8Array): boolean {
        const ok = this.socket.send(data);
        if (ok) {
            this.calls(NetworkManager.CALLBACK_SENT);
        }
        return ok;
    }

    public onConnect(isReconnect: boolean): void {
        this.calls(NetworkManager.CALLBACK_CONNECT, isReconnect);
    }

    public onDisconnect(): void {
        this.calls(NetworkManager.CALLBACK_DISCONNECT);
    }

    public onError(e: any): void {
        this.calls(NetworkManager.CALLBACK_ERROR, e);
    }

    public onMessage(e: any): void {
        this.calls(NetworkManager.CALLBACK_MESSAGE, e);
    }
}

const NETWORKMGR = NetworkManager.Instance;
export default NETWORKMGR;
