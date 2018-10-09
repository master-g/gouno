const { ccclass, property } = cc._decorator;

import NETWORKMGR, { NetworkManager } from "./base/network/NetworkManager";
import ProtoMessage from "./proto/ProtoMessage";
import L from "./base/log/Log";

@ccclass
export default class UnoMain extends cc.Component {
    heartbeatHandler: number = -1;

    start() {
        // init logic
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
        ProtoMessage.uid = this.udid();
        NETWORKMGR.addConnectCallback(() => {
            this.auth();
            if (this.heartbeatHandler > 0) {
                window.clearInterval(this.heartbeatHandler);
                this.heartbeatHandler = -1;
            }
            this.heartbeatHandler = window.setInterval(function() {
                const heartbeat = ProtoMessage.C2SHeartbeat();
                NETWORKMGR.send(heartbeat);
            }, 60000);
        }, "main");

        NETWORKMGR.addDisconnectCallback(() => {
            if (this.heartbeatHandler > 0) {
                window.clearInterval(this.heartbeatHandler);
                this.heartbeatHandler = -1;
            }
        });

        NETWORKMGR.addSentCallback(() => {
            ProtoMessage.Increment();
        });

        NETWORKMGR.addMessageCallback(this.onMessage);

        NETWORKMGR.conn("ws://localhost:9009/ws");
    }

    auth(): void {
        L.d("auth");
        const authReq = ProtoMessage.C2SHandshake("the only one");
        NETWORKMGR.send(authReq);
    }

    udid(): number {
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

    onMessage(e: any): void {
        const hdr = ProtoMessage.S2CHeader(new Uint8Array(e.data));
        const msg = ProtoMessage.MapCmdToMessage(hdr.cmd, hdr.body);
        if (msg == null) {
            L.d("[MAIN]", hdr);
        } else {
            L.d("[MAIN]", msg);
        }
    }
}
