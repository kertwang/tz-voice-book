"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mocha_1 = require("mocha");
var assert_1 = __importDefault(require("assert"));
var _1 = require(".");
var TwilioTypes_1 = require("../types_rn/TwilioTypes");
var baseUrl = "https://us-central1-tz-phone-book-dev.cloudfunctions.net";
mocha_1.describe('Utils Tests', function () {
    mocha_1.describe('pathToBlock', function () {
        it('gets the path to a block', function () {
            // Arrange
            var input = baseUrl + "/twiml/voicebook/listen_0";
            // Act
            var result = _1.pathToBlock(input);
            // Assert
            assert_1["default"].equal(result, 'listen_0');
        });
    });
    mocha_1.describe('logTwilioResponse', function () {
        it('prints the xml string correctly', function () {
            var input = "<div><h1>Hello world</h1></div>";
            _1.logTwilioResponse(input);
        });
    });
    mocha_1.describe("buildRedirectUrl()", function () {
        it('builds a paginated redirect url', function () {
            //Arrange
            var builder = {
                type: _1.NextUrlType.PaginatedUrl,
                baseUrl: baseUrl,
                botId: TwilioTypes_1.BotId.voicebook,
                blockName: TwilioTypes_1.BlockId.listen_0,
                nextPageNo: 0,
                pageSize: 1,
                maxMessages: 3,
                versionOverride: null
            };
            var expected = baseUrl + "/twiml/voicebook/listen_0?page=0&pageSize=1&maxMessages=3";
            //Act
            var result = _1.buildRedirectUrl(builder);
            //Assert
            assert_1["default"].strictEqual(result, expected);
        });
        it('builds a paginated redirect url with version override', function () {
            //Arrange
            var builder = {
                type: _1.NextUrlType.PaginatedUrl,
                baseUrl: baseUrl,
                botId: TwilioTypes_1.BotId.voicebook,
                blockName: TwilioTypes_1.BlockId.listen_0,
                nextPageNo: 0,
                pageSize: 1,
                maxMessages: 3,
                versionOverride: TwilioTypes_1.VersionId.en_au
            };
            var expected = baseUrl + "/twiml/voicebook/listen_0?page=0&pageSize=1&maxMessages=3&versionOverride=en_au";
            //Act
            var result = _1.buildRedirectUrl(builder);
            //Assert
            assert_1["default"].strictEqual(result, expected);
        });
        it('builds the default url', function () {
            //Arrange
            var builder = {
                type: _1.NextUrlType.DefaultUrl,
                baseUrl: baseUrl,
                botId: TwilioTypes_1.BotId.voicebook,
                blockName: TwilioTypes_1.BlockId.listen_0,
                versionOverride: null
            };
            var expected = baseUrl + "/twiml/voicebook/listen_0";
            //Act
            var result = _1.buildRedirectUrl(builder);
            //Assert
            assert_1["default"].strictEqual(result, expected);
        });
        it('builds the default url with version override', function () {
            //Arrange
            var builder = {
                type: _1.NextUrlType.DefaultUrl,
                baseUrl: baseUrl,
                botId: TwilioTypes_1.BotId.voicebook,
                blockName: TwilioTypes_1.BlockId.listen_0,
                versionOverride: TwilioTypes_1.VersionId.en_au
            };
            var expected = baseUrl + "/twiml/voicebook/listen_0?versionOverride=en_au";
            //Act
            var result = _1.buildRedirectUrl(builder);
            //Assert
            assert_1["default"].strictEqual(result, expected);
        });
        it('builds the recording callback url', function () {
            //Arrange
            var builder = {
                type: _1.NextUrlType.RecordingCallbackUrl,
                baseUrl: baseUrl,
                botId: TwilioTypes_1.BotId.voicebook,
                recordingCallback: "/twiml/voicebook/recordingCallback/message"
            };
            var expected = baseUrl + "/twiml/voicebook/recordingCallback/message";
            //Act
            var result = _1.buildRedirectUrl(builder);
            //Assert
            assert_1["default"].strictEqual(result, expected);
        });
        it('builds the gather url', function () {
            //Arrange
            var builder = {
                type: _1.NextUrlType.GatherUrl,
                baseUrl: baseUrl,
                botId: TwilioTypes_1.BotId.voicebook,
                blockName: TwilioTypes_1.BlockId.listen_0,
                versionOverride: null
            };
            var expected = baseUrl + "/twiml/voicebook/gather/listen_0";
            //Act
            var result = _1.buildRedirectUrl(builder);
            //Assert
            assert_1["default"].strictEqual(result, expected);
        });
        it('builds the gather url with version override', function () {
            //Arrange
            var builder = {
                type: _1.NextUrlType.GatherUrl,
                baseUrl: baseUrl,
                botId: TwilioTypes_1.BotId.voicebook,
                blockName: TwilioTypes_1.BlockId.listen_0,
                versionOverride: TwilioTypes_1.VersionId.en_au
            };
            var expected = baseUrl + "/twiml/voicebook/gather/listen_0?versionOverride=en_au";
            //Act
            var result = _1.buildRedirectUrl(builder);
            //Assert
            assert_1["default"].strictEqual(result, expected);
        });
        it('builds the paginated gather url', function () {
            //Arrange
            var builder = {
                type: _1.NextUrlType.PaginatedGatherUrl,
                baseUrl: baseUrl,
                botId: TwilioTypes_1.BotId.voicebook,
                blockName: TwilioTypes_1.BlockId.listen_0,
                nextPageNo: 0,
                pageSize: 1,
                maxMessages: 3,
                versionOverride: null
            };
            var expected = baseUrl + "/twiml/voicebook/gather/listen_0?page=0&pageSize=1&maxMessages=3";
            //Act
            var result = _1.buildRedirectUrl(builder);
            //Assert
            assert_1["default"].strictEqual(result, expected);
        });
        it('builds the paginated gather url with version override', function () {
            //Arrange
            var builder = {
                type: _1.NextUrlType.PaginatedGatherUrl,
                baseUrl: baseUrl,
                botId: TwilioTypes_1.BotId.voicebook,
                blockName: TwilioTypes_1.BlockId.listen_0,
                nextPageNo: 0,
                pageSize: 1,
                maxMessages: 3,
                versionOverride: TwilioTypes_1.VersionId.en_au
            };
            var expected = baseUrl + "/twiml/voicebook/gather/listen_0?page=0&pageSize=1&maxMessages=3&versionOverride=en_au";
            //Act
            var result = _1.buildRedirectUrl(builder);
            //Assert
            assert_1["default"].strictEqual(result, expected);
        });
    });
    mocha_1.describe('formatMobile()', function () {
        it('Doesn\'t format an existing international number', function () {
            //Arrange
            var unformatted = "+639566512295";
            var country = "TZ";
            //Act
            var formatted = _1.formatMobile(unformatted, country);
            //Assert
            assert_1["default"].strictEqual(unformatted, formatted);
        });
        it('Formats a local number correctly', function () {
            //Arrange
            var unformatted = "9566512295";
            var country = "TZ";
            //Act
            var formatted = _1.formatMobile(unformatted, country);
            //Assert
            assert_1["default"].strictEqual('+2559566512295', formatted);
        });
        it('Formats an international number without + correctly', function () {
            //Arrange
            var unformatted = "16501111234";
            var country = "TZ";
            //Act
            var formatted = _1.formatMobile(unformatted, country);
            //Assert
            assert_1["default"].strictEqual('+25516501111234', formatted);
        });
    });
});
