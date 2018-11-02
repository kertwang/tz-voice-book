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
const Log_1 = require("../utils/Log");
const TwilioApi_1 = require("../apis/TwilioApi");
const Env_1 = require("../utils/Env");
const LogTypes_1 = require("../types_rn/LogTypes");
const AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
const responses2_template_1 = require("./responses2.template");
const mustache = require("mustache");
require('express-async-errors');
const twilioApi = new TwilioApi_1.TwilioApi();
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
     * Get the responses from the chatbot in a simple text format
     */
    app.get('/:botId/responses', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { botId, intent } = req.params;
        // const responsesResult = await firebaseApi.getResponses(botId, intent);
        const intents = [
            { intent: 'shareQuestionCapture', question: 'Great. Would you mind sharing one of your questions with me? You can type it below:', responses: [] },
            { intent: 'improveNotificationMessageCapture', question: 'Is there anything about the notification text message that you think could be improved? Take a minute and jot down any ideas you have that might improve it. What’s one thing you jotted down?', responses: [] },
            { intent: 'conclusionOneThingCapture', question: 'One quick question: What would you most like to get out of the exercise today?', responses: [] },
            { intent: 'tripSummaryStruggleCapture', question: 'In one word, what do you now think is the most important key to using automated digital tools with low-income clients?', responses: [] },
        ];
        const responsesResult = yield Promise.all(intents.map((i) => firebaseApi.getResponses(botId, i.intent)));
        console.log("responses result is", responsesResult);
        responsesResult.forEach((result, idx) => {
            if (result.type === AppProviderTypes_1.ResultType.ERROR) {
                return;
            }
            intents[idx].responses = result.result;
        });
        // const responseString = responsesResult.result.reduce((acc: string, curr: string) => {
        //   return `${acc}\n<li>${curr}</li>`;
        // }, '<h3>Responses:</h3><ul>');
        res.status(200).send(mustache.render(responses2_template_1.default, { intents }));
    }));
    /**
     * Callback triggered once feedback recording is finished
     */
    app.post('/:botId/recordingCallback/feedback', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const botId = utils_1.getBotId(req.params.botId);
        const recording = {
            url: req.body.RecordingUrl,
            createdAt: moment().toISOString(),
            callSid: req.body.CallSid,
        };
        const pendingId = yield firebaseApi.saveFeedbackRecording(recording, botId);
        Log_1.log({
            type: LogTypes_1.LogType.PENDING_MESSAGE,
            botId,
            pendingId,
            callSid: recording.callSid,
            url: recording.url,
        });
        res.json(pendingId);
    }));
    /**
     * triggerCall
     *
     * triggers a call.
     * TODO: set up auth
     *
     * example body:
     * {
     *   "mobile": "+61410237238",
     *   "url": "https://us-central1-tz-phone-book.cloudfunctions.net/twiml/entrypoint",
     *   "botId": "senegalNotification",
     * }
     *
     */
    app.post('/triggerCall', (req, res) => {
        if (!req.query.temporaryInsecureAuthKey) {
            res.status(401).send('apiKey is required');
        }
        if (req.query.temporaryInsecureAuthKey !== Env_1.temporaryInsecureAuthKey) {
            res.status(401).send('Invalid Api Key');
        }
        return twilioApi.startCall(req.body.botId, req.body.mobile, req.body.url)
            .then(response => res.json(response));
    });
    /**
     * Handle Twilio Callback to save the recording for pending submission.
     */
    app.post('/:botId/recordingCallback/message', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const botId = utils_1.getBotId(req.params.botId);
        const recording = {
            url: req.body.RecordingUrl,
            createdAt: moment().toISOString(),
            callSid: req.body.CallSid,
        };
        const pendingId = yield firebaseApi.savePendingRecording(recording, botId);
        Log_1.log({
            type: LogTypes_1.LogType.PENDING_MESSAGE,
            botId,
            pendingId,
            callSid: recording.callSid,
            url: recording.url,
        });
        res.json(pendingId);
    }));
    /**
     * Action callback handlers.
     */
    app.post('/:botId/gather/*', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const botId = utils_1.getBotId(req.params.botId);
        const blockName = utils_1.pathToBlock(req.path);
        console.log(`Block Name: ${blockName}. Query Params: ${JSON.stringify(req.query)}`);
        const user = yield firebaseApi.getUserFromMobile(req.body.From, botId);
        const pageParams = utils_1.saftelyGetPageParamsOrDefaults(req.query);
        /* Configure the version using a versionOverride query param */
        let botConfig;
        if (pageParams.versionOverride) {
            botConfig = yield firebaseApi.getBotConfigOverride(user.id, botId, pageParams.versionOverride);
        }
        else {
            botConfig = yield firebaseApi.getBotConfig(user.id, botId);
        }
        const ctx = Object.assign({ callSid: req.body.CallSid, mobile: req.body.From, userId: user.id, firebaseApi }, pageParams);
        Log_1.log({
            type: LogTypes_1.LogType.BLOCK,
            botId,
            callSid: ctx.callSid,
            blockId: blockName,
            mobile: ctx.mobile,
            pageParams,
        });
        const gatherResult = {
            digits: req.body.Digits,
        };
        const result = yield TwilioRouter_1.default.gatherNextMessage(ctx, botConfig, blockName, gatherResult);
        utils_1.logTwilioResponse(result);
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(result);
    }));
    /**
     * Handle all normal routes
     */
    app.post('/:botId/*', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const botId = utils_1.getBotId(req.params.botId);
        const blockName = utils_1.pathToBlock(req.path);
        const user = yield firebaseApi.getUserFromMobile(req.body.From, botId);
        const pageParams = utils_1.saftelyGetPageParamsOrDefaults(req.query);
        /* Configure the version using a versionOverride query param */
        let botConfig;
        if (pageParams.versionOverride) {
            botConfig = yield firebaseApi.getBotConfigOverride(user.id, botId, pageParams.versionOverride);
        }
        else {
            botConfig = yield firebaseApi.getBotConfig(user.id, botId);
        }
        const ctx = Object.assign({ callSid: req.body.CallSid, mobile: req.body.From, userId: user.id, versionOverride: req.query.versionOverride || null, firebaseApi }, pageParams);
        Log_1.log({
            type: LogTypes_1.LogType.BLOCK,
            botId,
            callSid: ctx.callSid,
            blockId: blockName,
            mobile: ctx.mobile,
            pageParams,
        });
        const result = yield TwilioRouter_1.default.nextMessage(ctx, botConfig, blockName);
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(result);
    }));
    /*Error Handling - must be at bottom!*/
    app.use(ErrorHandler_1.default);
    return functions.https.onRequest(app);
};
//# sourceMappingURL=fn_twiml.js.map