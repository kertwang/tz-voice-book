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
var TwilioTypes_1 = require("../types_rn/TwilioTypes");
var block_1 = __importDefault(require("./block"));
var bot_1 = __importDefault(require("./bot"));
describe('block queries', function () {
    describe('createBlocks', function () {
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bot_1["default"].createBots([{ id: 'botA', defaultVersionId: 'en_au' }], true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, block_1["default"]._truncate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, bot_1["default"]._truncate()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('creates a new block', function () { return __awaiter(_this, void 0, void 0, function () {
            var blocks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blocks = [
                            { botId: 'botA', blockId: 'block1', type: TwilioTypes_1.BlockType.DEFAULT },
                        ];
                        // Act
                        return [4 /*yield*/, block_1["default"].createBlocks(blocks, false)
                            // Assert
                            // Assume this didn't fail
                        ];
                    case 1:
                        // Act
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('fails to upsert on multiple rows of the same key', function () { return __awaiter(_this, void 0, void 0, function () {
            var blocks, action;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blocks = [
                            { botId: 'botA', blockId: 'block1', type: TwilioTypes_1.BlockType.DEFAULT },
                            { botId: 'botA', blockId: 'block1', type: TwilioTypes_1.BlockType.END }
                        ];
                        action = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, block_1["default"].createBlocks(blocks, true)
                                    // Assert 
                                ];
                                case 1: return [2 /*return*/, _a.sent()
                                    // Assert 
                                ];
                            }
                        }); }); };
                        // Assert 
                        return [4 /*yield*/, assert_1["default"].rejects(action)];
                    case 1:
                        // Assert 
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('performs an upsert when updating an existing block', function () { return __awaiter(_this, void 0, void 0, function () {
            var blocks1, blocks2, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blocks1 = [
                            { botId: 'botA', blockId: 'block1', type: TwilioTypes_1.BlockType.DEFAULT },
                        ];
                        blocks2 = [
                            { botId: 'botA', blockId: 'block1', type: TwilioTypes_1.BlockType.END },
                            { botId: 'botA', blockId: 'block2', type: TwilioTypes_1.BlockType.END }
                        ];
                        // First create a block, that will cause the next step to not upsert and fail
                        return [4 /*yield*/, block_1["default"].createBlocks([blocks1[0]], false)
                            // Act
                        ];
                    case 1:
                        // First create a block, that will cause the next step to not upsert and fail
                        _a.sent();
                        // Act
                        return [4 /*yield*/, block_1["default"].createBlocks(blocks2, true)
                            // Assert 
                        ];
                    case 2:
                        // Act
                        _a.sent();
                        return [4 /*yield*/, block_1["default"].getBlockForBotIdAndBlockId('botA', 'block1')];
                    case 3:
                        result = _a.sent();
                        assert_1["default"].equal(result[0].type, TwilioTypes_1.BlockType.END);
                        return [2 /*return*/];
                }
            });
        }); });
        it('performs an upsert with only 1 row', function () { return __awaiter(_this, void 0, void 0, function () {
            var blocks, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blocks = [
                            { botId: 'botA', blockId: 'block1', type: TwilioTypes_1.BlockType.RECORD },
                        ];
                        // Act
                        return [4 /*yield*/, block_1["default"].createBlocks(blocks, true)
                            // Assert 
                        ];
                    case 1:
                        // Act
                        _a.sent();
                        return [4 /*yield*/, block_1["default"].getBlockForBotIdAndBlockId('botA', 'block1')];
                    case 2:
                        result = _a.sent();
                        assert_1["default"].equal(result[0].type, TwilioTypes_1.BlockType.RECORD);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
