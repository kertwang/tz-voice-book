"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const moment = require("moment");
//@ts-ignore
const morgan = require("morgan");
//@ts-ignore
const morganBody = require("morgan-body");
const TwilioRouter_1 = require("../apis/TwilioRouter");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const utils_1 = require("../utils");
const FirebaseApi_1 = require("../apis/FirebaseApi");
const Firestore_1 = require("../apis/Firestore");
//TODO: make newer import format
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const bodyParser = require('body-parser');
const Joi = require('joi');
module.exports = (functions) => {
    const app = express();
    app.use(bodyParser.json());
    const firebaseApi = new FirebaseApi_1.default(Firestore_1.default);
    if (process.env.VERBOSE_LOG === 'false') {
        console.log('Using simple log');
        app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
    }
    else {
        console.log('Using verbose log');
        morganBody(app);
        // app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
    }
    /* CORS Configuration */
    const openCors = cors({ origin: '*' });
    app.use(openCors);
    /**
     * Collect partial results for debugging purposes.
     */
    app.post('/recognitionResults', (req, res) => {
        console.log(`stable: '${req.body.StableSpeechResult}' unstable: '${req.body.UnstableSpeechResult}'`);
        res.json(true);
    });
    /**
     * Callback triggered once feedback recording is finished
     */
    app.post('/recordingCallback/feedback', (req, res) => {
        console.log(`SAVED recording to: ${req.body.RecordingUrl}`);
        //TODO: save to a feedback object
        res.json(true);
    });
    /**
     * Handle Twilio Callback to save the recording for pending submission.
     */
    app.post('/recordingCallback/message', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const recording = {
            url: req.body.RecordingUrl,
            createdAt: moment().toISOString(),
            callSid: req.body.CallSid,
        };
        const pendingId = yield firebaseApi.savePendingRecording(recording);
        res.json(pendingId);
    }));
    /**
     * Action callback handlers.
     */
    app.post('/gather/*', (req, res) => __awaiter(this, void 0, void 0, function* () {
        // const callSid = 
        // const content = await firebaseApi.getBlockContent(
        const ctx = {
            callSid: req.body.CallSid,
            mobile: req.body.From,
            firebaseApi,
        };
        const blockName = utils_1.pathToBlock(req.path);
        // const gatherResult: GatherResult = {
        //   speechResult: req.body.SpeechResult,
        //   confidence: req.body.Confidence,
        // };
        // logGatherBlock(blockName, gatherResult);
        const gatherResult = {
            digits: req.body.Digits,
        };
        const result = yield TwilioRouter_1.default.gatherNextMessage(ctx, blockName, gatherResult);
        utils_1.logTwilioResponse(result);
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(result);
    }));
    /**
     * Handle all normal routes
     */
    app.post('/*', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const ctx = {
            callSid: req.body.CallSid,
            mobile: req.body.From,
            firebaseApi,
        };
        const blockName = utils_1.pathToBlock(req.path);
        const result = yield TwilioRouter_1.default.nextMessage(ctx, blockName);
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(result);
    }));
    /*Error Handling - must be at bottom!*/
    app.use(ErrorHandler_1.default);
    return functions.https.onRequest(app);
};
//# sourceMappingURL=fn_twiml.js.map