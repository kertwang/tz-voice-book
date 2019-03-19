"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var assert = __importStar(require("assert"));
var TwilioRouter_1 = __importDefault(require("./TwilioRouter"));
var mocha_1 = require("mocha");
var FirebaseApi_1 = __importDefault(require("./FirebaseApi"));
var TwilioTypes_1 = require("../types_rn/TwilioTypes");
var admin = require('firebase-admin');
admin.initializeApp();
var fs = admin.firestore();
var botConfig = {};
var ctx = {
    callSid: '12345',
    mobile: '+61410233233',
    toMobile: '+61410233233',
    firebaseApi: new FirebaseApi_1["default"](fs),
    userId: 'user_12345',
    versionOverride: null,
    dynamicParams: [],
    page: 1,
    pageSize: 1,
    maxMessages: 1
};
mocha_1.describe.skip('TwilioRouter', function () {
    mocha_1.describe('/entrypoint', function () {
        it('gets the default next message', function () {
            //Arrange
            //Act 
            var result = TwilioRouter_1["default"].nextMessage(ctx, botConfig, TwilioTypes_1.BlockId.entrypoint);
            //Assert
            var expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Hello, and welcome to voicebook</Say><Redirect method="POST">./intro_0</Redirect></Response>';
            assert.equal(expected, result);
        });
    });
    mocha_1.describe('/intro_0', function () {
        it('gets the default next message', function () {
            //Arrange
            //Act 
            var result = TwilioRouter_1["default"].nextMessage(ctx, botConfig, TwilioTypes_1.BlockId.intro_0);
            //Assert
            var expected = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response><Gather action=\"./gather/intro_0\" method=\"POST\" language=\"sw-TZ\" input=\"speech\" hints=\"sikiliza,tuma,msaada,kurudia\"><Say>To learn what is new in your community say sikiliza. To record a message that people in your community can hear, say tuma. To learn more about this service say msaada. To hear these options again say kurudia.</Say></Gather><Say>We didn't receive any input. Hrrmm.</Say></Response>";
            assert.equal(expected, result);
        });
    });
    mocha_1.describe('gather intro_0', function () {
        it('handles error case', function () {
            //Arrange
            var gatherResult = {
                digits: '10'
            };
            //Act
            var result = TwilioRouter_1["default"].gatherNextMessage(ctx, botConfig, TwilioTypes_1.BlockId.entrypoint, gatherResult);
            //Assert
            var expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Sorry, something went wrong</Say></Response>';
            assert.equal(expected, result);
        });
        it('handles a success case', function () {
            //Arrange
            var gatherResult = {
                digits: '1'
            };
            //Act
            var result = TwilioRouter_1["default"].gatherNextMessage(ctx, botConfig, TwilioTypes_1.BlockId.entrypoint, gatherResult);
            //Assert
            var expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Redirect method="POST">../listen_0</Redirect></Response>';
            assert.equal(expected, result);
        });
    });
});
