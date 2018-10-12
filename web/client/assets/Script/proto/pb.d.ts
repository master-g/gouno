import * as $protobuf from "protobufjs";
/** Namespace proto. */
export namespace proto {

    /** Namespace common. */
    namespace common {

        /** Cmd enum. */
        enum Cmd {
            RESERVED = 0,
            HEART_BEAT_REQ = 4097,
            HEART_BEAT_RESP = 4098,
            KICK_NOTIFY = 4100,
            HANDSHAKE_REQ = 4113,
            HANDSHAKE_RESP = 4114,
            LOGOUT_REQ = 4131,
            LOGOUT_RESP = 4132,
            OFFLINE_REQ = 4231,
            PING_REQ = 4241,
            PING_RESP = 4242,
            CMD_COMMON_END = 8192
        }

        /** StatusCode enum. */
        enum StatusCode {
            STATUS_OK = 0,
            STATUS_INVALID = 4000,
            STATUS_UNAUTH = 4001,
            STATUS_UNKNOWN_CMD = 4004,
            STATUS_TIMEOUT = 4008,
            STATUS_TOO_MANY_REQ = 4029,
            STATUS_INTERNAL_ERROR = 5000,
            STATUS_UNAVAILABLE = 5003
        }

        /** Gender enum. */
        enum Gender {
            GENDER_UNKNOWN = 0,
            GENDER_FEMALE = 1,
            GENDER_MALE = 2
        }

        /** AccountStatus enum. */
        enum AccountStatus {
            ACCOUNT_STATUS_NORMAL = 0,
            ACCOUNT_STATUS_RESTRICTED = 1,
            ACCOUNT_STATUS_BANNED = 2,
            ACCOUNT_STATUS_DELETED = 4,
            ACCOUNT_STATUS_BOT = 8,
            ACCOUNT_STATUS_OFFICIAL = 16
        }

        /** DeviceType enum. */
        enum DeviceType {
            DEVICE_TYPE_UNKNOWN = 0,
            DEVICE_TYPE_BROWSER = 1,
            DEVICE_TYPE_IOS = 2,
            DEVICE_TYPE_ANDROID = 3
        }

        /** Properties of a C2SHeader. */
        interface IC2SHeader {

            /** C2SHeader version */
            version?: (number|null);

            /** C2SHeader cmd */
            cmd?: (number|null);

            /** C2SHeader seq */
            seq?: (number|Long|null);

            /** C2SHeader uid */
            uid?: (number|Long|null);

            /** C2SHeader clientInfo */
            clientInfo?: (proto.common.IClientInfo|null);

            /** C2SHeader body */
            body?: (Uint8Array|null);
        }

        /** Represents a C2SHeader. */
        class C2SHeader implements IC2SHeader {

            /**
             * Constructs a new C2SHeader.
             * @param [properties] Properties to set
             */
            constructor(properties?: proto.common.IC2SHeader);

            /** C2SHeader version. */
            public version: number;

            /** C2SHeader cmd. */
            public cmd: number;

            /** C2SHeader seq. */
            public seq: (number|Long);

            /** C2SHeader uid. */
            public uid: (number|Long);

            /** C2SHeader clientInfo. */
            public clientInfo?: (proto.common.IClientInfo|null);

            /** C2SHeader body. */
            public body: Uint8Array;

            /**
             * Creates a new C2SHeader instance using the specified properties.
             * @param [properties] Properties to set
             * @returns C2SHeader instance
             */
            public static create(properties?: proto.common.IC2SHeader): proto.common.C2SHeader;

            /**
             * Encodes the specified C2SHeader message. Does not implicitly {@link proto.common.C2SHeader.verify|verify} messages.
             * @param message C2SHeader message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: proto.common.IC2SHeader, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified C2SHeader message, length delimited. Does not implicitly {@link proto.common.C2SHeader.verify|verify} messages.
             * @param message C2SHeader message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: proto.common.IC2SHeader, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a C2SHeader message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns C2SHeader
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.common.C2SHeader;

            /**
             * Decodes a C2SHeader message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns C2SHeader
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.common.C2SHeader;

            /**
             * Verifies a C2SHeader message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a C2SHeader message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns C2SHeader
             */
            public static fromObject(object: { [k: string]: any }): proto.common.C2SHeader;

            /**
             * Creates a plain object from a C2SHeader message. Also converts values to other types if specified.
             * @param message C2SHeader
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: proto.common.C2SHeader, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this C2SHeader to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a S2CHeader. */
        interface IS2CHeader {

            /** S2CHeader cmd */
            cmd?: (number|null);

            /** S2CHeader seq */
            seq?: (number|Long|null);

            /** S2CHeader status */
            status?: (number|null);

