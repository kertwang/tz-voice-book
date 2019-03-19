"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("./AppError"));
function default_1(err, req, res, next) {
    console.log("error", err);
    if (typeof err === typeof AppError_1.default) {
        const appError = err;
        return res.status(appError.statusCode)
            .json({ status: appError.statusCode, message: appError.message });
    }
    if (err.status) {
        return res.status(err.status).json(err);
    }
    return res.status(500).json({ status: 500, message: err.message });
}
exports.default = default_1;
