"use strict";
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
var AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
var Bot_1 = __importDefault(require("../models/Bot"));
var Block_1 = __importDefault(require("../models/Block"));
var Flow_1 = __importDefault(require("../models/Flow"));
var Message_1 = __importDefault(require("../models/Message"));
var BotConfigModel_1 = __importDefault(require("../models/BotConfigModel"));
var AdminHandler = /** @class */ (function () {
    function AdminHandler() {
    }
    AdminHandler.getContent = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, botId, versionId, config, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.params, botId = _a.botId, versionId = _a.versionId;
                        _b = AppProviderTypes_1.unsafeUnwrap;
                        return [4 /*yield*/, BotConfigModel_1["default"].getBotConfigForBotIdAndVersionId(botId, versionId)];
                    case 1:
                        config = _b.apply(void 0, [_c.sent()]);
                        res.json(config);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminHandler.postContent = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var botId, defaultVersionId, botConfig, _a, blocks, flows, messages, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        botId = req.params.botId;
                        defaultVersionId = req.params.defaultVersionId;
                        if (!defaultVersionId) {
                            defaultVersionId = 'en_au';
                        }
                        botConfig = req.body;
                        console.log('creating botConfig', botConfig);
                        _a = AppProviderTypes_1.unsafeUnwrap;
                        return [4 /*yield*/, Bot_1["default"].createBot({ id: botId, defaultVersionId: defaultVersionId }, true)];
                    case 1:
                        _a.apply(void 0, [_e.sent()]);
                        blocks = Block_1["default"].anyBlockMapToListOfTBlock(botConfig.blocks, botId);
                        flows = Flow_1["default"].anyFlowMapToListOfTFlow(botConfig.flows, botId);
                        messages = Message_1["default"].anyMessageToListOfIMessage(botConfig.messages, botId, botConfig.versionId);
                        _b = AppProviderTypes_1.unsafeUnwrap;
                        return [4 /*yield*/, Block_1["default"].createBlock(blocks)];
                    case 2:
                        _b.apply(void 0, [_e.sent()]);
                        _c = AppProviderTypes_1.unsafeUnwrap;
                        return [4 /*yield*/, Flow_1["default"].createFlow(flows)];
                    case 3:
                        _c.apply(void 0, [_e.sent()]);
                        _d = AppProviderTypes_1.unsafeUnwrap;
                        return [4 /*yield*/, Message_1["default"].createMessage(messages)];
                    case 4:
                        _d.apply(void 0, [_e.sent()]);
                        res.json(true);
                        return [2 /*return*/];
                }
            });
        });
    };
    return AdminHandler;
}());
exports["default"] = AdminHandler;
