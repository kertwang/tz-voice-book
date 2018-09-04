"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const TwilioRouter_1 = require("./TwilioRouter");
const mocha_1 = require("mocha");
mocha_1.describe('TwilioRouter', function () {
    mocha_1.describe('/entrypoint', () => {
        it('gets the default next message', () => {
            //Arrange
            //Act 
            const result = TwilioRouter_1.default.nextMessage('entrypoint');
            //Assert
            assert.equal('test 123', result);
        });
    });
});
//# sourceMappingURL=TwilioRouterTest.js.map