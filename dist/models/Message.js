"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var message_1 = __importDefault(require("../queries/message"));
var AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
var TwilioTypes_1 = require("../types_rn/TwilioTypes");
var utils_1 = require("../utils");
function anyMessageToListOfIMessage(input, botId, versionId) {
    var messageList = [];
    Object.keys(input).forEach(function (messageId) {
        var messages = input[messageId];
        messages.forEach(function (message, index) {
            var specificFields = {};
            switch (message.type) {
                case (TwilioTypes_1.MessageType.SAY):
                    specificFields = {
                        text: message.text,
                        language: message.language
                    };
                    break;
                case (TwilioTypes_1.MessageType.PLAY):
                    specificFields = {
                        url: message.url
                    };
                    break;
                case (TwilioTypes_1.MessageType.DYNAMIC_PLAY):
                case (TwilioTypes_1.MessageType.DYNAMIC_SAY):
                    specificFields = {
                        func: utils_1.functionReplacer(null, message.func)
                    };
                    break;
            }
            var iMessage = __assign({ botId: botId,
                messageId: messageId,
                index: index,
                versionId: versionId, type: message.type }, specificFields);
            messageList.push(iMessage);
        });
    });
    return messageList;
}
function createMessage(message) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!Array.isArray(message)) {
                message = [message];
            }
            return [2 /*return*/, message_1["default"].createMessage(message)];
        });
    });
}
/**
 * @function fromIMessage
 * @description Map from a flattened IMessage to an AnyMessageType
 */
function fromIMessage(im) {
    switch (im.type) {
        case (TwilioTypes_1.MessageType.SAY):
            return {
                type: TwilioTypes_1.MessageType.SAY,
                text: im.text,
                language: im.language
            };
        case (TwilioTypes_1.MessageType.PLAY):
            return {
                type: TwilioTypes_1.MessageType.PLAY,
                url: im.url
            };
        case (TwilioTypes_1.MessageType.DYNAMIC_PLAY):
            return {
                type: TwilioTypes_1.MessageType.DYNAMIC_PLAY,
                func: utils_1.functionReviver(null, im.func)
            };
        case (TwilioTypes_1.MessageType.DYNAMIC_SAY):
            return {
                type: TwilioTypes_1.MessageType.DYNAMIC_SAY,
                func: utils_1.functionReviver(null, im.func)
            };
        default: {
            throw new Error("Non Exhausive match on IMessage.type: " + im.type);
        }
    }
}
/**
 * @function fromIMessageList
 * @description Map from a flattened IMessageList to an AnyMessageMap
 */
function fromIMessageList(messages) {
    var messageMap = {
        //By default, but in the `end` message map, as it is mandatory
        end: []
    };
    //Prefill map with empty arrays
    utils_1.unique(messages.map(function (im) { return im.messageId; })).forEach(function (messageId) { return messageMap[messageId] = []; });
    messages.forEach(function (im) {
        var anyMessage = fromIMessage(im);
        var messageList = messageMap[im.messageId];
        messageList.push(anyMessage);
        //TODO: will order be maintained?
        messageMap[im.messageId] = messageList;
    });
    return messageMap;
}
/**
 * @function getMessagesForBotId
 * @description Get the MessageMap object given a BotId
 */
function getMessagesForBotIdAndVersionId(botId, versionId) {
    return __awaiter(this, void 0, void 0, function () {
        var messages, err_1, messageMap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    messages = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, message_1["default"].getMessagesForBotIdAndVersionId(botId, versionId)];
                case 2:
                    messages = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, AppProviderTypes_1.makeError(err_1)];
                case 4:
                    if (messages.length === 0) {
                        return [2 /*return*/, AppProviderTypes_1.makeError("No messages found for BotId " + botId + " and VersionId:" + versionId)];
                    }
                    messageMap = fromIMessageList(messages);
                    return [2 /*return*/, AppProviderTypes_1.makeSuccess(messageMap)];
            }
        });
    });
}
exports["default"] = {
    anyMessageToListOfIMessage: anyMessageToListOfIMessage,
    createMessage: createMessage,
    fromIMessage: fromIMessage,
    fromIMessageList: fromIMessageList,
    getMessagesForBotIdAndVersionId: getMessagesForBotIdAndVersionId
};
