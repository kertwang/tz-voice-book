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
var AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
var Bot_1 = __importDefault(require("../models/Bot"));
var assert_1 = __importDefault(require("assert"));
var bot_1 = __importDefault(require("../queries/bot"));
describe('Bot', function () {
    beforeEach(function () {
        //TODO: truncate the table
    });
    afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bot_1["default"]._truncate()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('getBots', function () {
        it('returns an empty array when there are no bots', function () { return __awaiter(_this, void 0, void 0, function () {
            var expected, bots, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        expected = [];
                        _a = AppProviderTypes_1.unsafeUnwrap;
                        return [4 /*yield*/, Bot_1["default"].getBots()];
                    case 1:
                        bots = _a.apply(void 0, [_b.sent()]);
                        // Assert
                        assert_1["default"].deepStrictEqual(bots, expected);
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns a list of bots', function () { return __awaiter(_this, void 0, void 0, function () {
            var bots, rawResult, _a, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        bots = [
                            { id: 'botA', defaultVersionId: 'en_au' },
                            { id: 'botB', defaultVersionId: 'en_au' }
                        ];
                        return [4 /*yield*/, Bot_1["default"].createBot(bots)
                            // Act
                        ];
                    case 1:
                        _b.sent();
                        _a = AppProviderTypes_1.unsafeUnwrap;
                        return [4 /*yield*/, Bot_1["default"].getBots()];
                    case 2:
                        rawResult = _a.apply(void 0, [_b.sent()]);
                        result = rawResult.map(function (b) {
                            delete b.createdAt;
                            delete b.updatedAt;
                            return b;
                        });
                        // Assert
                        assert_1["default"].deepStrictEqual(result, bots);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('createBot', function () {
        it('creates a bot given a single instance', function () { return __awaiter(_this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: 
                    // Arrange
                    // Act
                    return [4 /*yield*/, Bot_1["default"].createBot({ id: 'botA', defaultVersionId: 'en_au' })];
                    case 1:
                        // Arrange
                        // Act
                        _b.sent();
                        _a = AppProviderTypes_1.unsafeUnwrap;
                        return [4 /*yield*/, Bot_1["default"].getBots()];
                    case 2:
                        result = _a.apply(void 0, [_b.sent()]);
                        // Assert
                        assert_1["default"].equal(result[0].id, 'botA');
                        return [2 /*return*/];
                }
            });
        }); });
        it('creates a bot given a list of bots', function () { return __awaiter(_this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: 
                    // Arrange
                    // Act
                    return [4 /*yield*/, Bot_1["default"].createBot([{ id: 'botB', defaultVersionId: 'en_au' }, { id: 'botC', defaultVersionId: 'en_au' }])];
                    case 1:
                        // Arrange
                        // Act
                        _b.sent();
                        _a = AppProviderTypes_1.unsafeUnwrap;
                        return [4 /*yield*/, Bot_1["default"].getBots()];
                    case 2:
                        result = _a.apply(void 0, [_b.sent()]);
                        // Assert
                        assert_1["default"].equal(result.length, 2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('creates multiple bots with the same id without failing', function () { return __awaiter(_this, void 0, void 0, function () {
            var botIds;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        botIds = ['abc1', 'abc2'];
                        return [4 /*yield*/, botIds.reduce(function (acc, curr) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, acc];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/, Bot_1["default"].createBot({ id: curr, defaultVersionId: 'en_au' })];
                                    }
                                });
                            }); }, Promise.resolve(AppProviderTypes_1.makeSuccess([])))
                            // Assert
                        ];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
