"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ZapierApi_1 = __importDefault(require("./ZapierApi"));
describe('ZapierApi Service', function () {
    it('Send a number to the opt out zap', async () => {
        //Arrange
        const mobile = "12345";
        //Act
        await ZapierApi_1.default.optOut(mobile);
        //Assert
        //Don't need a response, if it doesn't throw then ok.
    });
});
