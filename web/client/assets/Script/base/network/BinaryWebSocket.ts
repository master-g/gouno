import L from "../log/Log";

export interface SocketConfig {
    remoteAddr: string;
    maxReconnectTries: number;
    intervalBetweenRetry: number;
    jitterInterval: number;
}

export interface ISocketDelegate {
    onConnect(isReconnect:boolean):void;
    onDisconnect(): void;
    onError(e: any): void;
    onMessage(e: any): void;
}

class EmptySocketDelegate implements ISocketDelegate {
    public onConnect(isReconnect:boolean):void {
        L.d("[EmptySocketDelegate] onConnect isRetry:" + isReconnect);
    }

    public onDisconnect(): void {
        L.d("[EmptySocketDelegate] onDisconnect");
    }

    public onError(e: any): void {
        L.d("[EmptySocketDelegate] onError", e);
    }

    public onMessage(e: any): void {
        L.d("[EmptySocketDelegate] onMessage", e);
    }
}

export class BinaryWebSocket {
    private static DefaultRemoteAddr = "ws://localhost:9009/ws";
    private static DefaultMaxReconnectionTries = 15;
    private static DefaultIntervalBetweenRetries = 4000;
    private static DefaultJitterInterval = 3000;

    private socket: WebSocket;
    private config: SocketConfig;
    private retries: number;
    private retryIntervalToken: number;
    private isRetry: boolean = false;

    private _delegate: ISocketDelegate;

    public constructor(
        cfg: SocketConfig = {
            remoteAddr: BinaryWebSocket.DefaultRemoteAddr,
            maxReconnectTries: BinaryWebSocket.DefaultMaxReconnectionTries,
            intervalBetweenRetry: BinaryWebSocket.DefaultIntervalBetweenRetries,
            jitterInterval: BinaryWebSocket.DefaultJitterInterval
        }
    ) {
        this.config = cfg;
        this.retries = this.config.maxReconnectTries;
        this.delegate = null;
    }

    public set delegate(delegate: ISocketDelegate) {
        if (delegate == null) {
            this._delegate = new EmptySocketDelegate();
        } else {
            this._delegate = delegate;
        }
    }

    public conn() {
        if (this.isConnected) {
            L.w("[WS CONN] already connected");
            return;
        }

        this.socket = new WebSocket(this.config.remoteAddr);
        this.socket.binaryType = "arraybuffer";

        this.socket.onopen = this.onOpen;
        this.socket.onerror = this.onError;
        this.socket.onmessage = this.onMessage;
        this.socket.onclose = this.onClose;
    }

    public send(buf:Uint8Array): boolean {
        if (this.socket && this.isConnected) {
            this.socket.send(buf);
            return true;
        }
        L.w("[WS SEND] unable to send, socket not availabe");

        return false;
    }

    public get isConnected(): boolean {
        return this.socket && this.socket.readyState == WebSocket.OPEN;
    }

    private reconnect(): void {
        this.retries--;
        L.w("[WS RECONNECT] " + this.retries);
        if (this.retryIntervalToken) {
            window.clearInterval(this.retryIntervalToken);
        }
        this.retryIntervalToken = null;
        this.close();
        this.conn();
        this.isRetry = true;
    }

    public close(): void {
        if (!this.socket) {
            return;
        }
        this.socket.close();

        this.socket.onopen = null;
        this.socket.onerror = null;
        this.socket.onmessage = null;
        this.socket.onclose = null;

        this.socket = null;
        this.isRetry = false;
    }

    private onOpen = ():void => {
        L.w("[WS OPEN]");
        if (this.retryIntervalToken) {
            window.clearInterval(this.retryIntervalToken);
            this.retryIntervalToken = null;
        }
        this.retries = this.config.maxReconnectTries;
        this._delegate.onConnect(this.isRetry);
    }

    private onError = (e:any):void => {
        L.w("[WS ERROR]", e);
        this._delegate.onError(e);
    }

    private onMessage = (e: any): void => {
        L.w("[WS MESSAGE]", e);
        this._delegate.onMessage(e);
    }

    private onClose = (e: any): void => {
        L.w("[WS CLOSE]", e);
        this._delegate.onDisconnect();
        if (this.socket == null) {
            // close by logic, no reconnection needed
            return;
        }
        if (this.retries <= 0) {
            L.w(
                "[WS CLOSE] reach retry limits " + this.config.maxReconnectTries
            );
            return;
        }
        if (this.retryIntervalToken) {
            L.w("[WS CLOSE] already waiting for retry");
            return;
        }
        let interval = this.config.intervalBetweenRetry + Math.floor(Math.random() * Math.floor(this.config.jitterInterval));
        this.retryIntervalToken = window.setInterval(
            this.reconnect.bind(this),
            interval
        );
    }
}