            /** S2CHeader timestamp */
            timestamp?: (number|Long|null);

            /** S2CHeader msg */
            msg?: (string|null);

            /** S2CHeader body */
            body?: (Uint8Array|null);
        }

        /** Represents a S2CHeader. */
        class S2CHeader implements IS2CHeader {

            /**
             * Constructs a new S2CHeader.
             * @param [properties] Properties to set
             */
            constructor(properties?: proto.common.IS2CHeader);

            /** S2CHeader cmd. */
            public cmd: number;

            /** S2CHeader seq. */
            public seq: (number|Long);

            /** S2CHeader status. */
            public status: number;

            /** S2CHeader timestamp. */
            public timestamp: (number|Long);

            /** S2CHeader msg. */
            public msg: string;

            /** S2CHeader body. */
            public body: Uint8Array;

            /**
             * Creates a new S2CHeader instance using the specified properties.
             * @param [properties] Properties to set
             * @returns S2CHeader instance
             */
            public static create(properties?: proto.common.IS2CHeader): proto.common.S2CHeader;

            /**
             * Encodes the specified S2CHeader message. Does not implicitly {@link proto.common.S2CHeader.verify|verify} messages.
             * @param message S2CHeader message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: proto.common.IS2CHeader, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified S2CHeader message, length delimited. Does not implicitly {@link proto.common.S2CHeader.verify|verify} messages.
             * @param message S2CHeader message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: proto.common.IS2CHeader, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a S2CHeader message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns S2CHeader
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.common.S2CHeader;

            /**
             * Decodes a S2CHeader message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns S2CHeader
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.common.S2CHeader;

            /**
             * Verifies a S2CHeader message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a S2CHeader message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns S2CHeader
             */
            public static fromObject(object: { [k: string]: any }): proto.common.S2CHeader;

            /**
             * Creates a plain object from a S2CHeader message. Also converts values to other types if specified.
             * @param message S2CHeader
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: proto.common.S2CHeader, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this S2CHeader to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ClientInfo. */
        interface IClientInfo {

            /** ClientInfo deviceType */
            deviceType?: (number|null);

            /** ClientInfo timestamp */
            timestamp?: (number|Long|null);

            /** ClientInfo os */
            os?: (string|null);

            /** ClientInfo osLocale */
            osLocale?: (string|null);

            /** ClientInfo appVersion */
            appVersion?: (string|null);

            /** ClientInfo appLocale */
            appLocale?: (string|null);

            /** ClientInfo timezone */
            timezone?: (string|null);

            /** ClientInfo mcc */
            mcc?: (number|null);
        }

        /** Represents a ClientInfo. */
        class ClientInfo implements IClientInfo {

            /**
             * Constructs a new ClientInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: proto.common.IClientInfo);

            /** ClientInfo deviceType. */
            public deviceType: number;

            /** ClientInfo timestamp. */
            public timestamp: (number|Long);

            /** ClientInfo os. */
            public os: string;

            /** ClientInfo osLocale. */
            public osLocale: string;

            /** ClientInfo appVersion. */
            public appVersion: string;

            /** ClientInfo appLocale. */
            public appLocale: string;

            /** ClientInfo timezone. */
            public timezone: string;

            /** ClientInfo mcc. */
            public mcc: number;

            /**
             * Creates a new ClientInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ClientInfo instance
             */
            public static create(properties?: proto.common.IClientInfo): proto.common.ClientInfo;

            /**
             * Encodes the specified ClientInfo message. Does not implicitly {@link proto.common.ClientInfo.verify|verify} messages.
             * @param message ClientInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: proto.common.IClientInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ClientInfo message, length delimited. Does not implicitly {@link proto.common.ClientInfo.verify|verify} messages.
             * @param message ClientInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: proto.common.IClientInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ClientInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ClientInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.common.ClientInfo;

            /**
             * Decodes a ClientInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ClientInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.common.ClientInfo;

            /**
             * Verifies a ClientInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ClientInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ClientInfo
             */
            public static fromObject(object: { [k: string]: any }): proto.common.ClientInfo;

            /**
             * Creates a plain object from a ClientInfo message. Also converts values to other types if specified.
             * @param message ClientInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: proto.common.ClientInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ClientInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a C2SHandshakeReq. */
        interface IC2SHandshakeReq {

            /** C2SHandshakeReq udid */
            udid?: (string|null);
        }

        /** Represents a C2SHandshakeReq. */
        class C2SHandshakeReq implements IC2SHandshakeReq {

            /**
             * Constructs a new C2SHandshakeReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: proto.common.IC2SHandshakeReq);

            /** C2SHandshakeReq udid. */
            public udid: string;

