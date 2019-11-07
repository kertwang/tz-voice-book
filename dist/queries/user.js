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
var db_1 = __importDefault(require("../service/db"));
var AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
var objection_1 = require("objection");
var table = 'vb_user';
var mappers = objection_1.knexSnakeCaseMappers();
function getAll() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1["default"](table)
                    .select('*')
                    .then(function (r) { return AppProviderTypes_1.makeSuccess(r); })["catch"](function (err) { return AppProviderTypes_1.makeError(err); })];
        });
    });
}
function getForId(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1["default"](table)
                    .where({
                    id: id
                })
                    .select('*')
                    .then(function (users) {
                    if (users.length === 0) {
                        throw new Error("Could not find user for id: " + id);
                    }
                    //We can assume there won't be more than 1 bot thanks to the database
                    return AppProviderTypes_1.makeSuccess(users[0]);
                })["catch"](function (err) { return AppProviderTypes_1.makeError(err); })];
        });
    });
}
function _getForMobileList(mobile) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1["default"](table)
                    .where({
                    mobile: mobile
                })
                    .select('*')];
        });
    });
}
function getForMobile(mobile) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, _getForMobileList(mobile)
                    .then(function (users) {
                    if (users.length === 0) {
                        throw new Error("Could not find user for mobile: " + mobile);
                    }
                    //We can assume there won't be more than 1 bot thanks to the database
                    return AppProviderTypes_1.makeSuccess(users[0]);
                })["catch"](function (err) { return AppProviderTypes_1.makeError(err); })];
        });
    });
}
function getOrCreateForMobile(mobile, defaults) {
    return __awaiter(this, void 0, void 0, function () {
        var users, defaultUser, createdUsers, _a, user, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, _getForMobileList(mobile)];
                case 1:
                    users = _b.sent();
                    if (users.length > 0) {
                        return [2 /*return*/, AppProviderTypes_1.makeSuccess(users[0])];
                    }
                    defaultUser = __assign({ mobile: mobile }, defaults);
                    _a = AppProviderTypes_1.unsafeUnwrap;
                    return [4 /*yield*/, createUsers([defaultUser], false)];
                case 2:
                    createdUsers = _a.apply(void 0, [_b.sent()]);
                    user = createdUsers[0];
                    return [2 /*return*/, AppProviderTypes_1.makeSuccess(user)];
                case 3:
                    err_1 = _b.sent();
                    return [2 /*return*/, AppProviderTypes_1.makeError(err_1)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function createUsers(users, upsert) {
    return __awaiter(this, void 0, void 0, function () {
        var insert, query;
        return __generator(this, function (_a) {
            if (!upsert) {
                return [2 /*return*/, db_1["default"](table)
                        .insert(users)
                        .returning('*')
                        .then(function (createdIds) { return AppProviderTypes_1.makeSuccess(createdIds); })["catch"](function (err) { return AppProviderTypes_1.makeError(err); })];
            }
            insert = db_1["default"](table)
                .insert(users)
                .toString();
            query = "\n   " + insert + "\n    ON CONFLICT (\"mobile\") DO UPDATE\n    SET \n      mobile = excluded.mobile, \n      name = excluded.name\n    RETURNING *\n  ";
            return [2 /*return*/, db_1["default"].raw(query)
                    .then(function (result) {
                    var processedRows = mappers.postProcessResponse(result.rows);
                    return AppProviderTypes_1.makeSuccess(processedRows);
                })["catch"](function (err) { return AppProviderTypes_1.makeError(err); })];
        });
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1["default"](table)
                    .where({ id: id })["delete"]()];
        });
    });
}
/* FOR TESTING ONLY */
function _truncate() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1["default"].raw('TRUNCATE TABLE vb_user')];
        });
    });
}
exports["default"] = {
    getAll: getAll,
    getForId: getForId,
    getForMobile: getForMobile,
    getOrCreateForMobile: getOrCreateForMobile,
    createUsers: createUsers,
    deleteUser: deleteUser,
    _truncate: _truncate
};
