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
var db_1 = __importDefault(require("../service/db"));
var AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
var table = 'bot';
function getAllBots() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1["default"](table)
                    .select('*')];
        });
    });
}
function getBotForId(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1["default"](table)
                    .where({
                    id: id
                })
                    .select('*')
                    .then(function (bots) {
                    if (bots.length === 0) {
                        throw new Error("Could not find bot for id: " + id);
                    }
                    //We can assume there won't be more than 1 bot thanks to the database
                    return AppProviderTypes_1.makeSuccess(bots[0]);
                })["catch"](function (err) { return AppProviderTypes_1.makeError(err); })];
        });
    });
}
function createBots(bots, ignoreIfExists) {
    return __awaiter(this, void 0, void 0, function () {
        var botsDict_1, existingBots, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!ignoreIfExists) return [3 /*break*/, 2];
                    botsDict_1 = {};
                    bots.forEach(function (b) { return botsDict_1[b.id] = b; });
                    return [4 /*yield*/, getAllBots()];
                case 1:
                    existingBots = _a.sent();
                    existingBots.map(function (b) { return b.id; }).forEach(function (botId) { return delete botsDict_1[botId]; });
                    bots = Object.keys(botsDict_1).map(function (botId) { return botsDict_1[botId]; });
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, db_1["default"].insert(bots)
                            .into(table)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    if (ignoreIfExists) {
                        console.log("warning: ignoring Error in createBots");
                        return [2 /*return*/];
                    }
                    throw err_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function patchBot(id, bot) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1["default"]('bot')
                    .where({ id: id })
                    .update(bot)];
        });
    });
}
function deleteBot(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1["default"]('bot')
                    .where({ id: id })["delete"]()];
        });
    });
}
/* FOR TESTING ONLY */
function _truncate() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1["default"].raw('TRUNCATE TABLE bot, block CASCADE')];
        });
    });
}
exports["default"] = {
    createBots: createBots,
    deleteBot: deleteBot,
    getAllBots: getAllBots,
    getBotForId: getBotForId,
    patchBot: patchBot,
    _truncate: _truncate
};