            /**
             * Creates a new C2SHandshakeReq instance using the specified properties.
             * @param [properties] Properties to set
             * @returns C2SHandshakeReq instance
             */
            public static create(properties?: proto.common.IC2SHandshakeReq): proto.common.C2SHandshakeReq;

            /**
             * Encodes the specified C2SHandshakeReq message. Does not implicitly {@link proto.common.C2SHandshakeReq.verify|verify} messages.
             * @param message C2SHandshakeReq message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: proto.common.IC2SHandshakeReq, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified C2SHandshakeReq message, length delimited. Does not implicitly {@link proto.common.C2SHandshakeReq.verify|verify} messages.
             * @param message C2SHandshakeReq message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: proto.common.IC2SHandshakeReq, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a C2SHandshakeReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns C2SHandshakeReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.common.C2SHandshakeReq;

            /**
             * Decodes a C2SHandshakeReq message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns C2SHandshakeReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.common.C2SHandshakeReq;

            /**
             * Verifies a C2SHandshakeReq message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a C2SHandshakeReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns C2SHandshakeReq
             */
            public static fromObject(object: { [k: string]: any }): proto.common.C2SHandshakeReq;

            /**
             * Creates a plain object from a C2SHandshakeReq message. Also converts values to other types if specified.
             * @param message C2SHandshakeReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: proto.common.C2SHandshakeReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this C2SHandshakeReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a S2CHandshakeResp. */
        interface IS2CHandshakeResp {

            /** S2CHandshakeResp token */
            token?: (string|null);
        }

        /** Represents a S2CHandshakeResp. */
        class S2CHandshakeResp implements IS2CHandshakeResp {

            /**
             * Constructs a new S2CHandshakeResp.
             * @param [properties] Properties to set
             */
            constructor(properties?: proto.common.IS2CHandshakeResp);

            /** S2CHandshakeResp token. */
            public token: string;

            /**
             * Creates a new S2CHandshakeResp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns S2CHandshakeResp instance
             */
            public static create(properties?: proto.common.IS2CHandshakeResp): proto.common.S2CHandshakeResp;

            /**
             * Encodes the specified S2CHandshakeResp message. Does not implicitly {@link proto.common.S2CHandshakeResp.verify|verify} messages.
             * @param message S2CHandshakeResp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: proto.common.IS2CHandshakeResp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified S2CHandshakeResp message, length delimited. Does not implicitly {@link proto.common.S2CHandshakeResp.verify|verify} messages.
             * @param message S2CHandshakeResp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: proto.common.IS2CHandshakeResp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a S2CHandshakeResp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns S2CHandshakeResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.common.S2CHandshakeResp;

            /**
             * Decodes a S2CHandshakeResp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns S2CHandshakeResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.common.S2CHandshakeResp;

            /**
             * Verifies a S2CHandshakeResp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a S2CHandshakeResp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns S2CHandshakeResp
             */
            public static fromObject(object: { [k: string]: any }): proto.common.S2CHandshakeResp;

            /**
             * Creates a plain object from a S2CHandshakeResp message. Also converts values to other types if specified.
             * @param message S2CHandshakeResp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: proto.common.S2CHandshakeResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this S2CHandshakeResp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** KickReason enum. */
        enum KickReason {
            KICK_NO_REASON = 0,
            KICK_LOGIN_ELSEWHERE = 1,
            KICK_SESSION_EXPIRED = 2,
            KICK_ILLEGAL_OPERATION = 3,
            KICK_BANNED = 4
        }

        /** Properties of a S2CKickNotify. */
        interface IS2CKickNotify {

            /** S2CKickNotify reason */
            reason?: (proto.common.KickReason|null);

            /** S2CKickNotify msg */
            msg?: (string|null);
        }

        /** Represents a S2CKickNotify. */
        class S2CKickNotify implements IS2CKickNotify {

            /**
             * Constructs a new S2CKickNotify.
             * @param [properties] Properties to set
             */
            constructor(properties?: proto.common.IS2CKickNotify);

            /** S2CKickNotify reason. */
            public reason: proto.common.KickReason;

            /** S2CKickNotify msg. */
            public msg: string;

            /**
             * Creates a new S2CKickNotify instance using the specified properties.
             * @param [properties] Properties to set
             * @returns S2CKickNotify instance
             */
            public static create(properties?: proto.common.IS2CKickNotify): proto.common.S2CKickNotify;

