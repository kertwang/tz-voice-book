"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var assert_1 = __importDefault(require("assert"));
var Firestore_1 = __importDefault(require("./Firestore"));
// import { describe } from 'mocha';
var FirebaseApi_1 = __importDefault(require("./FirebaseApi"));
// import { Recording } from './UserApi';
// import * as moment from 'moment';
// import { BotId, VersionId, CallContext } from '../types_rn/TwilioTypes';
/**
 * FirebaseApi Service Test
 *
 * These require the service to be working etc.
 */
describe('FirebaseApi', function () {
    this.timeout(5000);
    var firebaseApi = new FirebaseApi_1["default"](Firestore_1["default"]);
    var ctx = {
        callSid: '12345',
        mobile: '+61410233233',
        toMobile: '+61410233233',
        userId: 'user_12345',
        versionOverride: null,
        dynamicParams: [],
        page: 1,
        pageSize: 1,
        maxMessages: 1,
        enableDemoMessages: true
    };
    describe('getRecordings', function () {
        var _this = this;
        it('gets recordings for voicebook', function () { return __awaiter(_this, void 0, void 0, function () {
            var recordings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, firebaseApi.getRecordings(ctx.maxMessages, 'voicebook')];
                    case 1:
                        recordings = _a.sent();
                        //Assert
                        assert_1["default"].strictEqual(recordings.length, 1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    //TODO:this still saves to the wrong firebase account o
    // describe('getPendingRecordings', () => {
    //   let pendingId: string;
    //   //Save a new recording
    //   this.beforeAll(async() => {
    //     const recording: Recording = {
    //       url: 'example.com',
    //       createdAt: moment().toISOString(),
    //       callSid: '12345',
    //     };
    //     pendingId = await firebaseApi.savePendingRecording(recording);
    //   });
    //   it('gets the pending recordings', async () => {
    //     //Arrange
    //     const callSid = "12345";
    //     //Act
    //     const recordings: Recording[] = await firebaseApi.getPendingRecordings(callSid, 1);
    //     //Assert
    //     assert.equal(recordings.length, 1);
    //   })
    //   this.afterAll(async() => {
    //     await fs.collection('pendingRecordings').doc(pendingId).delete();
    //   });
    //   //TODO: cleanup
    // });
    // describe('getPendingRecordingsWithRetries', () => {
    //   it('tries all the times', async () => {
    //     //Arrange
    //     //Act
    //     const result = await firebaseApi.getPendingRecordingsWithRetries('not_a_real_call', 1, 5);
    //     //Assert
    //   });
    // });
    // describe('getContent', function() {
    //   it('gets the content', async () => {
    //     //Arrange
    //     //Act 
    //     const content = await firebaseApi.getBlockContent('123', '123');
    //     //Assert
    //     //We can at least make sure the content is the right size.
    //     assert.equal(16, Object.keys(content).length);
    //   });
    // });
    // /**
    //  * Don't use this. Use gulp instead
    //  */
    // describe.skip('saveBlockConfigToFirebase', function() {
    //   it('saves the block config', async () => {
    //     const en_us_flows = require('../admin/content/en_us_flows');
    //     const en_us_blocks = require('../admin/content/en_us_blocks');
    //     const en_us_messages = require('../admin/content/en_us_messages');
    //     await firebaseApi.deployConfigForBotAndVersion(BotId.voicebook, VersionId.en_us, {
    //       messages: en_us_messages,
    //       blocks: en_us_blocks,
    //       flows: en_us_flows,
    //     });
    //   });
    // });
});
