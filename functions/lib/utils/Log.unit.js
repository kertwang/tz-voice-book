"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const LogTypes_1 = require("../types_rn/LogTypes");
const Log_1 = require("./Log");
mocha_1.describe('Utils Tests', function () {
    it('logs correctly', () => {
        Log_1.log({
            type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
            intent: 'menu.call.mobile.formal',
            sessionId: "12345",
        });
    });
});