            /**
             * Encodes the specified S2CKickNotify message. Does not implicitly {@link proto.common.S2CKickNotify.verify|verify} messages.
             * @param message S2CKickNotify message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: proto.common.IS2CKickNotify, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified S2CKickNotify message, length delimited. Does not implicitly {@link proto.common.S2CKickNotify.verify|verify} messages.
             * @param message S2CKickNotify message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: proto.common.IS2CKickNotify, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a S2CKickNotify message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns S2CKickNotify
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.common.S2CKickNotify;

            /**
             * Decodes a S2CKickNotify message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns S2CKickNotify
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.common.S2CKickNotify;

            /**
             * Verifies a S2CKickNotify message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a S2CKickNotify message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns S2CKickNotify
             */
            public static fromObject(object: { [k: string]: any }): proto.common.S2CKickNotify;

            /**
             * Creates a plain object from a S2CKickNotify message. Also converts values to other types if specified.
             * @param message S2CKickNotify
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: proto.common.S2CKickNotify, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this S2CKickNotify to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Namespace game. */
    namespace game {

        /** GameCmd enum. */
        enum GameCmd {
            GAME_RESERVED = 0,
            ENTER_GAME_REQ = 8193,
            ENTER_GAME_RESP = 8194,
            ACTION_REQ = 8195,
            ACTION_RESP = 8196,
            EVENT_NTY = 8198,
            PLAYER_JOIN_NTY = 8200,
            PLAYER_LEFT_NTY = 8202,
            GAME_START_NTY = 8204,
            GAME_OVER_NTY = 8206
        }

        /** Event enum. */
        enum Event {
            EVENT_RESERVED = 0,
            EVENT_TURN = 1,
            EVENT_PLAY = 2,
            EVENT_UNO_PLAY = 3,
            EVENT_DRAW = 4,
            EVENT_KEEP = 5,
            EVENT_SKIP = 6,
            EVENT_CHALLENGE = 7,
            EVENT_CHALLENGE_PENALTY = 8,
            EVENT_TIMEOUT = 9,
            EVENT_DECK_SHUFFLE = 10,
            EVENT_REVERSE = 11
        }

        /** Action enum. */
        enum Action {
            ACTION_RESERVED = 0,
            ACTION_PLAY = 1,
            ACTION_UNO_PLAY = 2,
            ACTION_DRAW = 3,
            ACTION_KEEP = 4,
            ACTION_CHALLENGE = 5,
            ACTION_ACCEPT = 6
        }

        /** ActionResult enum. */
        enum ActionResult {
            ACTION_RESULT_OK = 0,
            ACTION_RESULT_GAME_NOT_START = 1,
            ACTION_RESULT_NOT_TURN = 2,
            ACTION_RESULT_CARD_NOT_EXIST = 3,
            ACTION_RESULT_NOT_DRAW_CARD = 4,
            ACTION_RESULT_NEED_COLOR = 5,
            ACTION_RESULT_INVALID = 6
        }

        /** CardColor enum. */
        enum CardColor {
            COLOR_WILD = 0,
            COLOR_RED = 16,
            COLOR_YELLOW = 32,
            COLOR_BLUE = 48,
            COLOR_GREEN = 64
        }

        /** PlayerStatus enum. */
        enum PlayerStatus {
            STATUS_DEFAULT = 0,
            STATUS_UNO = 1,
            STATUS_DRAW = 2,
            STATUS_CHALLENGE = 4
        }

        /** Properties of an UnoPlayer. */
        interface IUnoPlayer {

            /** UnoPlayer uid */
            uid?: (number|Long|null);

            /** UnoPlayer status */
            status?: (number|null);

            /** UnoPlayer cards */
            cards?: (Uint8Array|null);

            /** UnoPlayer score */
            score?: (number|null);
        }

        /** Represents an UnoPlayer. */
        class UnoPlayer implements IUnoPlayer {

            /**
             * Constructs a new UnoPlayer.
             * @param [properties] Properties to set
             */
            constructor(properties?: proto.game.IUnoPlayer);

            /** UnoPlayer uid. */
            public uid: (number|Long);

            /** UnoPlayer status. */
            public status: number;

            /** UnoPlayer cards. */
            public cards: Uint8Array;

            /** UnoPlayer score. */
            public score: number;

            /**
             * Creates a new UnoPlayer instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UnoPlayer instance
             */
            public static create(properties?: proto.game.IUnoPlayer): proto.game.UnoPlayer;

            /**
             * Encodes the specified UnoPlayer message. Does not implicitly {@link proto.game.UnoPlayer.verify|verify} messages.
             * @param message UnoPlayer message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: proto.game.IUnoPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UnoPlayer message, length delimited. Does not implicitly {@link proto.game.UnoPlayer.verify|verify} messages.
             * @param message UnoPlayer message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: proto.game.IUnoPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an UnoPlayer message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UnoPlayer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.game.UnoPlayer;

            /**
             * Decodes an UnoPlayer message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UnoPlayer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.game.UnoPlayer;

            /**
             * Verifies an UnoPlayer message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an UnoPlayer message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UnoPlayer
             */
            public static fromObject(object: { [k: string]: any }): proto.game.UnoPlayer;

