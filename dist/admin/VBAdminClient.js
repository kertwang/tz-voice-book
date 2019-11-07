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
var request_promise_native_1 = __importDefault(require("request-promise-native"));
var AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
var Env_1 = require("../utils/Env");
var VBAdminClient = /** @class */ (function () {
    function VBAdminClient() {
    }
    VBAdminClient.createContent = function (botConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                options = {
                    url: Env_1.baseUrl + "/admin/content/" + botConfig.botId,
                    method: 'POST',
                    json: true,
                    body: __assign({}, botConfig)
                };
                return [2 /*return*/, request_promise_native_1["default"](options)
                        .then(function () { return AppProviderTypes_1.makeSuccess(undefined); })["catch"](function (err) { return AppProviderTypes_1.makeError(err); })];
            });
        });
    };
    VBAdminClient.getHealth = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                options = {
                    url: Env_1.baseUrl + "/health",
                    method: 'GET',
                    json: true
                };
                return [2 /*return*/, request_promise_native_1["default"](options)
                        .then(function (response) { return AppProviderTypes_1.makeSuccess(response); })["catch"](function (err) { return AppProviderTypes_1.makeError(err); })];
            });
        });
    };
    VBAdminClient.triggerCall = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                options = {
                    url: Env_1.baseUrl + "/twiml/triggerCall",
                    method: 'POST',
                    json: true,
                    form: __assign({}, req)
                };
                return [2 /*return*/, request_promise_native_1["default"](options)
                        .then(function () { return AppProviderTypes_1.makeSuccess(undefined); })["catch"](function (err) { return AppProviderTypes_1.makeError(err); })];
            });
        });
    };
    VBAdminClient.postTwiml = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                options = {
                    method: 'POST',
                    // TODO: Parse out query params properly
                    url: Env_1.baseUrl + "/twiml/" + req.botId + "/" + req.blockId + "?versionOverride=" + req.versionOverride,
                    json: true,
                    //Mimic Twilio, which uses application/x-www-form-urlencoded
                    form: req.body
                };
                return [2 /*return*/, request_promise_native_1["default"](options)
                        .then(function (response) { return AppProviderTypes_1.makeSuccess(response); })["catch"](function (err) { return AppProviderTypes_1.makeError(err); })];
            });
        });
    };
    VBAdminClient.getBotConfig = function (botId, versionId) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                options = {
                    method: 'GET',
                    url: Env_1.baseUrl + "/admin/content/" + botId + "/" + versionId,
                    json: true
                };
                return [2 /*return*/, request_promise_native_1["default"](options)
                        .then(function (response) { return AppProviderTypes_1.makeSuccess(response); })["catch"](function (err) { return AppProviderTypes_1.makeError(err); })];
            });
        });
    };
    return VBAdminClient;
}());
exports["default"] = VBAdminClient;
