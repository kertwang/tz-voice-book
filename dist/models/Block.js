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
var block_1 = __importDefault(require("../queries/block"));
function getBlocks() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, AppProviderTypes_1.makeError('not implemented')];
        });
    });
}
function getBlockMapForBotId(botId) {
    return __awaiter(this, void 0, void 0, function () {
        var blockResult, rawBlocks, blockMap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, block_1["default"].getBlocksForBotId(botId)];
                case 1:
                    blockResult = _a.sent();
                    if (blockResult.type === AppProviderTypes_1.ResultType.ERROR) {
                        return [2 /*return*/, blockResult];
                    }
                    rawBlocks = blockResult.result;
                    blockMap = tBlockListToAnyBlockMap(rawBlocks);
                    return [2 /*return*/, AppProviderTypes_1.makeSuccess(blockMap)];
            }
        });
    });
}
function createBlock(block) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!Array.isArray(block)) {
                        block = [block];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, block_1["default"].createBlocks(block, true)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, AppProviderTypes_1.makeError(err_1)];
                case 4: return [2 /*return*/, AppProviderTypes_1.makeSuccess(block)];
            }
        });
    });
}
/**
 * convert an AnyBlockMap into a list of TBlocks for
 * the database to handle
 */
function anyBlockMapToListOfTBlock(input, botId) {
    var blockList = [];
    Object.keys(input).forEach(function (blockId) {
        var anyBlock = input[blockId];
        var block = {
            botId: botId,
            blockId: blockId,
            type: anyBlock.type
        };
        blockList.push(block);
    });
    return blockList;
}
function tBlockListToAnyBlockMap(input) {
    var blockMap = {};
    input.forEach(function (inputBlock) {
        blockMap[inputBlock.blockId] = tBlockToAnyBlock(inputBlock);
    });
    return blockMap;
}
function tBlockToAnyBlock(input) {
    //TODO: make this type stricter
    var output = {
        type: input.type
    };
    return output;
}
exports["default"] = {
    anyBlockMapToListOfTBlock: anyBlockMapToListOfTBlock,
    createBlock: createBlock,
    getBlocks: getBlocks,
    getBlockMapForBotId: getBlockMapForBotId
};
