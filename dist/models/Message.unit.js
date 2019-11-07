"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var assert_1 = __importDefault(require("assert"));
var Message_1 = __importDefault(require("./Message"));
var index_1 = __importDefault(require("../admin/content/rungweDeposit/index"));
describe('Message', function () {
    describe('anyMessageToListOfIMessage', function () {
        it('converts an AnyMessage to a list of IMessages', function () {
            // Arrange
            var input = index_1["default"].en_text.messages;
            var expected = [
                {
                    botId: 'botA',
                    messageId: 'entrypoint',
                    index: 0,
                    type: 'SAY',
                    text: 'Hi, this message is from the Rungwe Smallholders Tea Growers Association(RSTGA).Thank you for depositing',
                    language: 'en-US',
                    versionId: "en_us"
                },
                {
                    botId: 'botA',
                    messageId: 'entrypoint',
                    index: 1,
                    type: 'DYNAMIC_SAY',
                    func: {
                        type: 'function',
                        arguments: 'params',
                        body: '\n                return [{\n                        type: \'SAY\',\n                        text: params[0],\n                        language: \'en-US\'\n                    }];\n            '
                    },
                    versionId: "en_us"
                },
                {
                    botId: 'botA',
                    messageId: 'entrypoint',
                    index: 2,
                    type: 'SAY',
                    text: 'kg of green leaf at',
                    language: 'en-US',
                    versionId: "en_us"
                },
                {
                    botId: 'botA',
                    messageId: 'entrypoint',
                    index: 3,
                    type: 'SAY',
                    text: 'LOCATION.',
                    language: 'en-US',
                    versionId: "en_us"
                },
            ];
            // Act
            var result = Message_1["default"].anyMessageToListOfIMessage(input, 'botA', 'en_us');
            // Assert
            assert_1["default"].deepStrictEqual(result, expected);
        });
    });
    describe('fromIMessage', function () {
        it('converts from IMessage to AnyMessageType dict', function () {
            // Arrange
            var input = [
                {
                    botId: 'botA',
                    messageId: 'entrypoint',
                    index: 0,
                    type: 'SAY',
                    text: 'Hi, this message is from the Rungwe Smallholders Tea Growers Association(RSTGA).Thank you for depositing',
                    language: 'en-US',
                    versionId: 'en_us'
                },
                {
                    botId: 'botA',
                    messageId: 'entrypoint',
                    index: 1,
                    type: 'DYNAMIC_SAY',
                    func: {
                        type: 'function',
                        arguments: 'params',
                        body: '\n                return [{\n                        type: \'SAY\',\n                        text: params[0],\n                        language: \'en-US\'\n                    }];\n            '
                    },
                    versionId: 'en_us'
                },
                {
                    botId: 'botA',
                    messageId: 'entrypoint',
                    index: 2,
                    type: 'SAY',
                    text: 'kg of green leaf at',
                    language: 'en-US',
                    versionId: 'en_us'
                },
                {
                    botId: 'botA',
                    messageId: 'entrypoint',
                    index: 3,
                    type: 'SAY',
                    text: 'LOCATION.',
                    language: 'en-US',
                    versionId: 'en_us'
                }
            ];
            // Act
            var result = Message_1["default"].fromIMessageList(input);
            // Assert
            // We need to filter out the func to make sure the objects match exactly
            assert_1["default"].deepStrictEqual(JSON.parse(JSON.stringify(result, null, 2)), JSON.parse(JSON.stringify(index_1["default"].en_text.messages, null, 2)));
        });
    });
});
