import { proto } from "./pb";
import L from "../base/log/Log";

export interface C2SHeader {
    version: number | null;
    cmd: number | null;
    seq: number | null;
    uid: number | null;
    clientInfo: ClientInfo;
    body: Uint8Array | null;
}

export interface ClientInfo {
    deviceType: number | null;
    timestamp: number | Long | null;
    os: string | null;
    osLocale: string | null;
    appVersion: string | null;
    appLocale: string | null;
    timezone: string | null;
    mcc: number | null;
}

export default class ProtoMessage {
    private static _clientInfo: ClientInfo;

    public static set clientInfo(info: ClientInfo) {
        this._clientInfo = info;
    }

    public static get clientInfo() {
        if (this._clientInfo) {
            this._clientInfo.timestamp = Date.now();
        }
        return this._clientInfo;
    }

    public static seq: number = 0;
    public static uid: number = 0;

    public static Increment(): void {
        this.seq++;
    }

    private static C2SHeader(
        cmd,
        seq,
        uid: number,
        clientInfo?: ClientInfo,
        body?: Uint8Array
    ): Uint8Array {
        const msg = proto.common.C2SHeader.create({
            version: 0,
            cmd: cmd,
            seq: seq,
            uid: uid,
            clientInfo: clientInfo || this.clientInfo,
            body: body
        });
        try {
            const buf = proto.common.C2SHeader.encode(msg).finish();
            return buf;
        } catch (e) {
            L.e(e);
        }
        return null;
    }

    public static C2SHandshake(udid: string): Uint8Array {
        const msg = new proto.common.C2SHandshakeReq({ udid: udid });
        try {
            const buf = proto.common.C2SHandshakeReq.encode(msg).finish();
            return this.C2SHeader(
                proto.common.Cmd.HANDSHAKE_REQ,
                this.seq,
                this.uid,
                this._clientInfo,
                buf
            );
        } catch (e) {
            L.e(e);
        }

        return null;
    }

    public static C2SHeartbeat(): Uint8Array {
        return this.C2SHeader(
            proto.common.Cmd.HEART_BEAT_REQ,
            this.seq,
            this.uid,
            this._clientInfo,
            null
        );
    }

    public static C2SEnterGame(): Uint8Array {
        return this.C2SHeader(
            proto.game.GameCmd.ENTER_GAME_REQ,
            this.seq,
            this.uid,
            this._clientInfo,
            null
        );
    }

    public static S2CHeader(buf: Uint8Array): proto.common.S2CHeader {
        try {
            let d = proto.common.S2CHeader.decode(buf);
            return d;
        } catch (e) {
            L.e(e);
        }
        return null;
    }

    public static MapCmdToMessage(cmd: number, body: Uint8Array): any {
        try {
            switch (cmd) {
                case proto.common.Cmd.HANDSHAKE_RESP:
                    return proto.common.S2CHandshakeResp.decode(body);
                case proto.game.GameCmd.ACTION_RESP:
                    return proto.game.S2CActionResp.decode(body);
                case proto.game.GameCmd.ENTER_GAME_RESP:
                case proto.game.GameCmd.GAME_START_NTY:
                    return proto.game.TableState.decode(body);
                case proto.game.GameCmd.GAME_OVER_NTY:
                    return proto.game.S2CGameOverNty.decode(body);
                case proto.game.GameCmd.PLAYER_JOIN_NTY:
                    return proto.game.S2CPlayerJoinNty.decode(body);
                case proto.game.GameCmd.PLAYER_LEFT_NTY:
                    return proto.game.S2CPlayerLeftNty.decode(body);
                case proto.game.GameCmd.EVENT_NTY:
                    return proto.game.S2CEventNty.decode(body);
                case proto.common.Cmd.HEART_BEAT_RESP:
                case proto.common.Cmd.KICK_NOTIFY:
                    return null;
                default:
                    L.d("unable to map cmd", cmd, `0x${cmd.toString(16)}`);
                    return null;
            }
        } catch (e) {
            L.e(e);
        }
        return null;
    }
}