            /**
             * Creates a plain object from an UnoPlayer message. Also converts values to other types if specified.
             * @param message UnoPlayer
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: proto.game.UnoPlayer, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UnoPlayer to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** TableStatus enum. */
        enum TableStatus {
            STATUS_IDLE = 0,
            STATUS_WAIT = 1,
            STATUS_PLAYING = 2,
            STATUS_GAME_OVER = 3
        }

        /** Properties of a TableState. */
        interface ITableState {

            /** TableState tid */
            tid?: (number|Long|null);

            /** TableState status */
            status?: (proto.game.TableStatus|null);

            /** TableState timeout */
            timeout?: (number|null);

            /** TableState timeLeft */
            timeLeft?: (number|null);

            /** TableState clockwise */
            clockwise?: (boolean|null);

            /** TableState color */
            color?: (number|null);

            /** TableState challengeColor */
            challengeColor?: (number|null);

            /** TableState lastPlayer */
            lastPlayer?: (number|Long|null);

            /** TableState currentPlayer */
            currentPlayer?: (number|Long|null);

            /** TableState cardsLeft */
            cardsLeft?: (number|null);

            /** TableState discardPile */
            discardPile?: (Uint8Array|null);

            /** TableState players */
            players?: (proto.game.IUnoPlayer[]|null);
        }

        /** Represents a TableState. */
        class TableState implements ITableState {

            /**
             * Constructs a new TableState.
             * @param [properties] Properties to set
             */
            constructor(properties?: proto.game.ITableState);

            /** TableState tid. */
            public tid: (number|Long);

            /** TableState status. */
            public status: proto.game.TableStatus;

            /** TableState timeout. */
            public timeout: number;

            /** TableState timeLeft. */
            public timeLeft: number;

            /** TableState clockwise. */
            public clockwise: boolean;

            /** TableState color. */
            public color: number;

            /** TableState challengeColor. */
            public challengeColor: number;

            /** TableState lastPlayer. */
            public lastPlayer: (number|Long);

            /** TableState currentPlayer. */
            public currentPlayer: (number|Long);

            /** TableState cardsLeft. */
            public cardsLeft: number;

            /** TableState discardPile. */
            public discardPile: Uint8Array;

            /** TableState players. */
            public players: proto.game.IUnoPlayer[];

            /**
             * Creates a new TableState instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TableState instance
             */
            public static create(properties?: proto.game.ITableState): proto.game.TableState;

            /**
             * Encodes the specified TableState message. Does not implicitly {@link proto.game.TableState.verify|verify} messages.
             * @param message TableState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: proto.game.ITableState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TableState message, length delimited. Does not implicitly {@link proto.game.TableState.verify|verify} messages.
             * @param message TableState message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: proto.game.ITableState, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TableState message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TableState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.game.TableState;

            /**
             * Decodes a TableState message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TableState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.game.TableState;

            /**
             * Verifies a TableState message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TableState message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TableState
             */
            public static fromObject(object: { [k: string]: any }): proto.game.TableState;

            /**
             * Creates a plain object from a TableState message. Also converts values to other types if specified.
             * @param message TableState
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: proto.game.TableState, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TableState to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a S2CPlayerJoinNty. */
        interface IS2CPlayerJoinNty {

            /** S2CPlayerJoinNty uid */
            uid?: (number|Long|null);
        }

        /** Represents a S2CPlayerJoinNty. */
        class S2CPlayerJoinNty implements IS2CPlayerJoinNty {

            /**
             * Constructs a new S2CPlayerJoinNty.
             * @param [properties] Properties to set
             */
            constructor(properties?: proto.game.IS2CPlayerJoinNty);

            /** S2CPlayerJoinNty uid. */
            public uid: (number|Long);

            /**
             * Creates a new S2CPlayerJoinNty instance using the specified properties.
             * @param [properties] Properties to set
             * @returns S2CPlayerJoinNty instance
             */
            public static create(properties?: proto.game.IS2CPlayerJoinNty): proto.game.S2CPlayerJoinNty;

