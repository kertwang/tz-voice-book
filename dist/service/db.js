"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var knex_1 = __importDefault(require("knex"));
var config = require('../../config/knexfile.js');
var db = knex_1["default"](config);
exports["default"] = db;
