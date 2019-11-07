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
var TwilioTypes_1 = require("../types_rn/TwilioTypes");
var AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
var flow_1 = __importDefault(require("../queries/flow"));
var utils_1 = require("../utils");
function anyFlowMapToListOfTFlow(input, botId) {
    var flowList = [];
    Object.keys(input).forEach(function (flowId) {
        var anyFlow = input[flowId];
        var flow = {
            botId: botId,
            flowId: flowId,
            type: anyFlow.type
        };
        switch (anyFlow.type) {
            case TwilioTypes_1.FlowType.DEFAULT: {
                flow = __assign({}, flow, { next: anyFlow.next });
                break;
            }
            case TwilioTypes_1.FlowType.GATHER: {
                flow = __assign({}, flow, { digitMatches: JSON.stringify(anyFlow.digitMatches), error: anyFlow.error });
            }
        }
        flowList.push(flow);
    });
    return flowList;
}
function tFlowListToAnyFlowMap(input) {
    var anyFlowMap = {};
    input.forEach(function (tflow) {
        anyFlowMap[tflow.flowId] = tFlowToAnyFlow(tflow);
    });
    return anyFlowMap;
}
function tFlowToAnyFlow(input) {
    switch (input.type) {
        case TwilioTypes_1.FlowType.DEFAULT:
            return {
                next: utils_1.as(utils_1.exists(input.next)),
                type: TwilioTypes_1.FlowType.DEFAULT
            };
        case TwilioTypes_1.FlowType.GATHER:
            return {
                type: TwilioTypes_1.FlowType.GATHER,
                error: utils_1.as(utils_1.exists(input.error)),
                digitMatches: utils_1.as(utils_1.exists(input.digitMatches))
            };
    }
}
function getFlows() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, AppProviderTypes_1.makeError('not implemented')];
        });
    });
}
function getFlowsForBotId(botId) {
    return __awaiter(this, void 0, void 0, function () {
        var queryResult, anyFlowMap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, flow_1["default"].getFlowsForBotId(botId)];
                case 1:
                    queryResult = _a.sent();
                    if (queryResult.type === AppProviderTypes_1.ResultType.ERROR) {
                        return [2 /*return*/, queryResult];
                    }
                    anyFlowMap = tFlowListToAnyFlowMap(queryResult.result);
                    return [2 /*return*/, AppProviderTypes_1.makeSuccess(anyFlowMap)];
            }
        });
    });
}
function createFlow(flow) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!Array.isArray(flow)) {
                        flow = [flow];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, flow_1["default"].createFlows(flow, true)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, AppProviderTypes_1.makeError(err_1)];
                case 4: return [2 /*return*/, AppProviderTypes_1.makeSuccess(flow)];
            }
        });
    });
}
exports["default"] = {
    anyFlowMapToListOfTFlow: anyFlowMapToListOfTFlow,
    createFlow: createFlow,
    getFlows: getFlows,
    getFlowsForBotId: getFlowsForBotId
};