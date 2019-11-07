"use strict";
exports.__esModule = true;
var app = require('express-promise-router')();
app.get('/', function (req, res) {
    res.json({
        status: 'OK'
    });
});
exports["default"] = app;
