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
var _this = this;
exports.__esModule = true;
var assert_1 = __importDefault(require("assert"));
var sinon_1 = __importDefault(require("sinon"));
var TestUtil_1 = __importDefault(require("../utils/TestUtil"));
var TwimlHandler_1 = __importDefault(require("./TwimlHandler"));
var sandbox;
describe('TwimlHandler', function () {
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            sandbox = sinon_1["default"].createSandbox();
            return [2 /*return*/];
        });
    }); });
    afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sandbox.restore();
                    //Clear the database
                    return [4 /*yield*/, TestUtil_1["default"]._truncateAll()];
                case 1:
                    //Clear the database
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('postGather', function () {
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, TestUtil_1["default"].createDemoContent()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles a simple gather', function () { return __awaiter(_this, void 0, void 0, function () {
            var baseUrl, req, res, expected, calledWith;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = 'http://localhost:3000';
                        req = {
                            params: {
                                botId: 'botA'
                            },
                            path: baseUrl + "/twiml/botA/entrypoint_option",
                            body: {
                                From: '+61555666777',
                                To: '+1655111222',
                                Direction: 'outbound-api',
                                Digits: '0'
                            },
                            query: {
                                page: 0,
                                pageSize: 1,
                                maxMessages: 3
                            }
                        };
                        res = {
                            end: sandbox.mock(),
                            writeHead: sandbox.mock()
                        };
                        expected = [
                            '<?xml version="1.0" encoding="UTF-8"?><Response><Redirect method="POST">http://localhost:3000/twiml/botA/amount_repeat</Redirect></Response>'
                        ];
                        // Act
                        return [4 /*yield*/, TwimlHandler_1["default"].postGather(req, res)
                            // Assert
                        ];
                    case 1:
                        // Act
                        _a.sent();
                        // Assert
                        assert_1["default"](res.writeHead.calledOnce);
                        assert_1["default"](res.end.calledOnce);
                        calledWith = res.end.getCall(0).args;
                        assert_1["default"].deepStrictEqual(calledWith, expected);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('postBot', function () {
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, TestUtil_1["default"].createDemoContent()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('handles the entrypoint message', function () { return __awaiter(_this, void 0, void 0, function () {
            var baseUrl, req, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = 'http://localhost:3000';
                        req = {
                            params: {
                                botId: 'botA'
                            },
                            path: baseUrl + "/twiml/botA/entrypoint",
                            body: {
                                From: '+61555666777',
                                To: '+1655111222',
                                Direction: 'outbound-api'
                            },
                            query: {
                                page: 0,
                                pageSize: 1,
                                maxMessages: 3
                            }
                        };
                        res = {
                            end: sandbox.mock(),
                            writeHead: sandbox.mock()
                        };
                        // Act
                        return [4 /*yield*/, TwimlHandler_1["default"].postBot(req, res)
                            // Assert
                        ];
                    case 1:
                        // Act
                        _a.sent();
                        // Assert
                        assert_1["default"](res.writeHead.calledOnce);
                        assert_1["default"](res.end.calledOnce);
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns a 404 when blockId could not be found');
        it('returns a 404 when blockId is missing from Config.messages');
    });
});
