import ProtoMessage from "../proto/ProtoMessage";
import NETWORKMGR from "../base/network/NetworkManager";
import L from "../base/log/Log";
import Listener from "../base/network/Listener";
import { proto } from "../proto/pb";

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
    private listenerMessage:Listener[][] = [];

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

    public registerOnNotify(cmd:number, target:Object, func:Function, once?:boolean):void {
        const listener = new Listener(target, func);
        listener.userdata = once ? true : false;
        if (!this.listenerMessage[cmd]) {
            this.listenerMessage[cmd] = [];
        }
        this.listenerMessage[cmd].push(listener);
    }

    public unregisterOnNotify(target:Object, cmd?:number):void {
        for (let c in this.listenerMessage) {
            if (cmd && c != ""+cmd) {
                continue;
            }
            const listeners = this.listenerMessage[c];
            listeners.forEach(function(listener, index, arr) {
                if (listener.listener == listener) {
                    arr.splice(index, 1);
                }
            });
        }
    }

    public unregisterAll(target:Object):void {
        this.unregisterOnConnect(target);
        this.unregisterOnDisconnect(target);
        this.unregisterOnNotify(target);
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

    public sendEnterGame(target:Object, func:Function):void {
        this.registerOnNotify(proto.game.GameCmd.ENTER_GAME_RESP, target, func, true);
        const enterReq = ProtoMessage.C2SEnterGame();
        NETWORKMGR.send(enterReq);
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

        this.unregisterOnNotify(this, proto.common.Cmd.HEART_BEAT_RESP);
        this.registerOnNotify(proto.common.Cmd.HEART_BEAT_RESP, this, ()=> {
            L.d(Network.LOG_TAG + " HEARTBEAT");
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

    private dispatchMessage(e:any):void {
        if (!e || !e.data) {
            L.d(Network.LOG_TAG, "unable to dispatch empty message");
            return;
        }

        let hdr = ProtoMessage.S2CHeader(new Uint8Array(e.data));
        let msg = null;
        if (hdr) {
            msg = ProtoMessage.MapCmdToMessage(hdr.cmd, hdr.body);
        } else {
            L.e(Network.LOG_TAG, "failed to parse header");
            return;
        }

        const cmdListeners = this.listenerMessage[hdr.cmd];
        if (!cmdListeners) {
            L.d(Network.LOG_TAG, "no listener for", hdr.cmd, `0x${hdr.cmd.toString(16)}`);
            return;
        }

        cmdListeners.forEach(function(l, i, a) {
            l.invoke(hdr, msg);
            if (l.userdata) {
                a.splice(i, 1);
            }
        })
    }
}

const NIO = Network.Instance;
export default NIO;
