"use strict";
exports.__esModule = true;
var mocha_1 = require("mocha");
var LogTypes_1 = require("../types_rn/LogTypes");
var Log_1 = require("./Log");
mocha_1.describe('Logger Tests', function () {
    it('logs correctly', function () {
        Log_1.log({
            type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
            intent: 'menu.call.mobile.formal',
            sessionId: "12345"
        });
    });
});