            /**
             * Encodes the specified S2CPlayerJoinNty message. Does not implicitly {@link proto.game.S2CPlayerJoinNty.verify|verify} messages.
             * @param message S2CPlayerJoinNty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: proto.game.IS2CPlayerJoinNty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified S2CPlayerJoinNty message, length delimited. Does not implicitly {@link proto.game.S2CPlayerJoinNty.verify|verify} messages.
             * @param message S2CPlayerJoinNty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: proto.game.IS2CPlayerJoinNty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a S2CPlayerJoinNty message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns S2CPlayerJoinNty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.game.S2CPlayerJoinNty;

            /**
             * Decodes a S2CPlayerJoinNty message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns S2CPlayerJoinNty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.game.S2CPlayerJoinNty;

            /**
             * Verifies a S2CPlayerJoinNty message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a S2CPlayerJoinNty message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns S2CPlayerJoinNty
             */
            public static fromObject(object: { [k: string]: any }): proto.game.S2CPlayerJoinNty;

            /**
             * Creates a plain object from a S2CPlayerJoinNty message. Also converts values to other types if specified.
             * @param message S2CPlayerJoinNty
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: proto.game.S2CPlayerJoinNty, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this S2CPlayerJoinNty to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a S2CPlayerLeftNty. */
        interface IS2CPlayerLeftNty {

            /** S2CPlayerLeftNty uid */
            uid?: (number|Long|null);
        }

        /** Represents a S2CPlayerLeftNty. */
        class S2CPlayerLeftNty implements IS2CPlayerLeftNty {

            /**
             * Constructs a new S2CPlayerLeftNty.
             * @param [properties] Properties to set
             */
            constructor(properties?: proto.game.IS2CPlayerLeftNty);

            /** S2CPlayerLeftNty uid. */
            public uid: (number|Long);

            /**
             * Creates a new S2CPlayerLeftNty instance using the specified properties.
             * @param [properties] Properties to set
             * @returns S2CPlayerLeftNty instance
             */
            public static create(properties?: proto.game.IS2CPlayerLeftNty): proto.game.S2CPlayerLeftNty;

            /**
             * Encodes the specified S2CPlayerLeftNty message. Does not implicitly {@link proto.game.S2CPlayerLeftNty.verify|verify} messages.
             * @param message S2CPlayerLeftNty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: proto.game.IS2CPlayerLeftNty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified S2CPlayerLeftNty message, length delimited. Does not implicitly {@link proto.game.S2CPlayerLeftNty.verify|verify} messages.
             * @param message S2CPlayerLeftNty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: proto.game.IS2CPlayerLeftNty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a S2CPlayerLeftNty message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns S2CPlayerLeftNty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.game.S2CPlayerLeftNty;

            /**
             * Decodes a S2CPlayerLeftNty message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns S2CPlayerLeftNty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.game.S2CPlayerLeftNty;

            /**
             * Verifies a S2CPlayerLeftNty message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a S2CPlayerLeftNty message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns S2CPlayerLeftNty
             */
            public static fromObject(object: { [k: string]: any }): proto.game.S2CPlayerLeftNty;

            /**
             * Creates a plain object from a S2CPlayerLeftNty message. Also converts values to other types if specified.
             * @param message S2CPlayerLeftNty
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: proto.game.S2CPlayerLeftNty, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this S2CPlayerLeftNty to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a C2SActionReq. */
        interface IC2SActionReq {

            /** C2SActionReq action */
            action?: (number|null);

            /** C2SActionReq card */
            card?: (Uint8Array|null);

            /** C2SActionReq color */
            color?: (number|null);
        }

        /** Represents a C2SActionReq. */
        class C2SActionReq implements IC2SActionReq {

            /**
             * Constructs a new C2SActionReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: proto.game.IC2SActionReq);

            /** C2SActionReq action. */
            public action: number;

            /** C2SActionReq card. */
            public card: Uint8Array;

            /** C2SActionReq color. */
            public color: number;

            /**
             * Creates a new C2SActionReq instance using the specified properties.
             * @param [properties] Properties to set
             * @returns C2SActionReq instance
             */
            public static create(properties?: proto.game.IC2SActionReq): proto.game.C2SActionReq;

            /**
             * Encodes the specified C2SActionReq message. Does not implicitly {@link proto.game.C2SActionReq.verify|verify} messages.
             * @param message C2SActionReq message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: proto.game.IC2SActionReq, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified C2SActionReq message, length delimited. Does not implicitly {@link proto.game.C2SActionReq.verify|verify} messages.
             * @param message C2SActionReq message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: proto.game.IC2SActionReq, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a C2SActionReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns C2SActionReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.game.C2SActionReq;

            /**
             * Decodes a C2SActionReq message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns C2SActionReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.game.C2SActionReq;

            /**
             * Verifies a C2SActionReq message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a C2SActionReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns C2SActionReq
             */
            public static fromObject(object: { [k: string]: any }): proto.game.C2SActionReq;

