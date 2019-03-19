"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const assert = __importStar(require("assert"));
const _1 = require(".");
mocha_1.describe('Utils Tests', function () {
    mocha_1.describe("buildRedirectUrl()", function () {
    });
    mocha_1.describe('formatMobile()', function () {
        it('Doesn\'t format an existing international number', () => {
            //Arrange
            const unformatted = "+639566512295";
            const country = "TZ";
            //Act
            const formatted = _1.formatMobile(unformatted, country);
            //Assert
            assert.strictEqual(unformatted, formatted);
        });
        it('Formats a local number correctly', () => {
            //Arrange
            const unformatted = "9566512295";
            const country = "TZ";
            //Act
            const formatted = _1.formatMobile(unformatted, country);
            //Assert
            assert.strictEqual('+2559566512295', formatted);
        });
        it('Formats an international number without + correctly', () => {
            //Arrange
            const unformatted = "16501111234";
            const country = "TZ";
            //Act
            const formatted = _1.formatMobile(unformatted, country);
            //Assert
            assert.strictEqual('+25516501111234', formatted);
        });
    });
});
