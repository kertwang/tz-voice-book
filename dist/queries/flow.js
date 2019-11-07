"use strict";
// import util from 'util'
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
// import { getFieldsIfExist } from '../utils';
var AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
var table = 'flow';
function getAllFlows() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1["default"](table)
                    .select('*')];
        });
    });
}
function getFlowsForBotId(botId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1["default"](table)
                    .where({
                    botId: botId
                })
                    .select('*')
                    .then(function (r) { return AppProviderTypes_1.makeSuccess(r); })["catch"](function (err) { return AppProviderTypes_1.makeError(err); })];
        });
    });
}
function getFlowForBotIdAndFlowId(botId, flowId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1["default"](table)
                    .where({
                    botId: botId,
                    flowId: flowId
                })
                    .select('*')];
        });
    });
}
function createFlows(flows, upsert) {
    return __awaiter(this, void 0, void 0, function () {
        var insert, query;
        return __generator(this, function (_a) {
            if (!upsert) {
                return [2 /*return*/, db_1["default"](table)
                        .insert(flows)
                        .then(function () { return AppProviderTypes_1.makeSuccess(undefined); })["catch"](function (err) { return AppProviderTypes_1.makeError(err); })];
            }
            insert = db_1["default"](table)
                .insert(flows)
                .toString();
            query = "\n   " + insert + "\n    ON CONFLICT (\"bot_id\", \"flow_id\") DO UPDATE\n    SET \n      type = excluded.type, \n      next = excluded.next, \n      digit_matches = excluded.digit_matches, \n      error = excluded.error;\n  ";
            return [2 /*return*/, db_1["default"].raw(query)
                    .then(function () { return AppProviderTypes_1.makeSuccess(undefined); })["catch"](function (err) { return AppProviderTypes_1.makeError(err); })];
        });
    });
}
/* FOR TESTING ONLY */
function _truncate() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // return db('bot').truncate()
            return [2 /*return*/, db_1["default"].raw('TRUNCATE TABLE flow CASCADE')];
        });
    });
}
exports["default"] = {
    createFlows: createFlows,
    getAllFlows: getAllFlows,
    getFlowsForBotId: getFlowsForBotId,
    getFlowForBotIdAndFlowId: getFlowForBotIdAndFlowId,
    _truncate: _truncate
};