            /**
             * Creates a plain object from a C2SActionReq message. Also converts values to other types if specified.
             * @param message C2SActionReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: proto.game.C2SActionReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this C2SActionReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a S2CActionResp. */
        interface IS2CActionResp {

            /** S2CActionResp result */
            result?: (number|null);

            /** S2CActionResp card */
            card?: (Uint8Array|null);
        }

        /** Represents a S2CActionResp. */
        class S2CActionResp implements IS2CActionResp {

            /**
             * Constructs a new S2CActionResp.
             * @param [properties] Properties to set
             */
            constructor(properties?: proto.game.IS2CActionResp);

            /** S2CActionResp result. */
            public result: number;

            /** S2CActionResp card. */
            public card: Uint8Array;

            /**
             * Creates a new S2CActionResp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns S2CActionResp instance
             */
            public static create(properties?: proto.game.IS2CActionResp): proto.game.S2CActionResp;

            /**
             * Encodes the specified S2CActionResp message. Does not implicitly {@link proto.game.S2CActionResp.verify|verify} messages.
             * @param message S2CActionResp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: proto.game.IS2CActionResp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified S2CActionResp message, length delimited. Does not implicitly {@link proto.game.S2CActionResp.verify|verify} messages.
             * @param message S2CActionResp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: proto.game.IS2CActionResp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a S2CActionResp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns S2CActionResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.game.S2CActionResp;

            /**
             * Decodes a S2CActionResp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns S2CActionResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.game.S2CActionResp;

            /**
             * Verifies a S2CActionResp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a S2CActionResp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns S2CActionResp
             */
            public static fromObject(object: { [k: string]: any }): proto.game.S2CActionResp;

            /**
             * Creates a plain object from a S2CActionResp message. Also converts values to other types if specified.
             * @param message S2CActionResp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: proto.game.S2CActionResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this S2CActionResp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a SingleEvent. */
        interface ISingleEvent {

            /** SingleEvent uid */
            uid?: (number|Long|null);

            /** SingleEvent event */
            event?: (number|null);

            /** SingleEvent card */
            card?: (Uint8Array|null);

            /** SingleEvent clockwise */
            clockwise?: (boolean|null);

            /** SingleEvent color */
            color?: (number|null);
        }

        /** Represents a SingleEvent. */
        class SingleEvent implements ISingleEvent {

            /**
             * Constructs a new SingleEvent.
             * @param [properties] Properties to set
             */
            constructor(properties?: proto.game.ISingleEvent);

            /** SingleEvent uid. */
            public uid: (number|Long);

            /** SingleEvent event. */
            public event: number;

            /** SingleEvent card. */
            public card: Uint8Array;

            /** SingleEvent clockwise. */
            public clockwise: boolean;

            /** SingleEvent color. */
            public color: number;

            /**
             * Creates a new SingleEvent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SingleEvent instance
             */
            public static create(properties?: proto.game.ISingleEvent): proto.game.SingleEvent;

            /**
             * Encodes the specified SingleEvent message. Does not implicitly {@link proto.game.SingleEvent.verify|verify} messages.
             * @param message SingleEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: proto.game.ISingleEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SingleEvent message, length delimited. Does not implicitly {@link proto.game.SingleEvent.verify|verify} messages.
             * @param message SingleEvent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: proto.game.ISingleEvent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SingleEvent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SingleEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.game.SingleEvent;

            /**
             * Decodes a SingleEvent message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SingleEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.game.SingleEvent;

            /**
             * Verifies a SingleEvent message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SingleEvent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SingleEvent
             */
            public static fromObject(object: { [k: string]: any }): proto.game.SingleEvent;

            /**
             * Creates a plain object from a SingleEvent message. Also converts values to other types if specified.
             * @param message SingleEvent
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: proto.game.SingleEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SingleEvent to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a S2CEventNty. */
        interface IS2CEventNty {

            /** S2CEventNty events */
            events?: (proto.game.ISingleEvent[]|null);
        }

        /** Represents a S2CEventNty. */
        class S2CEventNty implements IS2CEventNty {

            /**
             * Constructs a new S2CEventNty.
             * @param [properties] Properties to set
             */
            constructor(properties?: proto.game.IS2CEventNty);

            /** S2CEventNty events. */
            public events: proto.game.ISingleEvent[];

            /**
             * Creates a new S2CEventNty instance using the specified properties.
             * @param [properties] Properties to set
             * @returns S2CEventNty instance
             */
            public static create(properties?: proto.game.IS2CEventNty): proto.game.S2CEventNty;

