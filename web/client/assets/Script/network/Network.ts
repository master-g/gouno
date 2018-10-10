import ProtoMessage from "../proto/ProtoMessage";
import NETWORKMGR from "../base/network/NetworkManager";
import L from "../base/log/Log";
import Listener from "../base/network/Listener";

class Network {
    private static _instance: Network;

    public static get Instance() {
        return this._instance || (this._instance = new Network());
    }

    private static TAG:string = "NIO";
    private static LOG_TAG:string = "[NIO]";

    private heartbeatTimer:number = -1;

    private listenerOnConnect:Listener[] = [];
    private listenerOnDisconnect:Listener[] = [];

    public init():void {
        // fake clien info
        ProtoMessage.clientInfo = {
            deviceType: 1, // webbrowser
            timestamp: Date.now(),
            os: "browser",
            osLocale: "en",
            appVersion: "v0.0.1",
            appLocale: "en",
            timezone: "UST+8",
            mcc: 0
        };
        ProtoMessage.uid = this.uid();

        // add callbacks
        NETWORKMGR.addConnectCallback(this, this.onConnect, Network.TAG);
        NETWORKMGR.addDisconnectCallback(this, this.onDisconnect, Network.TAG);
        NETWORKMGR.addSentCallback(this, this.onSent, Network.TAG);
        NETWORKMGR.addMessageCallback(this, this.dispatchMessage, Network.TAG);
    }

    public registerOnConnect(target:Object, func:Function, once?:boolean):void {
        this.addListener(target, func, once ? true : false, this.listenerOnConnect);
    }

    public registerOnDisconnect(target:Object, func:Function, once?:boolean):void {
        this.addListener(target, func, once ? true : false, this.listenerOnDisconnect);
    }

    public unregisterOnConnect(target:Object):void {
        this.removeListener(target, this.listenerOnConnect);
        L.d(this.listenerOnConnect);
    }

    public unregisterOnDisconnect(target:Object):void {
        this.removeListener(target, this.listenerOnDisconnect);
    }

    public unregisterAll(target:Object):void {
        this.unregisterOnConnect(target);
        this.unregisterOnDisconnect(target);
    }

    private addListener(target:Object, func:Function, once:boolean, list:Listener[]):void {
        const listener = new Listener(target, func);
        listener.userdata = once;
        list.push(listener);
    }

    private removeListener(target:Object, list:Listener[]):void {
        list.forEach(function(listener, index, array) {
            if (listener.listener == target) {
                array.splice(index, 1);
            }
        });
    }

    public conn(addr:string, cb?:Function):void {
        NETWORKMGR.conn(addr);
    }

    private auth(): void {
        const authReq = ProtoMessage.C2SHandshake("" + this.uid());
        NETWORKMGR.send(authReq);
    }

    private uid():number {
        const hashFunc = function(str: string): number {
            var hash = 0,
                i,
                chr;
            if (str.length === 0) return hash;
            for (i = 0; i < str.length; i++) {
                chr = str.charCodeAt(i);
                hash = (hash << 5) - hash + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        };
        const ua = "" + window.navigator.userAgent;
        return hashFunc(ua);
    }

    private onConnect():void {
        this.auth();
        if (this.heartbeatTimer > 0) {
            window.clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = -1;
        }
        this.heartbeatTimer = window.setInterval(function() {
            const heartbeat = ProtoMessage.C2SHeartbeat();
            NETWORKMGR.send(heartbeat);
        }, 60000);

        // invoke
        this.listenerOnConnect.forEach(function(listener, index, object) {
            listener.invoke();
            if (listener.userdata == true) {
                object.splice(index, 1);
            }
        });
    }

    private onDisconnect():void {
        if (this.heartbeatTimer > 0) {
            window.clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = -1;
        }
    }

    private onSent():void {
        ProtoMessage.Increment();
    }

    private dispatchMessage(e):void {
        L.d(Network.LOG_TAG, "TODO: dispatch message here");
        const hdr = ProtoMessage.S2CHeader(new Uint8Array(e.data));
        const msg = ProtoMessage.MapCmdToMessage(hdr.cmd, hdr.body);
        if (msg == null) {
            L.d(Network.LOG_TAG, hdr);
        } else {
            L.d(Network.LOG_TAG, msg);
        }
    }
}

const NIO = Network.Instance;
export default NIO;
