/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.proto = (function() {

    /**
     * Namespace proto.
     * @exports proto
     * @namespace
     */
    var proto = {};

    proto.common = (function() {

        /**
         * Namespace common.
         * @memberof proto
         * @namespace
         */
        var common = {};

        /**
         * Cmd enum.
         * @name proto.common.Cmd
         * @enum {string}
         * @property {number} RESERVED=0 RESERVED value
         * @property {number} HEART_BEAT_REQ=4097 HEART_BEAT_REQ value
         * @property {number} HEART_BEAT_RESP=4098 HEART_BEAT_RESP value
         * @property {number} KICK_NOTIFY=4100 KICK_NOTIFY value
         * @property {number} HANDSHAKE_REQ=4113 HANDSHAKE_REQ value
         * @property {number} HANDSHAKE_RESP=4114 HANDSHAKE_RESP value
         * @property {number} LOGOUT_REQ=4131 LOGOUT_REQ value
         * @property {number} LOGOUT_RESP=4132 LOGOUT_RESP value
         * @property {number} OFFLINE_REQ=4231 OFFLINE_REQ value
         * @property {number} PING_REQ=4241 PING_REQ value
         * @property {number} PING_RESP=4242 PING_RESP value
         * @property {number} CMD_COMMON_END=8192 CMD_COMMON_END value
         */
        common.Cmd = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "RESERVED"] = 0;
            values[valuesById[4097] = "HEART_BEAT_REQ"] = 4097;
            values[valuesById[4098] = "HEART_BEAT_RESP"] = 4098;
            values[valuesById[4100] = "KICK_NOTIFY"] = 4100;
            values[valuesById[4113] = "HANDSHAKE_REQ"] = 4113;
            values[valuesById[4114] = "HANDSHAKE_RESP"] = 4114;
            values[valuesById[4131] = "LOGOUT_REQ"] = 4131;
            values[valuesById[4132] = "LOGOUT_RESP"] = 4132;
            values[valuesById[4231] = "OFFLINE_REQ"] = 4231;
            values[valuesById[4241] = "PING_REQ"] = 4241;
            values[valuesById[4242] = "PING_RESP"] = 4242;
            values[valuesById[8192] = "CMD_COMMON_END"] = 8192;
            return values;
        })();

        /**
         * StatusCode enum.
         * @name proto.common.StatusCode
         * @enum {string}
         * @property {number} STATUS_OK=0 STATUS_OK value
         * @property {number} STATUS_INVALID=4000 STATUS_INVALID value
         * @property {number} STATUS_UNAUTH=4001 STATUS_UNAUTH value
         * @property {number} STATUS_UNKNOWN_CMD=4004 STATUS_UNKNOWN_CMD value
         * @property {number} STATUS_TIMEOUT=4008 STATUS_TIMEOUT value
         * @property {number} STATUS_TOO_MANY_REQ=4029 STATUS_TOO_MANY_REQ value
         * @property {number} STATUS_INTERNAL_ERROR=5000 STATUS_INTERNAL_ERROR value
         * @property {number} STATUS_UNAVAILABLE=5003 STATUS_UNAVAILABLE value
         */
        common.StatusCode = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "STATUS_OK"] = 0;
            values[valuesById[4000] = "STATUS_INVALID"] = 4000;
            values[valuesById[4001] = "STATUS_UNAUTH"] = 4001;
            values[valuesById[4004] = "STATUS_UNKNOWN_CMD"] = 4004;
            values[valuesById[4008] = "STATUS_TIMEOUT"] = 4008;
            values[valuesById[4029] = "STATUS_TOO_MANY_REQ"] = 4029;
            values[valuesById[5000] = "STATUS_INTERNAL_ERROR"] = 5000;
            values[valuesById[5003] = "STATUS_UNAVAILABLE"] = 5003;
            return values;
        })();

        /**
         * Gender enum.
         * @name proto.common.Gender
         * @enum {string}
         * @property {number} GENDER_UNKNOWN=0 GENDER_UNKNOWN value
         * @property {number} GENDER_FEMALE=1 GENDER_FEMALE value
         * @property {number} GENDER_MALE=2 GENDER_MALE value
         */
        common.Gender = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "GENDER_UNKNOWN"] = 0;
            values[valuesById[1] = "GENDER_FEMALE"] = 1;
            values[valuesById[2] = "GENDER_MALE"] = 2;
            return values;
        })();

        /**
         * AccountStatus enum.
         * @name proto.common.AccountStatus
         * @enum {string}
         * @property {number} ACCOUNT_STATUS_NORMAL=0 ACCOUNT_STATUS_NORMAL value
         * @property {number} ACCOUNT_STATUS_RESTRICTED=1 ACCOUNT_STATUS_RESTRICTED value
         * @property {number} ACCOUNT_STATUS_BANNED=2 ACCOUNT_STATUS_BANNED value
         * @property {number} ACCOUNT_STATUS_DELETED=4 ACCOUNT_STATUS_DELETED value
         * @property {number} ACCOUNT_STATUS_BOT=8 ACCOUNT_STATUS_BOT value
         * @property {number} ACCOUNT_STATUS_OFFICIAL=16 ACCOUNT_STATUS_OFFICIAL value
         */
        common.AccountStatus = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "ACCOUNT_STATUS_NORMAL"] = 0;
            values[valuesById[1] = "ACCOUNT_STATUS_RESTRICTED"] = 1;
            values[valuesById[2] = "ACCOUNT_STATUS_BANNED"] = 2;
            values[valuesById[4] = "ACCOUNT_STATUS_DELETED"] = 4;
            values[valuesById[8] = "ACCOUNT_STATUS_BOT"] = 8;
            values[valuesById[16] = "ACCOUNT_STATUS_OFFICIAL"] = 16;
            return values;
        })();

        /**
         * DeviceType enum.
         * @name proto.common.DeviceType
         * @enum {string}
         * @property {number} DEVICE_TYPE_UNKNOWN=0 DEVICE_TYPE_UNKNOWN value
         * @property {number} DEVICE_TYPE_BROWSER=1 DEVICE_TYPE_BROWSER value
         * @property {number} DEVICE_TYPE_IOS=2 DEVICE_TYPE_IOS value
         * @property {number} DEVICE_TYPE_ANDROID=3 DEVICE_TYPE_ANDROID value
         */
        common.DeviceType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "DEVICE_TYPE_UNKNOWN"] = 0;
            values[valuesById[1] = "DEVICE_TYPE_BROWSER"] = 1;
            values[valuesById[2] = "DEVICE_TYPE_IOS"] = 2;
            values[valuesById[3] = "DEVICE_TYPE_ANDROID"] = 3;
            return values;
        })();

        common.C2SHeader = (function() {

            /**
             * Properties of a C2SHeader.
             * @memberof proto.common
             * @interface IC2SHeader
             * @property {number|null} [version] C2SHeader version
             * @property {number|null} [cmd] C2SHeader cmd
             * @property {number|Long|null} [seq] C2SHeader seq
             * @property {number|Long|null} [uid] C2SHeader uid
             * @property {proto.common.IClientInfo|null} [clientInfo] C2SHeader clientInfo
             * @property {Uint8Array|null} [body] C2SHeader body
             */

            /**
             * Constructs a new C2SHeader.
             * @memberof proto.common
             * @classdesc Represents a C2SHeader.
             * @implements IC2SHeader
             * @constructor
             * @param {proto.common.IC2SHeader=} [properties] Properties to set
             */
            function C2SHeader(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * C2SHeader version.
             * @member {number} version
             * @memberof proto.common.C2SHeader
             * @instance
             */
            C2SHeader.prototype.version = 0;

            /**
             * C2SHeader cmd.
             * @member {number} cmd
             * @memberof proto.common.C2SHeader
             * @instance
             */
            C2SHeader.prototype.cmd = 0;

            /**
             * C2SHeader seq.
             * @member {number|Long} seq
             * @memberof proto.common.C2SHeader
             * @instance
             */
            C2SHeader.prototype.seq = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * C2SHeader uid.
             * @member {number|Long} uid
             * @memberof proto.common.C2SHeader
             * @instance
             */
            C2SHeader.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * C2SHeader clientInfo.
             * @member {proto.common.IClientInfo|null|undefined} clientInfo
             * @memberof proto.common.C2SHeader
             * @instance
             */
            C2SHeader.prototype.clientInfo = null;

            /**
             * C2SHeader body.
             * @member {Uint8Array} body
             * @memberof proto.common.C2SHeader
             * @instance
             */
            C2SHeader.prototype.body = $util.newBuffer([]);

            /**
             * Creates a new C2SHeader instance using the specified properties.
             * @function create
             * @memberof proto.common.C2SHeader
             * @static
             * @param {proto.common.IC2SHeader=} [properties] Properties to set
             * @returns {proto.common.C2SHeader} C2SHeader instance
             */
            C2SHeader.create = function create(properties) {
                return new C2SHeader(properties);
            };

            /**
             * Encodes the specified C2SHeader message. Does not implicitly {@link proto.common.C2SHeader.verify|verify} messages.
             * @function encode
             * @memberof proto.common.C2SHeader
             * @static
             * @param {proto.common.IC2SHeader} message C2SHeader message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            C2SHeader.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.version != null && message.hasOwnProperty("version"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.version);
                if (message.cmd != null && message.hasOwnProperty("cmd"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.cmd);
                if (message.seq != null && message.hasOwnProperty("seq"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.seq);
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 4, wireType 1 =*/33).fixed64(message.uid);
                if (message.clientInfo != null && message.hasOwnProperty("clientInfo"))
                    $root.proto.common.ClientInfo.encode(message.clientInfo, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.body != null && message.hasOwnProperty("body"))
                    writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.body);
                return writer;
            };

            /**
             * Encodes the specified C2SHeader message, length delimited. Does not implicitly {@link proto.common.C2SHeader.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.common.C2SHeader
             * @static
             * @param {proto.common.IC2SHeader} message C2SHeader message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            C2SHeader.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a C2SHeader message from the specified reader or buffer.
             * @function decode
             * @memberof proto.common.C2SHeader
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.common.C2SHeader} C2SHeader
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            C2SHeader.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.common.C2SHeader();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.version = reader.int32();
                        break;
                    case 2:
                        message.cmd = reader.int32();
                        break;
                    case 3:
                        message.seq = reader.uint64();
                        break;
                    case 4:
                        message.uid = reader.fixed64();
                        break;
                    case 5:
                        message.clientInfo = $root.proto.common.ClientInfo.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.body = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a C2SHeader message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.common.C2SHeader
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.common.C2SHeader} C2SHeader
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            C2SHeader.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a C2SHeader message.
             * @function verify
             * @memberof proto.common.C2SHeader
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            C2SHeader.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.version != null && message.hasOwnProperty("version"))
                    if (!$util.isInteger(message.version))
                        return "version: integer expected";
                if (message.cmd != null && message.hasOwnProperty("cmd"))
                    if (!$util.isInteger(message.cmd))
                        return "cmd: integer expected";
                if (message.seq != null && message.hasOwnProperty("seq"))
                    if (!$util.isInteger(message.seq) && !(message.seq && $util.isInteger(message.seq.low) && $util.isInteger(message.seq.high)))
                        return "seq: integer|Long expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                        return "uid: integer|Long expected";
                if (message.clientInfo != null && message.hasOwnProperty("clientInfo")) {
                    var error = $root.proto.common.ClientInfo.verify(message.clientInfo);
                    if (error)
                        return "clientInfo." + error;
                }
                if (message.body != null && message.hasOwnProperty("body"))
                    if (!(message.body && typeof message.body.length === "number" || $util.isString(message.body)))
                        return "body: buffer expected";
                return null;
            };

            /**
             * Creates a C2SHeader message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.common.C2SHeader
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.common.C2SHeader} C2SHeader
             */
            C2SHeader.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.common.C2SHeader)
                    return object;
                var message = new $root.proto.common.C2SHeader();
                if (object.version != null)
                    message.version = object.version | 0;
                if (object.cmd != null)
                    message.cmd = object.cmd | 0;
                if (object.seq != null)
                    if ($util.Long)
                        (message.seq = $util.Long.fromValue(object.seq)).unsigned = true;
                    else if (typeof object.seq === "string")
                        message.seq = parseInt(object.seq, 10);
                    else if (typeof object.seq === "number")
                        message.seq = object.seq;
                    else if (typeof object.seq === "object")
                        message.seq = new $util.LongBits(object.seq.low >>> 0, object.seq.high >>> 0).toNumber(true);
                if (object.uid != null)
                    if ($util.Long)
                        (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;
                    else if (typeof object.uid === "string")
                        message.uid = parseInt(object.uid, 10);
                    else if (typeof object.uid === "number")
                        message.uid = object.uid;
                    else if (typeof object.uid === "object")
                        message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
                if (object.clientInfo != null) {
                    if (typeof object.clientInfo !== "object")
                        throw TypeError(".proto.common.C2SHeader.clientInfo: object expected");
                    message.clientInfo = $root.proto.common.ClientInfo.fromObject(object.clientInfo);
                }
                if (object.body != null)
                    if (typeof object.body === "string")
                        $util.base64.decode(object.body, message.body = $util.newBuffer($util.base64.length(object.body)), 0);
                    else if (object.body.length)
                        message.body = object.body;
                return message;
            };

            /**
             * Creates a plain object from a C2SHeader message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.common.C2SHeader
             * @static
             * @param {proto.common.C2SHeader} message C2SHeader
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            C2SHeader.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.version = 0;
                    object.cmd = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.seq = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seq = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.uid = options.longs === String ? "0" : 0;
                    object.clientInfo = null;
                    if (options.bytes === String)
                        object.body = "";
                    else {
                        object.body = [];
                        if (options.bytes !== Array)
                            object.body = $util.newBuffer(object.body);
                    }
                }
                if (message.version != null && message.hasOwnProperty("version"))
                    object.version = message.version;
                if (message.cmd != null && message.hasOwnProperty("cmd"))
                    object.cmd = message.cmd;
                if (message.seq != null && message.hasOwnProperty("seq"))
                    if (typeof message.seq === "number")
                        object.seq = options.longs === String ? String(message.seq) : message.seq;
                    else
                        object.seq = options.longs === String ? $util.Long.prototype.toString.call(message.seq) : options.longs === Number ? new $util.LongBits(message.seq.low >>> 0, message.seq.high >>> 0).toNumber(true) : message.seq;
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (typeof message.uid === "number")
                        object.uid = options.longs === String ? String(message.uid) : message.uid;
                    else
                        object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
                if (message.clientInfo != null && message.hasOwnProperty("clientInfo"))
                    object.clientInfo = $root.proto.common.ClientInfo.toObject(message.clientInfo, options);
                if (message.body != null && message.hasOwnProperty("body"))
                    object.body = options.bytes === String ? $util.base64.encode(message.body, 0, message.body.length) : options.bytes === Array ? Array.prototype.slice.call(message.body) : message.body;
                return object;
            };

            /**
             * Converts this C2SHeader to JSON.
             * @function toJSON
             * @memberof proto.common.C2SHeader
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            C2SHeader.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return C2SHeader;
        })();

        common.S2CHeader = (function() {

            /**
             * Properties of a S2CHeader.
             * @memberof proto.common
             * @interface IS2CHeader
             * @property {number|null} [cmd] S2CHeader cmd
             * @property {number|Long|null} [seq] S2CHeader seq
             * @property {number|null} [status] S2CHeader status
             * @property {number|Long|null} [timestamp] S2CHeader timestamp
             * @property {string|null} [msg] S2CHeader msg
             * @property {Uint8Array|null} [body] S2CHeader body
             */

            /**
             * Constructs a new S2CHeader.
             * @memberof proto.common
             * @classdesc Represents a S2CHeader.
             * @implements IS2CHeader
             * @constructor
             * @param {proto.common.IS2CHeader=} [properties] Properties to set
             */
            function S2CHeader(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * S2CHeader cmd.
             * @member {number} cmd
             * @memberof proto.common.S2CHeader
             * @instance
             */
            S2CHeader.prototype.cmd = 0;

            /**
             * S2CHeader seq.
             * @member {number|Long} seq
             * @memberof proto.common.S2CHeader
             * @instance
             */
            S2CHeader.prototype.seq = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * S2CHeader status.
             * @member {number} status
             * @memberof proto.common.S2CHeader
             * @instance
             */
            S2CHeader.prototype.status = 0;

            /**
             * S2CHeader timestamp.
             * @member {number|Long} timestamp
             * @memberof proto.common.S2CHeader
             * @instance
             */
            S2CHeader.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * S2CHeader msg.
             * @member {string} msg
             * @memberof proto.common.S2CHeader
             * @instance
             */
            S2CHeader.prototype.msg = "";

            /**
             * S2CHeader body.
             * @member {Uint8Array} body
             * @memberof proto.common.S2CHeader
             * @instance
             */
            S2CHeader.prototype.body = $util.newBuffer([]);

            /**
             * Creates a new S2CHeader instance using the specified properties.
             * @function create
             * @memberof proto.common.S2CHeader
             * @static
             * @param {proto.common.IS2CHeader=} [properties] Properties to set
             * @returns {proto.common.S2CHeader} S2CHeader instance
             */
            S2CHeader.create = function create(properties) {
                return new S2CHeader(properties);
            };

            /**
             * Encodes the specified S2CHeader message. Does not implicitly {@link proto.common.S2CHeader.verify|verify} messages.
             * @function encode
             * @memberof proto.common.S2CHeader
             * @static
             * @param {proto.common.IS2CHeader} message S2CHeader message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            S2CHeader.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.cmd != null && message.hasOwnProperty("cmd"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.cmd);
                if (message.seq != null && message.hasOwnProperty("seq"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.seq);
                if (message.status != null && message.hasOwnProperty("status"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.status);
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    writer.uint32(/* id 4, wireType 1 =*/33).fixed64(message.timestamp);
                if (message.msg != null && message.hasOwnProperty("msg"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.msg);
                if (message.body != null && message.hasOwnProperty("body"))
                    writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.body);
                return writer;
            };

            /**
             * Encodes the specified S2CHeader message, length delimited. Does not implicitly {@link proto.common.S2CHeader.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.common.S2CHeader
             * @static
             * @param {proto.common.IS2CHeader} message S2CHeader message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            S2CHeader.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a S2CHeader message from the specified reader or buffer.
             * @function decode
             * @memberof proto.common.S2CHeader
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.common.S2CHeader} S2CHeader
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            S2CHeader.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.common.S2CHeader();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.cmd = reader.int32();
                        break;
                    case 2:
                        message.seq = reader.uint64();
                        break;
                    case 3:
                        message.status = reader.int32();
                        break;
                    case 4:
                        message.timestamp = reader.fixed64();
                        break;
                    case 5:
                        message.msg = reader.string();
                        break;
                    case 6:
                        message.body = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a S2CHeader message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.common.S2CHeader
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.common.S2CHeader} S2CHeader
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            S2CHeader.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a S2CHeader message.
             * @function verify
             * @memberof proto.common.S2CHeader
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            S2CHeader.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.cmd != null && message.hasOwnProperty("cmd"))
                    if (!$util.isInteger(message.cmd))
                        return "cmd: integer expected";
                if (message.seq != null && message.hasOwnProperty("seq"))
                    if (!$util.isInteger(message.seq) && !(message.seq && $util.isInteger(message.seq.low) && $util.isInteger(message.seq.high)))
                        return "seq: integer|Long expected";
                if (message.status != null && message.hasOwnProperty("status"))
                    if (!$util.isInteger(message.status))
                        return "status: integer expected";
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                        return "timestamp: integer|Long expected";
                if (message.msg != null && message.hasOwnProperty("msg"))
                    if (!$util.isString(message.msg))
                        return "msg: string expected";
                if (message.body != null && message.hasOwnProperty("body"))
                    if (!(message.body && typeof message.body.length === "number" || $util.isString(message.body)))
                        return "body: buffer expected";
                return null;
            };

            /**
             * Creates a S2CHeader message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.common.S2CHeader
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.common.S2CHeader} S2CHeader
             */
            S2CHeader.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.common.S2CHeader)
                    return object;
                var message = new $root.proto.common.S2CHeader();
                if (object.cmd != null)
                    message.cmd = object.cmd | 0;
                if (object.seq != null)
                    if ($util.Long)
                        (message.seq = $util.Long.fromValue(object.seq)).unsigned = true;
                    else if (typeof object.seq === "string")
                        message.seq = parseInt(object.seq, 10);
                    else if (typeof object.seq === "number")
                        message.seq = object.seq;
                    else if (typeof object.seq === "object")
                        message.seq = new $util.LongBits(object.seq.low >>> 0, object.seq.high >>> 0).toNumber(true);
                if (object.status != null)
                    message.status = object.status | 0;
                if (object.timestamp != null)
                    if ($util.Long)
                        (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                if (object.msg != null)
                    message.msg = String(object.msg);
                if (object.body != null)
                    if (typeof object.body === "string")
                        $util.base64.decode(object.body, message.body = $util.newBuffer($util.base64.length(object.body)), 0);
                    else if (object.body.length)
                        message.body = object.body;
                return message;
            };

            /**
             * Creates a plain object from a S2CHeader message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.common.S2CHeader
             * @static
             * @param {proto.common.S2CHeader} message S2CHeader
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            S2CHeader.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.cmd = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.seq = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seq = options.longs === String ? "0" : 0;
                    object.status = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : 0;
                    object.msg = "";
                    if (options.bytes === String)
                        object.body = "";
                    else {
                        object.body = [];
                        if (options.bytes !== Array)
                            object.body = $util.newBuffer(object.body);
                    }
                }
                if (message.cmd != null && message.hasOwnProperty("cmd"))
                    object.cmd = message.cmd;
                if (message.seq != null && message.hasOwnProperty("seq"))
                    if (typeof message.seq === "number")
                        object.seq = options.longs === String ? String(message.seq) : message.seq;
                    else
                        object.seq = options.longs === String ? $util.Long.prototype.toString.call(message.seq) : options.longs === Number ? new $util.LongBits(message.seq.low >>> 0, message.seq.high >>> 0).toNumber(true) : message.seq;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = message.status;
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                if (message.msg != null && message.hasOwnProperty("msg"))
                    object.msg = message.msg;
                if (message.body != null && message.hasOwnProperty("body"))
                    object.body = options.bytes === String ? $util.base64.encode(message.body, 0, message.body.length) : options.bytes === Array ? Array.prototype.slice.call(message.body) : message.body;
                return object;
            };

            /**
             * Converts this S2CHeader to JSON.
             * @function toJSON
             * @memberof proto.common.S2CHeader
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            S2CHeader.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return S2CHeader;
        })();

        common.ClientInfo = (function() {

            /**
             * Properties of a ClientInfo.
             * @memberof proto.common
             * @interface IClientInfo
             * @property {number|null} [deviceType] ClientInfo deviceType
             * @property {number|Long|null} [timestamp] ClientInfo timestamp
             * @property {string|null} [os] ClientInfo os
             * @property {string|null} [osLocale] ClientInfo osLocale
             * @property {string|null} [appVersion] ClientInfo appVersion
             * @property {string|null} [appLocale] ClientInfo appLocale
             * @property {string|null} [timezone] ClientInfo timezone
             * @property {number|null} [mcc] ClientInfo mcc
             */

            /**
             * Constructs a new ClientInfo.
             * @memberof proto.common
             * @classdesc Represents a ClientInfo.
             * @implements IClientInfo
             * @constructor
             * @param {proto.common.IClientInfo=} [properties] Properties to set
             */
            function ClientInfo(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ClientInfo deviceType.
             * @member {number} deviceType
             * @memberof proto.common.ClientInfo
             * @instance
             */
            ClientInfo.prototype.deviceType = 0;

            /**
             * ClientInfo timestamp.
             * @member {number|Long} timestamp
             * @memberof proto.common.ClientInfo
             * @instance
             */
            ClientInfo.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ClientInfo os.
             * @member {string} os
             * @memberof proto.common.ClientInfo
             * @instance
             */
            ClientInfo.prototype.os = "";

            /**
             * ClientInfo osLocale.
             * @member {string} osLocale
             * @memberof proto.common.ClientInfo
             * @instance
             */
            ClientInfo.prototype.osLocale = "";

            /**
             * ClientInfo appVersion.
             * @member {string} appVersion
             * @memberof proto.common.ClientInfo
             * @instance
             */
            ClientInfo.prototype.appVersion = "";

            /**
             * ClientInfo appLocale.
             * @member {string} appLocale
             * @memberof proto.common.ClientInfo
             * @instance
             */
            ClientInfo.prototype.appLocale = "";

            /**
             * ClientInfo timezone.
             * @member {string} timezone
             * @memberof proto.common.ClientInfo
             * @instance
             */
            ClientInfo.prototype.timezone = "";

            /**
             * ClientInfo mcc.
             * @member {number} mcc
             * @memberof proto.common.ClientInfo
             * @instance
             */
            ClientInfo.prototype.mcc = 0;

            /**
             * Creates a new ClientInfo instance using the specified properties.
             * @function create
             * @memberof proto.common.ClientInfo
             * @static
             * @param {proto.common.IClientInfo=} [properties] Properties to set
             * @returns {proto.common.ClientInfo} ClientInfo instance
             */
            ClientInfo.create = function create(properties) {
                return new ClientInfo(properties);
            };

            /**
             * Encodes the specified ClientInfo message. Does not implicitly {@link proto.common.ClientInfo.verify|verify} messages.
             * @function encode
             * @memberof proto.common.ClientInfo
             * @static
             * @param {proto.common.IClientInfo} message ClientInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientInfo.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.deviceType != null && message.hasOwnProperty("deviceType"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.deviceType);
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    writer.uint32(/* id 2, wireType 1 =*/17).fixed64(message.timestamp);
                if (message.os != null && message.hasOwnProperty("os"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.os);
                if (message.osLocale != null && message.hasOwnProperty("osLocale"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.osLocale);
                if (message.appVersion != null && message.hasOwnProperty("appVersion"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.appVersion);
                if (message.appLocale != null && message.hasOwnProperty("appLocale"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.appLocale);
                if (message.timezone != null && message.hasOwnProperty("timezone"))
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.timezone);
                if (message.mcc != null && message.hasOwnProperty("mcc"))
                    writer.uint32(/* id 8, wireType 0 =*/64).int32(message.mcc);
                return writer;
            };

            /**
             * Encodes the specified ClientInfo message, length delimited. Does not implicitly {@link proto.common.ClientInfo.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.common.ClientInfo
             * @static
             * @param {proto.common.IClientInfo} message ClientInfo message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientInfo.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ClientInfo message from the specified reader or buffer.
             * @function decode
             * @memberof proto.common.ClientInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.common.ClientInfo} ClientInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClientInfo.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.common.ClientInfo();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.deviceType = reader.int32();
                        break;
                    case 2:
                        message.timestamp = reader.fixed64();
                        break;
                    case 3:
                        message.os = reader.string();
                        break;
                    case 4:
                        message.osLocale = reader.string();
                        break;
                    case 5:
                        message.appVersion = reader.string();
                        break;
                    case 6:
                        message.appLocale = reader.string();
                        break;
                    case 7:
                        message.timezone = reader.string();
                        break;
                    case 8:
                        message.mcc = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ClientInfo message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.common.ClientInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.common.ClientInfo} ClientInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClientInfo.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ClientInfo message.
             * @function verify
             * @memberof proto.common.ClientInfo
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ClientInfo.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.deviceType != null && message.hasOwnProperty("deviceType"))
                    if (!$util.isInteger(message.deviceType))
                        return "deviceType: integer expected";
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                        return "timestamp: integer|Long expected";
                if (message.os != null && message.hasOwnProperty("os"))
                    if (!$util.isString(message.os))
                        return "os: string expected";
                if (message.osLocale != null && message.hasOwnProperty("osLocale"))
                    if (!$util.isString(message.osLocale))
                        return "osLocale: string expected";
                if (message.appVersion != null && message.hasOwnProperty("appVersion"))
                    if (!$util.isString(message.appVersion))
                        return "appVersion: string expected";
                if (message.appLocale != null && message.hasOwnProperty("appLocale"))
                    if (!$util.isString(message.appLocale))
                        return "appLocale: string expected";
                if (message.timezone != null && message.hasOwnProperty("timezone"))
                    if (!$util.isString(message.timezone))
                        return "timezone: string expected";
                if (message.mcc != null && message.hasOwnProperty("mcc"))
                    if (!$util.isInteger(message.mcc))
                        return "mcc: integer expected";
                return null;
            };

            /**
             * Creates a ClientInfo message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.common.ClientInfo
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.common.ClientInfo} ClientInfo
             */
            ClientInfo.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.common.ClientInfo)
                    return object;
                var message = new $root.proto.common.ClientInfo();
                if (object.deviceType != null)
                    message.deviceType = object.deviceType | 0;
                if (object.timestamp != null)
                    if ($util.Long)
                        (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                if (object.os != null)
                    message.os = String(object.os);
                if (object.osLocale != null)
                    message.osLocale = String(object.osLocale);
                if (object.appVersion != null)
                    message.appVersion = String(object.appVersion);
                if (object.appLocale != null)
                    message.appLocale = String(object.appLocale);
                if (object.timezone != null)
                    message.timezone = String(object.timezone);
                if (object.mcc != null)
                    message.mcc = object.mcc | 0;
                return message;
            };

            /**
             * Creates a plain object from a ClientInfo message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.common.ClientInfo
             * @static
             * @param {proto.common.ClientInfo} message ClientInfo
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ClientInfo.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.deviceType = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : 0;
                    object.os = "";
                    object.osLocale = "";
                    object.appVersion = "";
                    object.appLocale = "";
                    object.timezone = "";
                    object.mcc = 0;
                }
                if (message.deviceType != null && message.hasOwnProperty("deviceType"))
                    object.deviceType = message.deviceType;
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                if (message.os != null && message.hasOwnProperty("os"))
                    object.os = message.os;
                if (message.osLocale != null && message.hasOwnProperty("osLocale"))
                    object.osLocale = message.osLocale;
                if (message.appVersion != null && message.hasOwnProperty("appVersion"))
                    object.appVersion = message.appVersion;
                if (message.appLocale != null && message.hasOwnProperty("appLocale"))
                    object.appLocale = message.appLocale;
                if (message.timezone != null && message.hasOwnProperty("timezone"))
                    object.timezone = message.timezone;
                if (message.mcc != null && message.hasOwnProperty("mcc"))
                    object.mcc = message.mcc;
                return object;
            };

            /**
             * Converts this ClientInfo to JSON.
             * @function toJSON
             * @memberof proto.common.ClientInfo
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClientInfo.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ClientInfo;
        })();

        common.C2SHandshakeReq = (function() {

            /**
             * Properties of a C2SHandshakeReq.
             * @memberof proto.common
             * @interface IC2SHandshakeReq
             * @property {string|null} [udid] C2SHandshakeReq udid
             */

            /**
             * Constructs a new C2SHandshakeReq.
             * @memberof proto.common
             * @classdesc Represents a C2SHandshakeReq.
             * @implements IC2SHandshakeReq
             * @constructor
             * @param {proto.common.IC2SHandshakeReq=} [properties] Properties to set
             */
            function C2SHandshakeReq(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * C2SHandshakeReq udid.
             * @member {string} udid
             * @memberof proto.common.C2SHandshakeReq
             * @instance
             */
            C2SHandshakeReq.prototype.udid = "";

            /**
             * Creates a new C2SHandshakeReq instance using the specified properties.
             * @function create
             * @memberof proto.common.C2SHandshakeReq
             * @static
             * @param {proto.common.IC2SHandshakeReq=} [properties] Properties to set
             * @returns {proto.common.C2SHandshakeReq} C2SHandshakeReq instance
             */
            C2SHandshakeReq.create = function create(properties) {
                return new C2SHandshakeReq(properties);
            };

            /**
             * Encodes the specified C2SHandshakeReq message. Does not implicitly {@link proto.common.C2SHandshakeReq.verify|verify} messages.
             * @function encode
             * @memberof proto.common.C2SHandshakeReq
             * @static
             * @param {proto.common.IC2SHandshakeReq} message C2SHandshakeReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            C2SHandshakeReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.udid != null && message.hasOwnProperty("udid"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.udid);
                return writer;
            };

            /**
             * Encodes the specified C2SHandshakeReq message, length delimited. Does not implicitly {@link proto.common.C2SHandshakeReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.common.C2SHandshakeReq
             * @static
             * @param {proto.common.IC2SHandshakeReq} message C2SHandshakeReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            C2SHandshakeReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a C2SHandshakeReq message from the specified reader or buffer.
             * @function decode
             * @memberof proto.common.C2SHandshakeReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.common.C2SHandshakeReq} C2SHandshakeReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            C2SHandshakeReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.common.C2SHandshakeReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.udid = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a C2SHandshakeReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.common.C2SHandshakeReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.common.C2SHandshakeReq} C2SHandshakeReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            C2SHandshakeReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a C2SHandshakeReq message.
             * @function verify
             * @memberof proto.common.C2SHandshakeReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            C2SHandshakeReq.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.udid != null && message.hasOwnProperty("udid"))
                    if (!$util.isString(message.udid))
                        return "udid: string expected";
                return null;
            };

            /**
             * Creates a C2SHandshakeReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.common.C2SHandshakeReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.common.C2SHandshakeReq} C2SHandshakeReq
             */
            C2SHandshakeReq.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.common.C2SHandshakeReq)
                    return object;
                var message = new $root.proto.common.C2SHandshakeReq();
                if (object.udid != null)
                    message.udid = String(object.udid);
                return message;
            };

            /**
             * Creates a plain object from a C2SHandshakeReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.common.C2SHandshakeReq
             * @static
             * @param {proto.common.C2SHandshakeReq} message C2SHandshakeReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            C2SHandshakeReq.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.udid = "";
                if (message.udid != null && message.hasOwnProperty("udid"))
                    object.udid = message.udid;
                return object;
            };

            /**
             * Converts this C2SHandshakeReq to JSON.
             * @function toJSON
             * @memberof proto.common.C2SHandshakeReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            C2SHandshakeReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return C2SHandshakeReq;
        })();

        common.S2CHandshakeResp = (function() {

            /**
             * Properties of a S2CHandshakeResp.
             * @memberof proto.common
             * @interface IS2CHandshakeResp
             * @property {string|null} [token] S2CHandshakeResp token
             */

            /**
             * Constructs a new S2CHandshakeResp.
             * @memberof proto.common
             * @classdesc Represents a S2CHandshakeResp.
             * @implements IS2CHandshakeResp
             * @constructor
             * @param {proto.common.IS2CHandshakeResp=} [properties] Properties to set
             */
            function S2CHandshakeResp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * S2CHandshakeResp token.
             * @member {string} token
             * @memberof proto.common.S2CHandshakeResp
             * @instance
             */
            S2CHandshakeResp.prototype.token = "";

            /**
             * Creates a new S2CHandshakeResp instance using the specified properties.
             * @function create
             * @memberof proto.common.S2CHandshakeResp
             * @static
             * @param {proto.common.IS2CHandshakeResp=} [properties] Properties to set
             * @returns {proto.common.S2CHandshakeResp} S2CHandshakeResp instance
             */
            S2CHandshakeResp.create = function create(properties) {
                return new S2CHandshakeResp(properties);
            };

            /**
             * Encodes the specified S2CHandshakeResp message. Does not implicitly {@link proto.common.S2CHandshakeResp.verify|verify} messages.
             * @function encode
             * @memberof proto.common.S2CHandshakeResp
             * @static
             * @param {proto.common.IS2CHandshakeResp} message S2CHandshakeResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            S2CHandshakeResp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.token != null && message.hasOwnProperty("token"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.token);
                return writer;
            };

            /**
             * Encodes the specified S2CHandshakeResp message, length delimited. Does not implicitly {@link proto.common.S2CHandshakeResp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.common.S2CHandshakeResp
             * @static
             * @param {proto.common.IS2CHandshakeResp} message S2CHandshakeResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            S2CHandshakeResp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a S2CHandshakeResp message from the specified reader or buffer.
             * @function decode
             * @memberof proto.common.S2CHandshakeResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.common.S2CHandshakeResp} S2CHandshakeResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            S2CHandshakeResp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.common.S2CHandshakeResp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.token = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a S2CHandshakeResp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.common.S2CHandshakeResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.common.S2CHandshakeResp} S2CHandshakeResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            S2CHandshakeResp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a S2CHandshakeResp message.
             * @function verify
             * @memberof proto.common.S2CHandshakeResp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            S2CHandshakeResp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.token != null && message.hasOwnProperty("token"))
                    if (!$util.isString(message.token))
                        return "token: string expected";
                return null;
            };

            /**
             * Creates a S2CHandshakeResp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.common.S2CHandshakeResp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.common.S2CHandshakeResp} S2CHandshakeResp
             */
            S2CHandshakeResp.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.common.S2CHandshakeResp)
                    return object;
                var message = new $root.proto.common.S2CHandshakeResp();
                if (object.token != null)
                    message.token = String(object.token);
                return message;
            };

            /**
             * Creates a plain object from a S2CHandshakeResp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.common.S2CHandshakeResp
             * @static
             * @param {proto.common.S2CHandshakeResp} message S2CHandshakeResp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            S2CHandshakeResp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.token = "";
                if (message.token != null && message.hasOwnProperty("token"))
                    object.token = message.token;
                return object;
            };

            /**
             * Converts this S2CHandshakeResp to JSON.
             * @function toJSON
             * @memberof proto.common.S2CHandshakeResp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            S2CHandshakeResp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return S2CHandshakeResp;
        })();

        /**
         * KickReason enum.
         * @name proto.common.KickReason
         * @enum {string}
         * @property {number} KICK_NO_REASON=0 KICK_NO_REASON value
         * @property {number} KICK_LOGIN_ELSEWHERE=1 KICK_LOGIN_ELSEWHERE value
         * @property {number} KICK_SESSION_EXPIRED=2 KICK_SESSION_EXPIRED value
         * @property {number} KICK_ILLEGAL_OPERATION=3 KICK_ILLEGAL_OPERATION value
         * @property {number} KICK_BANNED=4 KICK_BANNED value
         */
        common.KickReason = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "KICK_NO_REASON"] = 0;
            values[valuesById[1] = "KICK_LOGIN_ELSEWHERE"] = 1;
            values[valuesById[2] = "KICK_SESSION_EXPIRED"] = 2;
            values[valuesById[3] = "KICK_ILLEGAL_OPERATION"] = 3;
            values[valuesById[4] = "KICK_BANNED"] = 4;
            return values;
        })();

        common.S2CKickNotify = (function() {

            /**
             * Properties of a S2CKickNotify.
             * @memberof proto.common
             * @interface IS2CKickNotify
             * @property {proto.common.KickReason|null} [reason] S2CKickNotify reason
             * @property {string|null} [msg] S2CKickNotify msg
             */

            /**
             * Constructs a new S2CKickNotify.
             * @memberof proto.common
             * @classdesc Represents a S2CKickNotify.
             * @implements IS2CKickNotify
             * @constructor
             * @param {proto.common.IS2CKickNotify=} [properties] Properties to set
             */
            function S2CKickNotify(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * S2CKickNotify reason.
             * @member {proto.common.KickReason} reason
             * @memberof proto.common.S2CKickNotify
             * @instance
             */
            S2CKickNotify.prototype.reason = 0;

            /**
             * S2CKickNotify msg.
             * @member {string} msg
             * @memberof proto.common.S2CKickNotify
             * @instance
             */
            S2CKickNotify.prototype.msg = "";

            /**
             * Creates a new S2CKickNotify instance using the specified properties.
             * @function create
             * @memberof proto.common.S2CKickNotify
             * @static
             * @param {proto.common.IS2CKickNotify=} [properties] Properties to set
             * @returns {proto.common.S2CKickNotify} S2CKickNotify instance
             */
            S2CKickNotify.create = function create(properties) {
                return new S2CKickNotify(properties);
            };

            /**
             * Encodes the specified S2CKickNotify message. Does not implicitly {@link proto.common.S2CKickNotify.verify|verify} messages.
             * @function encode
             * @memberof proto.common.S2CKickNotify
             * @static
             * @param {proto.common.IS2CKickNotify} message S2CKickNotify message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            S2CKickNotify.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.reason != null && message.hasOwnProperty("reason"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.reason);
                if (message.msg != null && message.hasOwnProperty("msg"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.msg);
                return writer;
            };

            /**
             * Encodes the specified S2CKickNotify message, length delimited. Does not implicitly {@link proto.common.S2CKickNotify.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.common.S2CKickNotify
             * @static
             * @param {proto.common.IS2CKickNotify} message S2CKickNotify message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            S2CKickNotify.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a S2CKickNotify message from the specified reader or buffer.
             * @function decode
             * @memberof proto.common.S2CKickNotify
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.common.S2CKickNotify} S2CKickNotify
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            S2CKickNotify.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.common.S2CKickNotify();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 2:
                        message.reason = reader.int32();
                        break;
                    case 3:
                        message.msg = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a S2CKickNotify message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.common.S2CKickNotify
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.common.S2CKickNotify} S2CKickNotify
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            S2CKickNotify.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a S2CKickNotify message.
             * @function verify
             * @memberof proto.common.S2CKickNotify
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            S2CKickNotify.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.reason != null && message.hasOwnProperty("reason"))
                    switch (message.reason) {
                    default:
                        return "reason: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                if (message.msg != null && message.hasOwnProperty("msg"))
                    if (!$util.isString(message.msg))
                        return "msg: string expected";
                return null;
            };

            /**
             * Creates a S2CKickNotify message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.common.S2CKickNotify
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.common.S2CKickNotify} S2CKickNotify
             */
            S2CKickNotify.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.common.S2CKickNotify)
                    return object;
                var message = new $root.proto.common.S2CKickNotify();
                switch (object.reason) {
                case "KICK_NO_REASON":
                case 0:
                    message.reason = 0;
                    break;
                case "KICK_LOGIN_ELSEWHERE":
                case 1:
                    message.reason = 1;
                    break;
                case "KICK_SESSION_EXPIRED":
                case 2:
                    message.reason = 2;
                    break;
                case "KICK_ILLEGAL_OPERATION":
                case 3:
                    message.reason = 3;
                    break;
                case "KICK_BANNED":
                case 4:
                    message.reason = 4;
                    break;
                }
                if (object.msg != null)
                    message.msg = String(object.msg);
                return message;
            };

            /**
             * Creates a plain object from a S2CKickNotify message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.common.S2CKickNotify
             * @static
             * @param {proto.common.S2CKickNotify} message S2CKickNotify
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            S2CKickNotify.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.reason = options.enums === String ? "KICK_NO_REASON" : 0;
                    object.msg = "";
                }
                if (message.reason != null && message.hasOwnProperty("reason"))
                    object.reason = options.enums === String ? $root.proto.common.KickReason[message.reason] : message.reason;
                if (message.msg != null && message.hasOwnProperty("msg"))
                    object.msg = message.msg;
                return object;
            };

            /**
             * Converts this S2CKickNotify to JSON.
             * @function toJSON
             * @memberof proto.common.S2CKickNotify
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            S2CKickNotify.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return S2CKickNotify;
        })();

        return common;
    })();

    proto.game = (function() {

        /**
         * Namespace game.
         * @memberof proto
         * @namespace
         */
        var game = {};

        /**
         * GameCmd enum.
         * @name proto.game.GameCmd
         * @enum {string}
         * @property {number} GAME_RESERVED=0 GAME_RESERVED value
         * @property {number} ENTER_GAME_REQ=8193 ENTER_GAME_REQ value
         * @property {number} ENTER_GAME_RESP=8194 ENTER_GAME_RESP value
         * @property {number} ACTION_REQ=8195 ACTION_REQ value
         * @property {number} ACTION_RESP=8196 ACTION_RESP value
         * @property {number} EVENT_NTY=8198 EVENT_NTY value
         * @property {number} PLAYER_JOIN_NTY=8200 PLAYER_JOIN_NTY value
         * @property {number} PLAYER_LEFT_NTY=8202 PLAYER_LEFT_NTY value
         * @property {number} GAME_START_NTY=8204 GAME_START_NTY value
         * @property {number} GAME_OVER_NTY=8206 GAME_OVER_NTY value
         */
        game.GameCmd = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "GAME_RESERVED"] = 0;
            values[valuesById[8193] = "ENTER_GAME_REQ"] = 8193;
            values[valuesById[8194] = "ENTER_GAME_RESP"] = 8194;
            values[valuesById[8195] = "ACTION_REQ"] = 8195;
            values[valuesById[8196] = "ACTION_RESP"] = 8196;
            values[valuesById[8198] = "EVENT_NTY"] = 8198;
            values[valuesById[8200] = "PLAYER_JOIN_NTY"] = 8200;
            values[valuesById[8202] = "PLAYER_LEFT_NTY"] = 8202;
            values[valuesById[8204] = "GAME_START_NTY"] = 8204;
            values[valuesById[8206] = "GAME_OVER_NTY"] = 8206;
            return values;
        })();

        /**
         * Event enum.
         * @name proto.game.Event
         * @enum {string}
         * @property {number} EVENT_RESERVED=0 EVENT_RESERVED value
         * @property {number} EVENT_TURN=1 EVENT_TURN value
         * @property {number} EVENT_PLAY=2 EVENT_PLAY value
         * @property {number} EVENT_UNO_PLAY=3 EVENT_UNO_PLAY value
         * @property {number} EVENT_DRAW=4 EVENT_DRAW value
         * @property {number} EVENT_KEEP=5 EVENT_KEEP value
         * @property {number} EVENT_SKIP=6 EVENT_SKIP value
         * @property {number} EVENT_CHALLENGE=7 EVENT_CHALLENGE value
         * @property {number} EVENT_CHALLENGE_PENALTY=8 EVENT_CHALLENGE_PENALTY value
         * @property {number} EVENT_TIMEOUT=9 EVENT_TIMEOUT value
         * @property {number} EVENT_DECK_SHUFFLE=10 EVENT_DECK_SHUFFLE value
         * @property {number} EVENT_REVERSE=11 EVENT_REVERSE value
         */
        game.Event = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "EVENT_RESERVED"] = 0;
            values[valuesById[1] = "EVENT_TURN"] = 1;
            values[valuesById[2] = "EVENT_PLAY"] = 2;
            values[valuesById[3] = "EVENT_UNO_PLAY"] = 3;
            values[valuesById[4] = "EVENT_DRAW"] = 4;
            values[valuesById[5] = "EVENT_KEEP"] = 5;
            values[valuesById[6] = "EVENT_SKIP"] = 6;
            values[valuesById[7] = "EVENT_CHALLENGE"] = 7;
            values[valuesById[8] = "EVENT_CHALLENGE_PENALTY"] = 8;
            values[valuesById[9] = "EVENT_TIMEOUT"] = 9;
            values[valuesById[10] = "EVENT_DECK_SHUFFLE"] = 10;
            values[valuesById[11] = "EVENT_REVERSE"] = 11;
            return values;
        })();

        /**
         * Action enum.
         * @name proto.game.Action
         * @enum {string}
         * @property {number} ACTION_RESERVED=0 ACTION_RESERVED value
         * @property {number} ACTION_PLAY=1 ACTION_PLAY value
         * @property {number} ACTION_UNO_PLAY=2 ACTION_UNO_PLAY value
         * @property {number} ACTION_DRAW=3 ACTION_DRAW value
         * @property {number} ACTION_KEEP=4 ACTION_KEEP value
         * @property {number} ACTION_CHALLENGE=5 ACTION_CHALLENGE value
         * @property {number} ACTION_ACCEPT=6 ACTION_ACCEPT value
         */
        game.Action = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "ACTION_RESERVED"] = 0;
            values[valuesById[1] = "ACTION_PLAY"] = 1;
            values[valuesById[2] = "ACTION_UNO_PLAY"] = 2;
            values[valuesById[3] = "ACTION_DRAW"] = 3;
            values[valuesById[4] = "ACTION_KEEP"] = 4;
            values[valuesById[5] = "ACTION_CHALLENGE"] = 5;
            values[valuesById[6] = "ACTION_ACCEPT"] = 6;
            return values;
        })();

        /**
         * ActionResult enum.
         * @name proto.game.ActionResult
         * @enum {string}
         * @property {number} ACTION_RESULT_OK=0 ACTION_RESULT_OK value
         * @property {number} ACTION_RESULT_GAME_NOT_START=1 ACTION_RESULT_GAME_NOT_START value
         * @property {number} ACTION_RESULT_NOT_TURN=2 ACTION_RESULT_NOT_TURN value
         * @property {number} ACTION_RESULT_CARD_NOT_EXIST=3 ACTION_RESULT_CARD_NOT_EXIST value
         * @property {number} ACTION_RESULT_NOT_DRAW_CARD=4 ACTION_RESULT_NOT_DRAW_CARD value
         * @property {number} ACTION_RESULT_NEED_COLOR=5 ACTION_RESULT_NEED_COLOR value
         * @property {number} ACTION_RESULT_INVALID=6 ACTION_RESULT_INVALID value
         */
        game.ActionResult = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "ACTION_RESULT_OK"] = 0;
            values[valuesById[1] = "ACTION_RESULT_GAME_NOT_START"] = 1;
            values[valuesById[2] = "ACTION_RESULT_NOT_TURN"] = 2;
            values[valuesById[3] = "ACTION_RESULT_CARD_NOT_EXIST"] = 3;
            values[valuesById[4] = "ACTION_RESULT_NOT_DRAW_CARD"] = 4;
            values[valuesById[5] = "ACTION_RESULT_NEED_COLOR"] = 5;
            values[valuesById[6] = "ACTION_RESULT_INVALID"] = 6;
            return values;
        })();

        /**
         * CardColor enum.
         * @name proto.game.CardColor
         * @enum {string}
         * @property {number} COLOR_WILD=0 COLOR_WILD value
         * @property {number} COLOR_RED=16 COLOR_RED value
         * @property {number} COLOR_YELLOW=32 COLOR_YELLOW value
         * @property {number} COLOR_BLUE=48 COLOR_BLUE value
         * @property {number} COLOR_GREEN=64 COLOR_GREEN value
         */
        game.CardColor = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "COLOR_WILD"] = 0;
            values[valuesById[16] = "COLOR_RED"] = 16;
            values[valuesById[32] = "COLOR_YELLOW"] = 32;
            values[valuesById[48] = "COLOR_BLUE"] = 48;
            values[valuesById[64] = "COLOR_GREEN"] = 64;
            return values;
        })();

        /**
         * PlayerStatus enum.
         * @name proto.game.PlayerStatus
         * @enum {string}
         * @property {number} STATUS_DEFAULT=0 STATUS_DEFAULT value
         * @property {number} STATUS_UNO=1 STATUS_UNO value
         * @property {number} STATUS_DRAW=2 STATUS_DRAW value
         * @property {number} STATUS_CHALLENGE=4 STATUS_CHALLENGE value
         */
        game.PlayerStatus = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "STATUS_DEFAULT"] = 0;
            values[valuesById[1] = "STATUS_UNO"] = 1;
            values[valuesById[2] = "STATUS_DRAW"] = 2;
            values[valuesById[4] = "STATUS_CHALLENGE"] = 4;
            return values;
        })();

        game.UnoPlayer = (function() {

            /**
             * Properties of an UnoPlayer.
             * @memberof proto.game
             * @interface IUnoPlayer
             * @property {number|Long|null} [uid] UnoPlayer uid
             * @property {number|null} [status] UnoPlayer status
             * @property {Uint8Array|null} [cards] UnoPlayer cards
             * @property {number|null} [score] UnoPlayer score
             */

            /**
             * Constructs a new UnoPlayer.
             * @memberof proto.game
             * @classdesc Represents an UnoPlayer.
             * @implements IUnoPlayer
             * @constructor
             * @param {proto.game.IUnoPlayer=} [properties] Properties to set
             */
            function UnoPlayer(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UnoPlayer uid.
             * @member {number|Long} uid
             * @memberof proto.game.UnoPlayer
             * @instance
             */
            UnoPlayer.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * UnoPlayer status.
             * @member {number} status
             * @memberof proto.game.UnoPlayer
             * @instance
             */
            UnoPlayer.prototype.status = 0;

            /**
             * UnoPlayer cards.
             * @member {Uint8Array} cards
             * @memberof proto.game.UnoPlayer
             * @instance
             */
            UnoPlayer.prototype.cards = $util.newBuffer([]);

            /**
             * UnoPlayer score.
             * @member {number} score
             * @memberof proto.game.UnoPlayer
             * @instance
             */
            UnoPlayer.prototype.score = 0;

            /**
             * Creates a new UnoPlayer instance using the specified properties.
             * @function create
             * @memberof proto.game.UnoPlayer
             * @static
             * @param {proto.game.IUnoPlayer=} [properties] Properties to set
             * @returns {proto.game.UnoPlayer} UnoPlayer instance
             */
            UnoPlayer.create = function create(properties) {
                return new UnoPlayer(properties);
            };

            /**
             * Encodes the specified UnoPlayer message. Does not implicitly {@link proto.game.UnoPlayer.verify|verify} messages.
             * @function encode
             * @memberof proto.game.UnoPlayer
             * @static
             * @param {proto.game.IUnoPlayer} message UnoPlayer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UnoPlayer.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 1, wireType 1 =*/9).fixed64(message.uid);
                if (message.status != null && message.hasOwnProperty("status"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.status);
                if (message.cards != null && message.hasOwnProperty("cards"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.cards);
                if (message.score != null && message.hasOwnProperty("score"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.score);
                return writer;
            };

            /**
             * Encodes the specified UnoPlayer message, length delimited. Does not implicitly {@link proto.game.UnoPlayer.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.game.UnoPlayer
             * @static
             * @param {proto.game.IUnoPlayer} message UnoPlayer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UnoPlayer.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an UnoPlayer message from the specified reader or buffer.
             * @function decode
             * @memberof proto.game.UnoPlayer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.game.UnoPlayer} UnoPlayer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UnoPlayer.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.game.UnoPlayer();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.fixed64();
                        break;
                    case 3:
                        message.status = reader.int32();
                        break;
                    case 4:
                        message.cards = reader.bytes();
                        break;
                    case 5:
                        message.score = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an UnoPlayer message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.game.UnoPlayer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.game.UnoPlayer} UnoPlayer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UnoPlayer.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an UnoPlayer message.
             * @function verify
             * @memberof proto.game.UnoPlayer
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UnoPlayer.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                        return "uid: integer|Long expected";
                if (message.status != null && message.hasOwnProperty("status"))
                    if (!$util.isInteger(message.status))
                        return "status: integer expected";
                if (message.cards != null && message.hasOwnProperty("cards"))
                    if (!(message.cards && typeof message.cards.length === "number" || $util.isString(message.cards)))
                        return "cards: buffer expected";
                if (message.score != null && message.hasOwnProperty("score"))
                    if (!$util.isInteger(message.score))
                        return "score: integer expected";
                return null;
            };

            /**
             * Creates an UnoPlayer message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.game.UnoPlayer
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.game.UnoPlayer} UnoPlayer
             */
            UnoPlayer.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.game.UnoPlayer)
                    return object;
                var message = new $root.proto.game.UnoPlayer();
                if (object.uid != null)
                    if ($util.Long)
                        (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;
                    else if (typeof object.uid === "string")
                        message.uid = parseInt(object.uid, 10);
                    else if (typeof object.uid === "number")
                        message.uid = object.uid;
                    else if (typeof object.uid === "object")
                        message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
                if (object.status != null)
                    message.status = object.status | 0;
                if (object.cards != null)
                    if (typeof object.cards === "string")
                        $util.base64.decode(object.cards, message.cards = $util.newBuffer($util.base64.length(object.cards)), 0);
                    else if (object.cards.length)
                        message.cards = object.cards;
                if (object.score != null)
                    message.score = object.score | 0;
                return message;
            };

            /**
             * Creates a plain object from an UnoPlayer message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.game.UnoPlayer
             * @static
             * @param {proto.game.UnoPlayer} message UnoPlayer
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UnoPlayer.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.uid = options.longs === String ? "0" : 0;
                    object.status = 0;
                    if (options.bytes === String)
                        object.cards = "";
                    else {
                        object.cards = [];
                        if (options.bytes !== Array)
                            object.cards = $util.newBuffer(object.cards);
                    }
                    object.score = 0;
                }
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (typeof message.uid === "number")
                        object.uid = options.longs === String ? String(message.uid) : message.uid;
                    else
                        object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = message.status;
                if (message.cards != null && message.hasOwnProperty("cards"))
                    object.cards = options.bytes === String ? $util.base64.encode(message.cards, 0, message.cards.length) : options.bytes === Array ? Array.prototype.slice.call(message.cards) : message.cards;
                if (message.score != null && message.hasOwnProperty("score"))
                    object.score = message.score;
                return object;
            };

            /**
             * Converts this UnoPlayer to JSON.
             * @function toJSON
             * @memberof proto.game.UnoPlayer
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UnoPlayer.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UnoPlayer;
        })();

        /**
         * TableStatus enum.
         * @name proto.game.TableStatus
         * @enum {string}
         * @property {number} STATUS_IDLE=0 STATUS_IDLE value
         * @property {number} STATUS_WAIT=1 STATUS_WAIT value
         * @property {number} STATUS_PLAYING=2 STATUS_PLAYING value
         * @property {number} STATUS_GAME_OVER=3 STATUS_GAME_OVER value
         */
        game.TableStatus = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "STATUS_IDLE"] = 0;
            values[valuesById[1] = "STATUS_WAIT"] = 1;
            values[valuesById[2] = "STATUS_PLAYING"] = 2;
            values[valuesById[3] = "STATUS_GAME_OVER"] = 3;
            return values;
        })();

        game.TableState = (function() {

            /**
             * Properties of a TableState.
             * @memberof proto.game
             * @interface ITableState
             * @property {number|Long|null} [tid] TableState tid
             * @property {proto.game.TableStatus|null} [status] TableState status
             * @property {number|null} [timeout] TableState timeout
             * @property {number|null} [timeLeft] TableState timeLeft
             * @property {boolean|null} [clockwise] TableState clockwise
             * @property {number|null} [color] TableState color
             * @property {number|null} [challengeColor] TableState challengeColor
             * @property {number|Long|null} [lastPlayer] TableState lastPlayer
             * @property {number|Long|null} [currentPlayer] TableState currentPlayer
             * @property {number|null} [cardsLeft] TableState cardsLeft
             * @property {Uint8Array|null} [discardPile] TableState discardPile
             * @property {Array.<proto.game.IUnoPlayer>|null} [players] TableState players
             */

            /**
             * Constructs a new TableState.
             * @memberof proto.game
             * @classdesc Represents a TableState.
             * @implements ITableState
             * @constructor
             * @param {proto.game.ITableState=} [properties] Properties to set
             */
            function TableState(properties) {
                this.players = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TableState tid.
             * @member {number|Long} tid
             * @memberof proto.game.TableState
             * @instance
             */
            TableState.prototype.tid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * TableState status.
             * @member {proto.game.TableStatus} status
             * @memberof proto.game.TableState
             * @instance
             */
            TableState.prototype.status = 0;

            /**
             * TableState timeout.
             * @member {number} timeout
             * @memberof proto.game.TableState
             * @instance
             */
            TableState.prototype.timeout = 0;

            /**
             * TableState timeLeft.
             * @member {number} timeLeft
             * @memberof proto.game.TableState
             * @instance
             */
            TableState.prototype.timeLeft = 0;

            /**
             * TableState clockwise.
             * @member {boolean} clockwise
             * @memberof proto.game.TableState
             * @instance
             */
            TableState.prototype.clockwise = false;

            /**
             * TableState color.
             * @member {number} color
             * @memberof proto.game.TableState
             * @instance
             */
            TableState.prototype.color = 0;

            /**
             * TableState challengeColor.
             * @member {number} challengeColor
             * @memberof proto.game.TableState
             * @instance
             */
            TableState.prototype.challengeColor = 0;

            /**
             * TableState lastPlayer.
             * @member {number|Long} lastPlayer
             * @memberof proto.game.TableState
             * @instance
             */
            TableState.prototype.lastPlayer = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * TableState currentPlayer.
             * @member {number|Long} currentPlayer
             * @memberof proto.game.TableState
             * @instance
             */
            TableState.prototype.currentPlayer = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * TableState cardsLeft.
             * @member {number} cardsLeft
             * @memberof proto.game.TableState
             * @instance
             */
            TableState.prototype.cardsLeft = 0;

            /**
             * TableState discardPile.
             * @member {Uint8Array} discardPile
             * @memberof proto.game.TableState
             * @instance
             */
            TableState.prototype.discardPile = $util.newBuffer([]);

            /**
             * TableState players.
             * @member {Array.<proto.game.IUnoPlayer>} players
             * @memberof proto.game.TableState
             * @instance
             */
            TableState.prototype.players = $util.emptyArray;

            /**
             * Creates a new TableState instance using the specified properties.
             * @function create
             * @memberof proto.game.TableState
             * @static
             * @param {proto.game.ITableState=} [properties] Properties to set
             * @returns {proto.game.TableState} TableState instance
             */
            TableState.create = function create(properties) {
                return new TableState(properties);
            };

            /**
             * Encodes the specified TableState message. Does not implicitly {@link proto.game.TableState.verify|verify} messages.
             * @function encode
             * @memberof proto.game.TableState
             * @static
             * @param {proto.game.ITableState} message TableState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TableState.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.tid != null && message.hasOwnProperty("tid"))
                    writer.uint32(/* id 1, wireType 1 =*/9).fixed64(message.tid);
                if (message.status != null && message.hasOwnProperty("status"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
                if (message.timeout != null && message.hasOwnProperty("timeout"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.timeout);
                if (message.timeLeft != null && message.hasOwnProperty("timeLeft"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.timeLeft);
                if (message.clockwise != null && message.hasOwnProperty("clockwise"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.clockwise);
                if (message.color != null && message.hasOwnProperty("color"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.color);
                if (message.challengeColor != null && message.hasOwnProperty("challengeColor"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int32(message.challengeColor);
                if (message.lastPlayer != null && message.hasOwnProperty("lastPlayer"))
                    writer.uint32(/* id 8, wireType 1 =*/65).fixed64(message.lastPlayer);
                if (message.currentPlayer != null && message.hasOwnProperty("currentPlayer"))
                    writer.uint32(/* id 9, wireType 1 =*/73).fixed64(message.currentPlayer);
                if (message.cardsLeft != null && message.hasOwnProperty("cardsLeft"))
                    writer.uint32(/* id 10, wireType 0 =*/80).int32(message.cardsLeft);
                if (message.discardPile != null && message.hasOwnProperty("discardPile"))
                    writer.uint32(/* id 11, wireType 2 =*/90).bytes(message.discardPile);
                if (message.players != null && message.players.length)
                    for (var i = 0; i < message.players.length; ++i)
                        $root.proto.game.UnoPlayer.encode(message.players[i], writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified TableState message, length delimited. Does not implicitly {@link proto.game.TableState.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.game.TableState
             * @static
             * @param {proto.game.ITableState} message TableState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TableState.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TableState message from the specified reader or buffer.
             * @function decode
             * @memberof proto.game.TableState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.game.TableState} TableState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TableState.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.game.TableState();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.tid = reader.fixed64();
                        break;
                    case 2:
                        message.status = reader.int32();
                        break;
                    case 3:
                        message.timeout = reader.int32();
                        break;
                    case 4:
                        message.timeLeft = reader.int32();
                        break;
                    case 5:
                        message.clockwise = reader.bool();
                        break;
                    case 6:
                        message.color = reader.int32();
                        break;
                    case 7:
                        message.challengeColor = reader.int32();
                        break;
                    case 8:
                        message.lastPlayer = reader.fixed64();
                        break;
                    case 9:
                        message.currentPlayer = reader.fixed64();
                        break;
                    case 10:
                        message.cardsLeft = reader.int32();
                        break;
                    case 11:
                        message.discardPile = reader.bytes();
                        break;
                    case 12:
                        if (!(message.players && message.players.length))
                            message.players = [];
                        message.players.push($root.proto.game.UnoPlayer.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TableState message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.game.TableState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.game.TableState} TableState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TableState.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TableState message.
             * @function verify
             * @memberof proto.game.TableState
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TableState.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.tid != null && message.hasOwnProperty("tid"))
                    if (!$util.isInteger(message.tid) && !(message.tid && $util.isInteger(message.tid.low) && $util.isInteger(message.tid.high)))
                        return "tid: integer|Long expected";
                if (message.status != null && message.hasOwnProperty("status"))
                    switch (message.status) {
                    default:
                        return "status: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.timeout != null && message.hasOwnProperty("timeout"))
                    if (!$util.isInteger(message.timeout))
                        return "timeout: integer expected";
                if (message.timeLeft != null && message.hasOwnProperty("timeLeft"))
                    if (!$util.isInteger(message.timeLeft))
                        return "timeLeft: integer expected";
                if (message.clockwise != null && message.hasOwnProperty("clockwise"))
                    if (typeof message.clockwise !== "boolean")
                        return "clockwise: boolean expected";
                if (message.color != null && message.hasOwnProperty("color"))
                    if (!$util.isInteger(message.color))
                        return "color: integer expected";
                if (message.challengeColor != null && message.hasOwnProperty("challengeColor"))
                    if (!$util.isInteger(message.challengeColor))
                        return "challengeColor: integer expected";
                if (message.lastPlayer != null && message.hasOwnProperty("lastPlayer"))
                    if (!$util.isInteger(message.lastPlayer) && !(message.lastPlayer && $util.isInteger(message.lastPlayer.low) && $util.isInteger(message.lastPlayer.high)))
                        return "lastPlayer: integer|Long expected";
                if (message.currentPlayer != null && message.hasOwnProperty("currentPlayer"))
                    if (!$util.isInteger(message.currentPlayer) && !(message.currentPlayer && $util.isInteger(message.currentPlayer.low) && $util.isInteger(message.currentPlayer.high)))
                        return "currentPlayer: integer|Long expected";
                if (message.cardsLeft != null && message.hasOwnProperty("cardsLeft"))
                    if (!$util.isInteger(message.cardsLeft))
                        return "cardsLeft: integer expected";
                if (message.discardPile != null && message.hasOwnProperty("discardPile"))
                    if (!(message.discardPile && typeof message.discardPile.length === "number" || $util.isString(message.discardPile)))
                        return "discardPile: buffer expected";
                if (message.players != null && message.hasOwnProperty("players")) {
                    if (!Array.isArray(message.players))
                        return "players: array expected";
                    for (var i = 0; i < message.players.length; ++i) {
                        var error = $root.proto.game.UnoPlayer.verify(message.players[i]);
                        if (error)
                            return "players." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a TableState message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.game.TableState
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.game.TableState} TableState
             */
            TableState.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.game.TableState)
                    return object;
                var message = new $root.proto.game.TableState();
                if (object.tid != null)
                    if ($util.Long)
                        (message.tid = $util.Long.fromValue(object.tid)).unsigned = false;
                    else if (typeof object.tid === "string")
                        message.tid = parseInt(object.tid, 10);
                    else if (typeof object.tid === "number")
                        message.tid = object.tid;
                    else if (typeof object.tid === "object")
                        message.tid = new $util.LongBits(object.tid.low >>> 0, object.tid.high >>> 0).toNumber();
                switch (object.status) {
                case "STATUS_IDLE":
                case 0:
                    message.status = 0;
                    break;
                case "STATUS_WAIT":
                case 1:
                    message.status = 1;
                    break;
                case "STATUS_PLAYING":
                case 2:
                    message.status = 2;
                    break;
                case "STATUS_GAME_OVER":
                case 3:
                    message.status = 3;
                    break;
                }
                if (object.timeout != null)
                    message.timeout = object.timeout | 0;
                if (object.timeLeft != null)
                    message.timeLeft = object.timeLeft | 0;
                if (object.clockwise != null)
                    message.clockwise = Boolean(object.clockwise);
                if (object.color != null)
                    message.color = object.color | 0;
                if (object.challengeColor != null)
                    message.challengeColor = object.challengeColor | 0;
                if (object.lastPlayer != null)
                    if ($util.Long)
                        (message.lastPlayer = $util.Long.fromValue(object.lastPlayer)).unsigned = false;
                    else if (typeof object.lastPlayer === "string")
                        message.lastPlayer = parseInt(object.lastPlayer, 10);
                    else if (typeof object.lastPlayer === "number")
                        message.lastPlayer = object.lastPlayer;
                    else if (typeof object.lastPlayer === "object")
                        message.lastPlayer = new $util.LongBits(object.lastPlayer.low >>> 0, object.lastPlayer.high >>> 0).toNumber();
                if (object.currentPlayer != null)
                    if ($util.Long)
                        (message.currentPlayer = $util.Long.fromValue(object.currentPlayer)).unsigned = false;
                    else if (typeof object.currentPlayer === "string")
                        message.currentPlayer = parseInt(object.currentPlayer, 10);
                    else if (typeof object.currentPlayer === "number")
                        message.currentPlayer = object.currentPlayer;
                    else if (typeof object.currentPlayer === "object")
                        message.currentPlayer = new $util.LongBits(object.currentPlayer.low >>> 0, object.currentPlayer.high >>> 0).toNumber();
                if (object.cardsLeft != null)
                    message.cardsLeft = object.cardsLeft | 0;
                if (object.discardPile != null)
                    if (typeof object.discardPile === "string")
                        $util.base64.decode(object.discardPile, message.discardPile = $util.newBuffer($util.base64.length(object.discardPile)), 0);
                    else if (object.discardPile.length)
                        message.discardPile = object.discardPile;
                if (object.players) {
                    if (!Array.isArray(object.players))
                        throw TypeError(".proto.game.TableState.players: array expected");
                    message.players = [];
                    for (var i = 0; i < object.players.length; ++i) {
                        if (typeof object.players[i] !== "object")
                            throw TypeError(".proto.game.TableState.players: object expected");
                        message.players[i] = $root.proto.game.UnoPlayer.fromObject(object.players[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a TableState message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.game.TableState
             * @static
             * @param {proto.game.TableState} message TableState
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TableState.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.players = [];
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.tid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.tid = options.longs === String ? "0" : 0;
                    object.status = options.enums === String ? "STATUS_IDLE" : 0;
                    object.timeout = 0;
                    object.timeLeft = 0;
                    object.clockwise = false;
                    object.color = 0;
                    object.challengeColor = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.lastPlayer = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.lastPlayer = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.currentPlayer = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.currentPlayer = options.longs === String ? "0" : 0;
                    object.cardsLeft = 0;
                    if (options.bytes === String)
                        object.discardPile = "";
                    else {
                        object.discardPile = [];
                        if (options.bytes !== Array)
                            object.discardPile = $util.newBuffer(object.discardPile);
                    }
                }
                if (message.tid != null && message.hasOwnProperty("tid"))
                    if (typeof message.tid === "number")
                        object.tid = options.longs === String ? String(message.tid) : message.tid;
                    else
                        object.tid = options.longs === String ? $util.Long.prototype.toString.call(message.tid) : options.longs === Number ? new $util.LongBits(message.tid.low >>> 0, message.tid.high >>> 0).toNumber() : message.tid;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = options.enums === String ? $root.proto.game.TableStatus[message.status] : message.status;
                if (message.timeout != null && message.hasOwnProperty("timeout"))
                    object.timeout = message.timeout;
                if (message.timeLeft != null && message.hasOwnProperty("timeLeft"))
                    object.timeLeft = message.timeLeft;
                if (message.clockwise != null && message.hasOwnProperty("clockwise"))
                    object.clockwise = message.clockwise;
                if (message.color != null && message.hasOwnProperty("color"))
                    object.color = message.color;
                if (message.challengeColor != null && message.hasOwnProperty("challengeColor"))
                    object.challengeColor = message.challengeColor;
                if (message.lastPlayer != null && message.hasOwnProperty("lastPlayer"))
                    if (typeof message.lastPlayer === "number")
                        object.lastPlayer = options.longs === String ? String(message.lastPlayer) : message.lastPlayer;
                    else
                        object.lastPlayer = options.longs === String ? $util.Long.prototype.toString.call(message.lastPlayer) : options.longs === Number ? new $util.LongBits(message.lastPlayer.low >>> 0, message.lastPlayer.high >>> 0).toNumber() : message.lastPlayer;
                if (message.currentPlayer != null && message.hasOwnProperty("currentPlayer"))
                    if (typeof message.currentPlayer === "number")
                        object.currentPlayer = options.longs === String ? String(message.currentPlayer) : message.currentPlayer;
                    else
                        object.currentPlayer = options.longs === String ? $util.Long.prototype.toString.call(message.currentPlayer) : options.longs === Number ? new $util.LongBits(message.currentPlayer.low >>> 0, message.currentPlayer.high >>> 0).toNumber() : message.currentPlayer;
                if (message.cardsLeft != null && message.hasOwnProperty("cardsLeft"))
                    object.cardsLeft = message.cardsLeft;
                if (message.discardPile != null && message.hasOwnProperty("discardPile"))
                    object.discardPile = options.bytes === String ? $util.base64.encode(message.discardPile, 0, message.discardPile.length) : options.bytes === Array ? Array.prototype.slice.call(message.discardPile) : message.discardPile;
                if (message.players && message.players.length) {
                    object.players = [];
                    for (var j = 0; j < message.players.length; ++j)
                        object.players[j] = $root.proto.game.UnoPlayer.toObject(message.players[j], options);
                }
                return object;
            };

            /**
             * Converts this TableState to JSON.
             * @function toJSON
             * @memberof proto.game.TableState
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TableState.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TableState;
        })();

        game.S2CPlayerJoinNty = (function() {

            /**
             * Properties of a S2CPlayerJoinNty.
             * @memberof proto.game
             * @interface IS2CPlayerJoinNty
             * @property {number|Long|null} [uid] S2CPlayerJoinNty uid
             */

            /**
             * Constructs a new S2CPlayerJoinNty.
             * @memberof proto.game
             * @classdesc Represents a S2CPlayerJoinNty.
             * @implements IS2CPlayerJoinNty
             * @constructor
             * @param {proto.game.IS2CPlayerJoinNty=} [properties] Properties to set
             */
            function S2CPlayerJoinNty(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * S2CPlayerJoinNty uid.
             * @member {number|Long} uid
             * @memberof proto.game.S2CPlayerJoinNty
             * @instance
             */
            S2CPlayerJoinNty.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new S2CPlayerJoinNty instance using the specified properties.
             * @function create
             * @memberof proto.game.S2CPlayerJoinNty
             * @static
             * @param {proto.game.IS2CPlayerJoinNty=} [properties] Properties to set
             * @returns {proto.game.S2CPlayerJoinNty} S2CPlayerJoinNty instance
             */
            S2CPlayerJoinNty.create = function create(properties) {
                return new S2CPlayerJoinNty(properties);
            };

            /**
             * Encodes the specified S2CPlayerJoinNty message. Does not implicitly {@link proto.game.S2CPlayerJoinNty.verify|verify} messages.
             * @function encode
             * @memberof proto.game.S2CPlayerJoinNty
             * @static
             * @param {proto.game.IS2CPlayerJoinNty} message S2CPlayerJoinNty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            S2CPlayerJoinNty.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 1, wireType 1 =*/9).fixed64(message.uid);
                return writer;
            };

            /**
             * Encodes the specified S2CPlayerJoinNty message, length delimited. Does not implicitly {@link proto.game.S2CPlayerJoinNty.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.game.S2CPlayerJoinNty
             * @static
             * @param {proto.game.IS2CPlayerJoinNty} message S2CPlayerJoinNty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            S2CPlayerJoinNty.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a S2CPlayerJoinNty message from the specified reader or buffer.
             * @function decode
             * @memberof proto.game.S2CPlayerJoinNty
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.game.S2CPlayerJoinNty} S2CPlayerJoinNty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            S2CPlayerJoinNty.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.game.S2CPlayerJoinNty();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.fixed64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a S2CPlayerJoinNty message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.game.S2CPlayerJoinNty
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.game.S2CPlayerJoinNty} S2CPlayerJoinNty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            S2CPlayerJoinNty.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a S2CPlayerJoinNty message.
             * @function verify
             * @memberof proto.game.S2CPlayerJoinNty
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            S2CPlayerJoinNty.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                        return "uid: integer|Long expected";
                return null;
            };

            /**
             * Creates a S2CPlayerJoinNty message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.game.S2CPlayerJoinNty
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.game.S2CPlayerJoinNty} S2CPlayerJoinNty
             */
            S2CPlayerJoinNty.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.game.S2CPlayerJoinNty)
                    return object;
                var message = new $root.proto.game.S2CPlayerJoinNty();
                if (object.uid != null)
                    if ($util.Long)
                        (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;
                    else if (typeof object.uid === "string")
                        message.uid = parseInt(object.uid, 10);
                    else if (typeof object.uid === "number")
                        message.uid = object.uid;
                    else if (typeof object.uid === "object")
                        message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a S2CPlayerJoinNty message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.game.S2CPlayerJoinNty
             * @static
             * @param {proto.game.S2CPlayerJoinNty} message S2CPlayerJoinNty
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            S2CPlayerJoinNty.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.uid = options.longs === String ? "0" : 0;
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (typeof message.uid === "number")
                        object.uid = options.longs === String ? String(message.uid) : message.uid;
                    else
                        object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
                return object;
            };

            /**
             * Converts this S2CPlayerJoinNty to JSON.
             * @function toJSON
             * @memberof proto.game.S2CPlayerJoinNty
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            S2CPlayerJoinNty.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return S2CPlayerJoinNty;
        })();

        game.S2CPlayerLeftNty = (function() {

            /**
             * Properties of a S2CPlayerLeftNty.
             * @memberof proto.game
             * @interface IS2CPlayerLeftNty
             * @property {number|Long|null} [uid] S2CPlayerLeftNty uid
             */

            /**
             * Constructs a new S2CPlayerLeftNty.
             * @memberof proto.game
             * @classdesc Represents a S2CPlayerLeftNty.
             * @implements IS2CPlayerLeftNty
             * @constructor
             * @param {proto.game.IS2CPlayerLeftNty=} [properties] Properties to set
             */
            function S2CPlayerLeftNty(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * S2CPlayerLeftNty uid.
             * @member {number|Long} uid
             * @memberof proto.game.S2CPlayerLeftNty
             * @instance
             */
            S2CPlayerLeftNty.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new S2CPlayerLeftNty instance using the specified properties.
             * @function create
             * @memberof proto.game.S2CPlayerLeftNty
             * @static
             * @param {proto.game.IS2CPlayerLeftNty=} [properties] Properties to set
             * @returns {proto.game.S2CPlayerLeftNty} S2CPlayerLeftNty instance
             */
            S2CPlayerLeftNty.create = function create(properties) {
                return new S2CPlayerLeftNty(properties);
            };

            /**
             * Encodes the specified S2CPlayerLeftNty message. Does not implicitly {@link proto.game.S2CPlayerLeftNty.verify|verify} messages.
             * @function encode
             * @memberof proto.game.S2CPlayerLeftNty
             * @static
             * @param {proto.game.IS2CPlayerLeftNty} message S2CPlayerLeftNty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            S2CPlayerLeftNty.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 1, wireType 1 =*/9).fixed64(message.uid);
                return writer;
            };

            /**
             * Encodes the specified S2CPlayerLeftNty message, length delimited. Does not implicitly {@link proto.game.S2CPlayerLeftNty.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.game.S2CPlayerLeftNty
             * @static
             * @param {proto.game.IS2CPlayerLeftNty} message S2CPlayerLeftNty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            S2CPlayerLeftNty.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a S2CPlayerLeftNty message from the specified reader or buffer.
             * @function decode
             * @memberof proto.game.S2CPlayerLeftNty
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.game.S2CPlayerLeftNty} S2CPlayerLeftNty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            S2CPlayerLeftNty.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.game.S2CPlayerLeftNty();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.fixed64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a S2CPlayerLeftNty message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.game.S2CPlayerLeftNty
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.game.S2CPlayerLeftNty} S2CPlayerLeftNty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            S2CPlayerLeftNty.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a S2CPlayerLeftNty message.
             * @function verify
             * @memberof proto.game.S2CPlayerLeftNty
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            S2CPlayerLeftNty.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                        return "uid: integer|Long expected";
                return null;
            };

            /**
             * Creates a S2CPlayerLeftNty message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.game.S2CPlayerLeftNty
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.game.S2CPlayerLeftNty} S2CPlayerLeftNty
             */
            S2CPlayerLeftNty.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.game.S2CPlayerLeftNty)
                    return object;
                var message = new $root.proto.game.S2CPlayerLeftNty();
                if (object.uid != null)
                    if ($util.Long)
                        (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;
                    else if (typeof object.uid === "string")
                        message.uid = parseInt(object.uid, 10);
                    else if (typeof object.uid === "number")
                        message.uid = object.uid;
                    else if (typeof object.uid === "object")
                        message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a S2CPlayerLeftNty message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.game.S2CPlayerLeftNty
             * @static
             * @param {proto.game.S2CPlayerLeftNty} message S2CPlayerLeftNty
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            S2CPlayerLeftNty.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.uid = options.longs === String ? "0" : 0;
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (typeof message.uid === "number")
                        object.uid = options.longs === String ? String(message.uid) : message.uid;
                    else
                        object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
                return object;
            };

            /**
             * Converts this S2CPlayerLeftNty to JSON.
             * @function toJSON
             * @memberof proto.game.S2CPlayerLeftNty
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            S2CPlayerLeftNty.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return S2CPlayerLeftNty;
        })();

        game.C2SActionReq = (function() {

            /**
             * Properties of a C2SActionReq.
             * @memberof proto.game
             * @interface IC2SActionReq
             * @property {number|null} [action] C2SActionReq action
             * @property {Uint8Array|null} [card] C2SActionReq card
             * @property {number|null} [color] C2SActionReq color
             */

            /**
             * Constructs a new C2SActionReq.
             * @memberof proto.game
             * @classdesc Represents a C2SActionReq.
             * @implements IC2SActionReq
             * @constructor
             * @param {proto.game.IC2SActionReq=} [properties] Properties to set
             */
            function C2SActionReq(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * C2SActionReq action.
             * @member {number} action
             * @memberof proto.game.C2SActionReq
             * @instance
             */
            C2SActionReq.prototype.action = 0;

            /**
             * C2SActionReq card.
             * @member {Uint8Array} card
             * @memberof proto.game.C2SActionReq
             * @instance
             */
            C2SActionReq.prototype.card = $util.newBuffer([]);

            /**
             * C2SActionReq color.
             * @member {number} color
             * @memberof proto.game.C2SActionReq
             * @instance
             */
            C2SActionReq.prototype.color = 0;

            /**
             * Creates a new C2SActionReq instance using the specified properties.
             * @function create
             * @memberof proto.game.C2SActionReq
             * @static
             * @param {proto.game.IC2SActionReq=} [properties] Properties to set
             * @returns {proto.game.C2SActionReq} C2SActionReq instance
             */
            C2SActionReq.create = function create(properties) {
                return new C2SActionReq(properties);
            };

            /**
             * Encodes the specified C2SActionReq message. Does not implicitly {@link proto.game.C2SActionReq.verify|verify} messages.
             * @function encode
             * @memberof proto.game.C2SActionReq
             * @static
             * @param {proto.game.IC2SActionReq} message C2SActionReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            C2SActionReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.action != null && message.hasOwnProperty("action"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
                if (message.card != null && message.hasOwnProperty("card"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.card);
                if (message.color != null && message.hasOwnProperty("color"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.color);
                return writer;
            };

            /**
             * Encodes the specified C2SActionReq message, length delimited. Does not implicitly {@link proto.game.C2SActionReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.game.C2SActionReq
             * @static
             * @param {proto.game.IC2SActionReq} message C2SActionReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            C2SActionReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a C2SActionReq message from the specified reader or buffer.
             * @function decode
             * @memberof proto.game.C2SActionReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.game.C2SActionReq} C2SActionReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            C2SActionReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.game.C2SActionReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.action = reader.int32();
                        break;
                    case 2:
                        message.card = reader.bytes();
                        break;
                    case 3:
                        message.color = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a C2SActionReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.game.C2SActionReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.game.C2SActionReq} C2SActionReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            C2SActionReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a C2SActionReq message.
             * @function verify
             * @memberof proto.game.C2SActionReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            C2SActionReq.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.action != null && message.hasOwnProperty("action"))
                    if (!$util.isInteger(message.action))
                        return "action: integer expected";
                if (message.card != null && message.hasOwnProperty("card"))
                    if (!(message.card && typeof message.card.length === "number" || $util.isString(message.card)))
                        return "card: buffer expected";
                if (message.color != null && message.hasOwnProperty("color"))
                    if (!$util.isInteger(message.color))
                        return "color: integer expected";
                return null;
            };

            /**
             * Creates a C2SActionReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.game.C2SActionReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.game.C2SActionReq} C2SActionReq
             */
            C2SActionReq.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.game.C2SActionReq)
                    return object;
                var message = new $root.proto.game.C2SActionReq();
                if (object.action != null)
                    message.action = object.action | 0;
                if (object.card != null)
                    if (typeof object.card === "string")
                        $util.base64.decode(object.card, message.card = $util.newBuffer($util.base64.length(object.card)), 0);
                    else if (object.card.length)
                        message.card = object.card;
                if (object.color != null)
                    message.color = object.color | 0;
                return message;
            };

            /**
             * Creates a plain object from a C2SActionReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.game.C2SActionReq
             * @static
             * @param {proto.game.C2SActionReq} message C2SActionReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            C2SActionReq.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.action = 0;
                    if (options.bytes === String)
                        object.card = "";
                    else {
                        object.card = [];
                        if (options.bytes !== Array)
                            object.card = $util.newBuffer(object.card);
                    }
                    object.color = 0;
                }
                if (message.action != null && message.hasOwnProperty("action"))
                    object.action = message.action;
                if (message.card != null && message.hasOwnProperty("card"))
                    object.card = options.bytes === String ? $util.base64.encode(message.card, 0, message.card.length) : options.bytes === Array ? Array.prototype.slice.call(message.card) : message.card;
                if (message.color != null && message.hasOwnProperty("color"))
                    object.color = message.color;
                return object;
            };

            /**
             * Converts this C2SActionReq to JSON.
             * @function toJSON
             * @memberof proto.game.C2SActionReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            C2SActionReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return C2SActionReq;
        })();

        game.S2CActionResp = (function() {

            /**
             * Properties of a S2CActionResp.
             * @memberof proto.game
             * @interface IS2CActionResp
             * @property {number|null} [result] S2CActionResp result
             * @property {Uint8Array|null} [card] S2CActionResp card
             */

            /**
             * Constructs a new S2CActionResp.
             * @memberof proto.game
             * @classdesc Represents a S2CActionResp.
             * @implements IS2CActionResp
             * @constructor
             * @param {proto.game.IS2CActionResp=} [properties] Properties to set
             */
            function S2CActionResp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * S2CActionResp result.
             * @member {number} result
             * @memberof proto.game.S2CActionResp
             * @instance
             */
            S2CActionResp.prototype.result = 0;

            /**
             * S2CActionResp card.
             * @member {Uint8Array} card
             * @memberof proto.game.S2CActionResp
             * @instance
             */
            S2CActionResp.prototype.card = $util.newBuffer([]);

            /**
             * Creates a new S2CActionResp instance using the specified properties.
             * @function create
             * @memberof proto.game.S2CActionResp
             * @static
             * @param {proto.game.IS2CActionResp=} [properties] Properties to set
             * @returns {proto.game.S2CActionResp} S2CActionResp instance
             */
            S2CActionResp.create = function create(properties) {
                return new S2CActionResp(properties);
            };

            /**
             * Encodes the specified S2CActionResp message. Does not implicitly {@link proto.game.S2CActionResp.verify|verify} messages.
             * @function encode
             * @memberof proto.game.S2CActionResp
             * @static
             * @param {proto.game.IS2CActionResp} message S2CActionResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            S2CActionResp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.result != null && message.hasOwnProperty("result"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.result);
                if (message.card != null && message.hasOwnProperty("card"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.card);
                return writer;
            };

            /**
             * Encodes the specified S2CActionResp message, length delimited. Does not implicitly {@link proto.game.S2CActionResp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.game.S2CActionResp
             * @static
             * @param {proto.game.IS2CActionResp} message S2CActionResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            S2CActionResp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a S2CActionResp message from the specified reader or buffer.
             * @function decode
             * @memberof proto.game.S2CActionResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.game.S2CActionResp} S2CActionResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            S2CActionResp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.game.S2CActionResp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.int32();
                        break;
                    case 2:
                        message.card = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a S2CActionResp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.game.S2CActionResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.game.S2CActionResp} S2CActionResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            S2CActionResp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a S2CActionResp message.
             * @function verify
             * @memberof proto.game.S2CActionResp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            S2CActionResp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.result != null && message.hasOwnProperty("result"))
                    if (!$util.isInteger(message.result))
                        return "result: integer expected";
                if (message.card != null && message.hasOwnProperty("card"))
                    if (!(message.card && typeof message.card.length === "number" || $util.isString(message.card)))
                        return "card: buffer expected";
                return null;
            };

            /**
             * Creates a S2CActionResp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.game.S2CActionResp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.game.S2CActionResp} S2CActionResp
             */
            S2CActionResp.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.game.S2CActionResp)
                    return object;
                var message = new $root.proto.game.S2CActionResp();
                if (object.result != null)
                    message.result = object.result | 0;
                if (object.card != null)
                    if (typeof object.card === "string")
                        $util.base64.decode(object.card, message.card = $util.newBuffer($util.base64.length(object.card)), 0);
                    else if (object.card.length)
                        message.card = object.card;
                return message;
            };

            /**
             * Creates a plain object from a S2CActionResp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.game.S2CActionResp
             * @static
             * @param {proto.game.S2CActionResp} message S2CActionResp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            S2CActionResp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.result = 0;
                    if (options.bytes === String)
                        object.card = "";
                    else {
                        object.card = [];
                        if (options.bytes !== Array)
                            object.card = $util.newBuffer(object.card);
                    }
                }
                if (message.result != null && message.hasOwnProperty("result"))
                    object.result = message.result;
                if (message.card != null && message.hasOwnProperty("card"))
                    object.card = options.bytes === String ? $util.base64.encode(message.card, 0, message.card.length) : options.bytes === Array ? Array.prototype.slice.call(message.card) : message.card;
                return object;
            };

            /**
             * Converts this S2CActionResp to JSON.
             * @function toJSON
             * @memberof proto.game.S2CActionResp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            S2CActionResp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return S2CActionResp;
        })();

        game.SingleEvent = (function() {

            /**
             * Properties of a SingleEvent.
             * @memberof proto.game
             * @interface ISingleEvent
             * @property {number|Long|null} [uid] SingleEvent uid
             * @property {number|null} [event] SingleEvent event
             * @property {Uint8Array|null} [card] SingleEvent card
             * @property {boolean|null} [clockwise] SingleEvent clockwise
             * @property {number|null} [color] SingleEvent color
             */

            /**
             * Constructs a new SingleEvent.
             * @memberof proto.game
             * @classdesc Represents a SingleEvent.
             * @implements ISingleEvent
             * @constructor
             * @param {proto.game.ISingleEvent=} [properties] Properties to set
             */
            function SingleEvent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SingleEvent uid.
             * @member {number|Long} uid
             * @memberof proto.game.SingleEvent
             * @instance
             */
            SingleEvent.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * SingleEvent event.
             * @member {number} event
             * @memberof proto.game.SingleEvent
             * @instance
             */
            SingleEvent.prototype.event = 0;

            /**
             * SingleEvent card.
             * @member {Uint8Array} card
             * @memberof proto.game.SingleEvent
             * @instance
             */
            SingleEvent.prototype.card = $util.newBuffer([]);

            /**
             * SingleEvent clockwise.
             * @member {boolean} clockwise
             * @memberof proto.game.SingleEvent
             * @instance
             */
            SingleEvent.prototype.clockwise = false;

            /**
             * SingleEvent color.
             * @member {number} color
             * @memberof proto.game.SingleEvent
             * @instance
             */
            SingleEvent.prototype.color = 0;

            /**
             * Creates a new SingleEvent instance using the specified properties.
             * @function create
             * @memberof proto.game.SingleEvent
             * @static
             * @param {proto.game.ISingleEvent=} [properties] Properties to set
             * @returns {proto.game.SingleEvent} SingleEvent instance
             */
            SingleEvent.create = function create(properties) {
                return new SingleEvent(properties);
            };

            /**
             * Encodes the specified SingleEvent message. Does not implicitly {@link proto.game.SingleEvent.verify|verify} messages.
             * @function encode
             * @memberof proto.game.SingleEvent
             * @static
             * @param {proto.game.ISingleEvent} message SingleEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SingleEvent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 1, wireType 1 =*/9).fixed64(message.uid);
                if (message.event != null && message.hasOwnProperty("event"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.event);
                if (message.card != null && message.hasOwnProperty("card"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.card);
                if (message.clockwise != null && message.hasOwnProperty("clockwise"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.clockwise);
                if (message.color != null && message.hasOwnProperty("color"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.color);
                return writer;
            };

            /**
             * Encodes the specified SingleEvent message, length delimited. Does not implicitly {@link proto.game.SingleEvent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.game.SingleEvent
             * @static
             * @param {proto.game.ISingleEvent} message SingleEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SingleEvent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SingleEvent message from the specified reader or buffer.
             * @function decode
             * @memberof proto.game.SingleEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.game.SingleEvent} SingleEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SingleEvent.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.game.SingleEvent();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.fixed64();
                        break;
                    case 2:
                        message.event = reader.int32();
                        break;
                    case 3:
                        message.card = reader.bytes();
                        break;
                    case 4:
                        message.clockwise = reader.bool();
                        break;
                    case 5:
                        message.color = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SingleEvent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.game.SingleEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.game.SingleEvent} SingleEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SingleEvent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SingleEvent message.
             * @function verify
             * @memberof proto.game.SingleEvent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SingleEvent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                        return "uid: integer|Long expected";
                if (message.event != null && message.hasOwnProperty("event"))
                    if (!$util.isInteger(message.event))
                        return "event: integer expected";
                if (message.card != null && message.hasOwnProperty("card"))
                    if (!(message.card && typeof message.card.length === "number" || $util.isString(message.card)))
                        return "card: buffer expected";
                if (message.clockwise != null && message.hasOwnProperty("clockwise"))
                    if (typeof message.clockwise !== "boolean")
                        return "clockwise: boolean expected";
                if (message.color != null && message.hasOwnProperty("color"))
                    if (!$util.isInteger(message.color))
                        return "color: integer expected";
                return null;
            };

            /**
             * Creates a SingleEvent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.game.SingleEvent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.game.SingleEvent} SingleEvent
             */
            SingleEvent.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.game.SingleEvent)
                    return object;
                var message = new $root.proto.game.SingleEvent();
                if (object.uid != null)
                    if ($util.Long)
                        (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;
                    else if (typeof object.uid === "string")
                        message.uid = parseInt(object.uid, 10);
                    else if (typeof object.uid === "number")
                        message.uid = object.uid;
                    else if (typeof object.uid === "object")
                        message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
                if (object.event != null)
                    message.event = object.event | 0;
                if (object.card != null)
                    if (typeof object.card === "string")
                        $util.base64.decode(object.card, message.card = $util.newBuffer($util.base64.length(object.card)), 0);
                    else if (object.card.length)
                        message.card = object.card;
                if (object.clockwise != null)
                    message.clockwise = Boolean(object.clockwise);
                if (object.color != null)
                    message.color = object.color | 0;
                return message;
            };

            /**
             * Creates a plain object from a SingleEvent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.game.SingleEvent
             * @static
             * @param {proto.game.SingleEvent} message SingleEvent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SingleEvent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.uid = options.longs === String ? "0" : 0;
                    object.event = 0;
                    if (options.bytes === String)
                        object.card = "";
                    else {
                        object.card = [];
                        if (options.bytes !== Array)
                            object.card = $util.newBuffer(object.card);
                    }
                    object.clockwise = false;
                    object.color = 0;
                }
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (typeof message.uid === "number")
                        object.uid = options.longs === String ? String(message.uid) : message.uid;
                    else
                        object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
                if (message.event != null && message.hasOwnProperty("event"))
                    object.event = message.event;
                if (message.card != null && message.hasOwnProperty("card"))
                    object.card = options.bytes === String ? $util.base64.encode(message.card, 0, message.card.length) : options.bytes === Array ? Array.prototype.slice.call(message.card) : message.card;
                if (message.clockwise != null && message.hasOwnProperty("clockwise"))
                    object.clockwise = message.clockwise;
                if (message.color != null && message.hasOwnProperty("color"))
                    object.color = message.color;
                return object;
            };

            /**
             * Converts this SingleEvent to JSON.
             * @function toJSON
             * @memberof proto.game.SingleEvent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SingleEvent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return SingleEvent;
        })();

        game.S2CEventNty = (function() {

            /**
             * Properties of a S2CEventNty.
             * @memberof proto.game
             * @interface IS2CEventNty
             * @property {Array.<proto.game.ISingleEvent>|null} [events] S2CEventNty events
             */

            /**
             * Constructs a new S2CEventNty.
             * @memberof proto.game
             * @classdesc Represents a S2CEventNty.
             * @implements IS2CEventNty
             * @constructor
             * @param {proto.game.IS2CEventNty=} [properties] Properties to set
             */
            function S2CEventNty(properties) {
                this.events = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * S2CEventNty events.
             * @member {Array.<proto.game.ISingleEvent>} events
             * @memberof proto.game.S2CEventNty
             * @instance
             */
            S2CEventNty.prototype.events = $util.emptyArray;

            /**
             * Creates a new S2CEventNty instance using the specified properties.
             * @function create
             * @memberof proto.game.S2CEventNty
             * @static
             * @param {proto.game.IS2CEventNty=} [properties] Properties to set
             * @returns {proto.game.S2CEventNty} S2CEventNty instance
             */
            S2CEventNty.create = function create(properties) {
                return new S2CEventNty(properties);
            };

            /**
             * Encodes the specified S2CEventNty message. Does not implicitly {@link proto.game.S2CEventNty.verify|verify} messages.
             * @function encode
             * @memberof proto.game.S2CEventNty
             * @static
             * @param {proto.game.IS2CEventNty} message S2CEventNty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            S2CEventNty.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.events != null && message.events.length)
                    for (var i = 0; i < message.events.length; ++i)
                        $root.proto.game.SingleEvent.encode(message.events[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified S2CEventNty message, length delimited. Does not implicitly {@link proto.game.S2CEventNty.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.game.S2CEventNty
             * @static
             * @param {proto.game.IS2CEventNty} message S2CEventNty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            S2CEventNty.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a S2CEventNty message from the specified reader or buffer.
             * @function decode
             * @memberof proto.game.S2CEventNty
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.game.S2CEventNty} S2CEventNty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            S2CEventNty.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.game.S2CEventNty();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.events && message.events.length))
                            message.events = [];
                        message.events.push($root.proto.game.SingleEvent.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a S2CEventNty message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.game.S2CEventNty
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.game.S2CEventNty} S2CEventNty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            S2CEventNty.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a S2CEventNty message.
             * @function verify
             * @memberof proto.game.S2CEventNty
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            S2CEventNty.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.events != null && message.hasOwnProperty("events")) {
                    if (!Array.isArray(message.events))
                        return "events: array expected";
                    for (var i = 0; i < message.events.length; ++i) {
                        var error = $root.proto.game.SingleEvent.verify(message.events[i]);
                        if (error)
                            return "events." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a S2CEventNty message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.game.S2CEventNty
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.game.S2CEventNty} S2CEventNty
             */
            S2CEventNty.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.game.S2CEventNty)
                    return object;
                var message = new $root.proto.game.S2CEventNty();
                if (object.events) {
                    if (!Array.isArray(object.events))
                        throw TypeError(".proto.game.S2CEventNty.events: array expected");
                    message.events = [];
                    for (var i = 0; i < object.events.length; ++i) {
                        if (typeof object.events[i] !== "object")
                            throw TypeError(".proto.game.S2CEventNty.events: object expected");
                        message.events[i] = $root.proto.game.SingleEvent.fromObject(object.events[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a S2CEventNty message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.game.S2CEventNty
             * @static
             * @param {proto.game.S2CEventNty} message S2CEventNty
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            S2CEventNty.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.events = [];
                if (message.events && message.events.length) {
                    object.events = [];
                    for (var j = 0; j < message.events.length; ++j)
                        object.events[j] = $root.proto.game.SingleEvent.toObject(message.events[j], options);
                }
                return object;
            };

            /**
             * Converts this S2CEventNty to JSON.
             * @function toJSON
             * @memberof proto.game.S2CEventNty
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            S2CEventNty.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return S2CEventNty;
        })();

        game.S2CGameOverNty = (function() {

            /**
             * Properties of a S2CGameOverNty.
             * @memberof proto.game
             * @interface IS2CGameOverNty
             * @property {Array.<number|Long>|null} [ranks] S2CGameOverNty ranks
             * @property {Array.<number>|null} [scores] S2CGameOverNty scores
             */

            /**
             * Constructs a new S2CGameOverNty.
             * @memberof proto.game
             * @classdesc Represents a S2CGameOverNty.
             * @implements IS2CGameOverNty
             * @constructor
             * @param {proto.game.IS2CGameOverNty=} [properties] Properties to set
             */
            function S2CGameOverNty(properties) {
                this.ranks = [];
                this.scores = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * S2CGameOverNty ranks.
             * @member {Array.<number|Long>} ranks
             * @memberof proto.game.S2CGameOverNty
             * @instance
             */
            S2CGameOverNty.prototype.ranks = $util.emptyArray;

            /**
             * S2CGameOverNty scores.
             * @member {Array.<number>} scores
             * @memberof proto.game.S2CGameOverNty
             * @instance
             */
            S2CGameOverNty.prototype.scores = $util.emptyArray;

            /**
             * Creates a new S2CGameOverNty instance using the specified properties.
             * @function create
             * @memberof proto.game.S2CGameOverNty
             * @static
             * @param {proto.game.IS2CGameOverNty=} [properties] Properties to set
             * @returns {proto.game.S2CGameOverNty} S2CGameOverNty instance
             */
            S2CGameOverNty.create = function create(properties) {
                return new S2CGameOverNty(properties);
            };

            /**
             * Encodes the specified S2CGameOverNty message. Does not implicitly {@link proto.game.S2CGameOverNty.verify|verify} messages.
             * @function encode
             * @memberof proto.game.S2CGameOverNty
             * @static
             * @param {proto.game.IS2CGameOverNty} message S2CGameOverNty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            S2CGameOverNty.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.ranks != null && message.ranks.length) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork();
                    for (var i = 0; i < message.ranks.length; ++i)
                        writer.fixed64(message.ranks[i]);
                    writer.ldelim();
                }
                if (message.scores != null && message.scores.length) {
                    writer.uint32(/* id 2, wireType 2 =*/18).fork();
                    for (var i = 0; i < message.scores.length; ++i)
                        writer.int32(message.scores[i]);
                    writer.ldelim();
                }
                return writer;
            };

            /**
             * Encodes the specified S2CGameOverNty message, length delimited. Does not implicitly {@link proto.game.S2CGameOverNty.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.game.S2CGameOverNty
             * @static
             * @param {proto.game.IS2CGameOverNty} message S2CGameOverNty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            S2CGameOverNty.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a S2CGameOverNty message from the specified reader or buffer.
             * @function decode
             * @memberof proto.game.S2CGameOverNty
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.game.S2CGameOverNty} S2CGameOverNty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            S2CGameOverNty.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.game.S2CGameOverNty();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.ranks && message.ranks.length))
                            message.ranks = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.ranks.push(reader.fixed64());
                        } else
                            message.ranks.push(reader.fixed64());
                        break;
                    case 2:
                        if (!(message.scores && message.scores.length))
                            message.scores = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.scores.push(reader.int32());
                        } else
                            message.scores.push(reader.int32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a S2CGameOverNty message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.game.S2CGameOverNty
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.game.S2CGameOverNty} S2CGameOverNty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            S2CGameOverNty.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a S2CGameOverNty message.
             * @function verify
             * @memberof proto.game.S2CGameOverNty
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            S2CGameOverNty.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.ranks != null && message.hasOwnProperty("ranks")) {
                    if (!Array.isArray(message.ranks))
                        return "ranks: array expected";
                    for (var i = 0; i < message.ranks.length; ++i)
                        if (!$util.isInteger(message.ranks[i]) && !(message.ranks[i] && $util.isInteger(message.ranks[i].low) && $util.isInteger(message.ranks[i].high)))
                            return "ranks: integer|Long[] expected";
                }
                if (message.scores != null && message.hasOwnProperty("scores")) {
                    if (!Array.isArray(message.scores))
                        return "scores: array expected";
                    for (var i = 0; i < message.scores.length; ++i)
                        if (!$util.isInteger(message.scores[i]))
                            return "scores: integer[] expected";
                }
                return null;
            };

            /**
             * Creates a S2CGameOverNty message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.game.S2CGameOverNty
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.game.S2CGameOverNty} S2CGameOverNty
             */
            S2CGameOverNty.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.game.S2CGameOverNty)
                    return object;
                var message = new $root.proto.game.S2CGameOverNty();
                if (object.ranks) {
                    if (!Array.isArray(object.ranks))
                        throw TypeError(".proto.game.S2CGameOverNty.ranks: array expected");
                    message.ranks = [];
                    for (var i = 0; i < object.ranks.length; ++i)
                        if ($util.Long)
                            (message.ranks[i] = $util.Long.fromValue(object.ranks[i])).unsigned = false;
                        else if (typeof object.ranks[i] === "string")
                            message.ranks[i] = parseInt(object.ranks[i], 10);
                        else if (typeof object.ranks[i] === "number")
                            message.ranks[i] = object.ranks[i];
                        else if (typeof object.ranks[i] === "object")
                            message.ranks[i] = new $util.LongBits(object.ranks[i].low >>> 0, object.ranks[i].high >>> 0).toNumber();
                }
                if (object.scores) {
                    if (!Array.isArray(object.scores))
                        throw TypeError(".proto.game.S2CGameOverNty.scores: array expected");
                    message.scores = [];
                    for (var i = 0; i < object.scores.length; ++i)
                        message.scores[i] = object.scores[i] | 0;
                }
                return message;
            };

            /**
             * Creates a plain object from a S2CGameOverNty message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.game.S2CGameOverNty
             * @static
             * @param {proto.game.S2CGameOverNty} message S2CGameOverNty
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            S2CGameOverNty.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.ranks = [];
                    object.scores = [];
                }
                if (message.ranks && message.ranks.length) {
                    object.ranks = [];
                    for (var j = 0; j < message.ranks.length; ++j)
                        if (typeof message.ranks[j] === "number")
                            object.ranks[j] = options.longs === String ? String(message.ranks[j]) : message.ranks[j];
                        else
                            object.ranks[j] = options.longs === String ? $util.Long.prototype.toString.call(message.ranks[j]) : options.longs === Number ? new $util.LongBits(message.ranks[j].low >>> 0, message.ranks[j].high >>> 0).toNumber() : message.ranks[j];
                }
                if (message.scores && message.scores.length) {
                    object.scores = [];
                    for (var j = 0; j < message.scores.length; ++j)
                        object.scores[j] = message.scores[j];
                }
                return object;
            };

            /**
             * Converts this S2CGameOverNty to JSON.
             * @function toJSON
             * @memberof proto.game.S2CGameOverNty
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            S2CGameOverNty.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return S2CGameOverNty;
        })();

        return game;
    })();

    proto.internal = (function() {

        /**
         * Namespace internal.
         * @memberof proto
         * @namespace
         */
        var internal = {};

        /**
         * FrameType enum.
         * @name proto.internal.FrameType
         * @enum {string}
         * @property {number} Message=0 Message value
         * @property {number} Kick=1 Kick value
         * @property {number} Ping=2 Ping value
         */
        internal.FrameType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Message"] = 0;
            values[valuesById[1] = "Kick"] = 1;
            values[valuesById[2] = "Ping"] = 2;
            return values;
        })();

        internal.Frame = (function() {

            /**
             * Properties of a Frame.
             * @memberof proto.internal
             * @interface IFrame
             * @property {proto.internal.FrameType|null} [type] Frame type
             * @property {number|null} [cmd] Frame cmd
             * @property {number|null} [status] Frame status
             * @property {string|null} [message] Frame message
             * @property {Uint8Array|null} [body] Frame body
             */

            /**
             * Constructs a new Frame.
             * @memberof proto.internal
             * @classdesc Represents a Frame.
             * @implements IFrame
             * @constructor
             * @param {proto.internal.IFrame=} [properties] Properties to set
             */
            function Frame(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Frame type.
             * @member {proto.internal.FrameType} type
             * @memberof proto.internal.Frame
             * @instance
             */
            Frame.prototype.type = 0;

            /**
             * Frame cmd.
             * @member {number} cmd
             * @memberof proto.internal.Frame
             * @instance
             */
            Frame.prototype.cmd = 0;

            /**
             * Frame status.
             * @member {number} status
             * @memberof proto.internal.Frame
             * @instance
             */
            Frame.prototype.status = 0;

            /**
             * Frame message.
             * @member {string} message
             * @memberof proto.internal.Frame
             * @instance
             */
            Frame.prototype.message = "";

            /**
             * Frame body.
             * @member {Uint8Array} body
             * @memberof proto.internal.Frame
             * @instance
             */
            Frame.prototype.body = $util.newBuffer([]);

            /**
             * Creates a new Frame instance using the specified properties.
             * @function create
             * @memberof proto.internal.Frame
             * @static
             * @param {proto.internal.IFrame=} [properties] Properties to set
             * @returns {proto.internal.Frame} Frame instance
             */
            Frame.create = function create(properties) {
                return new Frame(properties);
            };

            /**
             * Encodes the specified Frame message. Does not implicitly {@link proto.internal.Frame.verify|verify} messages.
             * @function encode
             * @memberof proto.internal.Frame
             * @static
             * @param {proto.internal.IFrame} message Frame message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Frame.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type != null && message.hasOwnProperty("type"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                if (message.cmd != null && message.hasOwnProperty("cmd"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.cmd);
                if (message.status != null && message.hasOwnProperty("status"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.status);
                if (message.message != null && message.hasOwnProperty("message"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.message);
                if (message.body != null && message.hasOwnProperty("body"))
                    writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.body);
                return writer;
            };

            /**
             * Encodes the specified Frame message, length delimited. Does not implicitly {@link proto.internal.Frame.verify|verify} messages.
             * @function encodeDelimited
             * @memberof proto.internal.Frame
             * @static
             * @param {proto.internal.IFrame} message Frame message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Frame.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Frame message from the specified reader or buffer.
             * @function decode
             * @memberof proto.internal.Frame
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {proto.internal.Frame} Frame
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Frame.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.proto.internal.Frame();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.type = reader.int32();
                        break;
                    case 2:
                        message.cmd = reader.int32();
                        break;
                    case 3:
                        message.status = reader.int32();
                        break;
                    case 4:
                        message.message = reader.string();
                        break;
                    case 5:
                        message.body = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Frame message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof proto.internal.Frame
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {proto.internal.Frame} Frame
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Frame.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Frame message.
             * @function verify
             * @memberof proto.internal.Frame
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Frame.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                if (message.cmd != null && message.hasOwnProperty("cmd"))
                    if (!$util.isInteger(message.cmd))
                        return "cmd: integer expected";
                if (message.status != null && message.hasOwnProperty("status"))
                    if (!$util.isInteger(message.status))
                        return "status: integer expected";
                if (message.message != null && message.hasOwnProperty("message"))
                    if (!$util.isString(message.message))
                        return "message: string expected";
                if (message.body != null && message.hasOwnProperty("body"))
                    if (!(message.body && typeof message.body.length === "number" || $util.isString(message.body)))
                        return "body: buffer expected";
                return null;
            };

            /**
             * Creates a Frame message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof proto.internal.Frame
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {proto.internal.Frame} Frame
             */
            Frame.fromObject = function fromObject(object) {
                if (object instanceof $root.proto.internal.Frame)
                    return object;
                var message = new $root.proto.internal.Frame();
                switch (object.type) {
                case "Message":
                case 0:
                    message.type = 0;
                    break;
                case "Kick":
                case 1:
                    message.type = 1;
                    break;
                case "Ping":
                case 2:
                    message.type = 2;
                    break;
                }
                if (object.cmd != null)
                    message.cmd = object.cmd | 0;
                if (object.status != null)
                    message.status = object.status | 0;
                if (object.message != null)
                    message.message = String(object.message);
                if (object.body != null)
                    if (typeof object.body === "string")
                        $util.base64.decode(object.body, message.body = $util.newBuffer($util.base64.length(object.body)), 0);
                    else if (object.body.length)
                        message.body = object.body;
                return message;
            };

            /**
             * Creates a plain object from a Frame message. Also converts values to other types if specified.
             * @function toObject
             * @memberof proto.internal.Frame
             * @static
             * @param {proto.internal.Frame} message Frame
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Frame.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.type = options.enums === String ? "Message" : 0;
                    object.cmd = 0;
                    object.status = 0;
                    object.message = "";
                    if (options.bytes === String)
                        object.body = "";
                    else {
                        object.body = [];
                        if (options.bytes !== Array)
                            object.body = $util.newBuffer(object.body);
                    }
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.proto.internal.FrameType[message.type] : message.type;
                if (message.cmd != null && message.hasOwnProperty("cmd"))
                    object.cmd = message.cmd;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = message.status;
                if (message.message != null && message.hasOwnProperty("message"))
                    object.message = message.message;
                if (message.body != null && message.hasOwnProperty("body"))
                    object.body = options.bytes === String ? $util.base64.encode(message.body, 0, message.body.length) : options.bytes === Array ? Array.prototype.slice.call(message.body) : message.body;
                return object;
            };

            /**
             * Converts this Frame to JSON.
             * @function toJSON
             * @memberof proto.internal.Frame
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Frame.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Frame;
        })();

        return internal;
    })();

    return proto;
})();

module.exports = $root;
