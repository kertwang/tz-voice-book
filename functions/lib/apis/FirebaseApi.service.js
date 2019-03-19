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
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const Firestore_1 = __importDefault(require("./Firestore"));
const mocha_1 = require("mocha");
const FirebaseApi_1 = __importDefault(require("./FirebaseApi"));
const moment = __importStar(require("moment"));
const TwilioTypes_1 = require("../types_rn/TwilioTypes");
/**
 * FirebaseApi Service Test
 *
 * These require the service to be working etc.
 */
mocha_1.describe('FirebaseApi', function () {
    this.timeout(5000);
    const firebaseApi = new FirebaseApi_1.default(Firestore_1.default);
    const ctx = {
        callSid: '12345',
        mobile: '+61410233233',
        toMobile: '+61410233233',
        firebaseApi: new FirebaseApi_1.default(Firestore_1.default)
    };
    //TODO:this still saves to the wrong firebase account o
    mocha_1.describe('getPendingRecordings', () => {
        let pendingId;
        //Save a new recording
        this.beforeAll(async () => {
            const recording = {
                url: 'example.com',
                createdAt: moment().toISOString(),
                callSid: '12345',
            };
            pendingId = await firebaseApi.savePendingRecording(recording);
        });
        it('gets the pending recordings', async () => {
            //Arrange
            const callSid = "12345";
            //Act
            const recordings = await firebaseApi.getPendingRecordings(callSid, 1);
            console.log("recordings:", recordings);
            //Assert
            assert.equal(recordings.length, 1);
        });
        this.afterAll(async () => {
            await Firestore_1.default.collection('pendingRecordings').doc(pendingId).delete();
        });
        //TODO: cleanup
    });
    mocha_1.describe('getPendingRecordingsWithRetries', () => {
        it('tries all the times', async () => {
            //Arrange
            //Act
            const result = await firebaseApi.getPendingRecordingsWithRetries('not_a_real_call', 1, 5);
            //Assert
            console.log("result", result);
        });
    });
    mocha_1.describe('getContent', function () {
        it('gets the content', async () => {
            //Arrange
            //Act 
            const content = await firebaseApi.getBlockContent('123', '123');
            //Assert
            //We can at least make sure the content is the right size.
            assert.equal(16, Object.keys(content).length);
        });
    });
    /**
     * Don't use this. Use gulp instead
     */
    mocha_1.describe.skip('saveBlockConfigToFirebase', function () {
        it('saves the block config', async () => {
            const en_us_flows = require('../admin/content/en_us_flows');
            const en_us_blocks = require('../admin/content/en_us_blocks');
            const en_us_messages = require('../admin/content/en_us_messages');
            await firebaseApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.voicebook, TwilioTypes_1.VersionId.en_us, {
                messages: en_us_messages,
                blocks: en_us_blocks,
                flows: en_us_flows,
            });
        });
    });
});