            /**
             * Encodes the specified S2CEventNty message. Does not implicitly {@link proto.game.S2CEventNty.verify|verify} messages.
             * @param message S2CEventNty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: proto.game.IS2CEventNty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified S2CEventNty message, length delimited. Does not implicitly {@link proto.game.S2CEventNty.verify|verify} messages.
             * @param message S2CEventNty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: proto.game.IS2CEventNty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a S2CEventNty message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns S2CEventNty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.game.S2CEventNty;

            /**
             * Decodes a S2CEventNty message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns S2CEventNty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.game.S2CEventNty;

            /**
             * Verifies a S2CEventNty message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a S2CEventNty message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns S2CEventNty
             */
            public static fromObject(object: { [k: string]: any }): proto.game.S2CEventNty;

            /**
             * Creates a plain object from a S2CEventNty message. Also converts values to other types if specified.
             * @param message S2CEventNty
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: proto.game.S2CEventNty, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this S2CEventNty to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a S2CGameOverNty. */
        interface IS2CGameOverNty {

            /** S2CGameOverNty ranks */
            ranks?: ((number|Long)[]|null);

            /** S2CGameOverNty scores */
            scores?: (number[]|null);
        }

        /** Represents a S2CGameOverNty. */
        class S2CGameOverNty implements IS2CGameOverNty {

            /**
             * Constructs a new S2CGameOverNty.
             * @param [properties] Properties to set
             */
            constructor(properties?: proto.game.IS2CGameOverNty);

            /** S2CGameOverNty ranks. */
            public ranks: (number|Long)[];

            /** S2CGameOverNty scores. */
            public scores: number[];

            /**
             * Creates a new S2CGameOverNty instance using the specified properties.
             * @param [properties] Properties to set
             * @returns S2CGameOverNty instance
             */
            public static create(properties?: proto.game.IS2CGameOverNty): proto.game.S2CGameOverNty;

            /**
             * Encodes the specified S2CGameOverNty message. Does not implicitly {@link proto.game.S2CGameOverNty.verify|verify} messages.
             * @param message S2CGameOverNty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: proto.game.IS2CGameOverNty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified S2CGameOverNty message, length delimited. Does not implicitly {@link proto.game.S2CGameOverNty.verify|verify} messages.
             * @param message S2CGameOverNty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: proto.game.IS2CGameOverNty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a S2CGameOverNty message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns S2CGameOverNty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.game.S2CGameOverNty;

            /**
             * Decodes a S2CGameOverNty message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns S2CGameOverNty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.game.S2CGameOverNty;

            /**
             * Verifies a S2CGameOverNty message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a S2CGameOverNty message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns S2CGameOverNty
             */
            public static fromObject(object: { [k: string]: any }): proto.game.S2CGameOverNty;

            /**
             * Creates a plain object from a S2CGameOverNty message. Also converts values to other types if specified.
             * @param message S2CGameOverNty
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: proto.game.S2CGameOverNty, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this S2CGameOverNty to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Namespace internal. */
    namespace internal {

        /** FrameType enum. */
        enum FrameType {
            Message = 0,
            Kick = 1,
            Ping = 2
        }

        /** Properties of a Frame. */
        interface IFrame {

            /** Frame type */
            type?: (proto.internal.FrameType|null);

            /** Frame cmd */
            cmd?: (number|null);

            /** Frame status */
            status?: (number|null);

            /** Frame message */
            message?: (string|null);

            /** Frame body */
            body?: (Uint8Array|null);
        }

        /** Represents a Frame. */
        class Frame implements IFrame {

            /**
             * Constructs a new Frame.
             * @param [properties] Properties to set
             */
            constructor(properties?: proto.internal.IFrame);

            /** Frame type. */
            public type: proto.internal.FrameType;

            /** Frame cmd. */
            public cmd: number;

            /** Frame status. */
            public status: number;

            /** Frame message. */
            public message: string;

            /** Frame body. */
            public body: Uint8Array;

            /**
             * Creates a new Frame instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Frame instance
             */
            public static create(properties?: proto.internal.IFrame): proto.internal.Frame;

            /**
             * Encodes the specified Frame message. Does not implicitly {@link proto.internal.Frame.verify|verify} messages.
             * @param message Frame message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: proto.internal.IFrame, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Frame message, length delimited. Does not implicitly {@link proto.internal.Frame.verify|verify} messages.
             * @param message Frame message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: proto.internal.IFrame, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Frame message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Frame
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.internal.Frame;

            /**
             * Decodes a Frame message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Frame
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.internal.Frame;

            /**
             * Verifies a Frame message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Frame message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Frame
             */
            public static fromObject(object: { [k: string]: any }): proto.internal.Frame;

            /**
             * Creates a plain object from a Frame message. Also converts values to other types if specified.
             * @param message Frame
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: proto.internal.Frame, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Frame to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
