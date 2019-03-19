"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const moment_1 = __importDefault(require("moment"));
//@ts-ignore
const morgan_1 = __importDefault(require("morgan"));
//@ts-ignore
const morganBody = __importStar(require("morgan-body"));
const TwilioRouter_1 = __importDefault(require("../apis/TwilioRouter"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const utils_1 = require("../utils");
const FirebaseApi_1 = __importDefault(require("../apis/FirebaseApi"));
const Firestore_1 = __importDefault(require("../apis/Firestore"));
const Log_1 = require("../utils/Log");
const TwilioApi_1 = require("../apis/TwilioApi");
const Env_1 = require("../utils/Env");
const LogTypes_1 = require("../types_rn/LogTypes");
const AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
const responses2_template_1 = __importDefault(require("./responses2.template"));
const mustache = __importStar(require("mustache"));
//TODO: make newer import format
require('express-async-errors');
const bodyParser = require('body-parser');
const twilioApi = new TwilioApi_1.TwilioApi();
module.exports = (functions) => {
    const app = express_1.default();
    app.use(bodyParser.json());
    const firebaseApi = new FirebaseApi_1.default(Firestore_1.default);
    if (process.env.VERBOSE_LOG === 'false') {
        console.log('Using simple log');
        app.use(morgan_1.default(':method :url :status :res[content-length] - :response-time ms'));
    }
    else {
        console.log('Using verbose log');
        morganBody(app);
    }
    /* CORS Configuration */
    const openCors = cors_1.default({ origin: '*' });
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
    app.get('/:botId/responses', async (req, res) => {
        const { botId } = req.params;
        const intents = [
            { intent: 'shareQuestionCapture', question: 'Great. Would you mind sharing one of your questions with me? You can type it below:', responses: [] },
            { intent: 'improveNotificationMessageCapture', question: 'Is there anything about the notification text message that you think could be improved? Take a minute and jot down any ideas you have that might improve it. What’s one thing you jotted down?', responses: [] },
            { intent: 'conclusionOneThingCapture', question: 'One quick question: What would you most like to get out of the exercise today?', responses: [] },
            { intent: 'tripSummaryStruggleCapture', question: 'In one word, what do you now think is the most important key to using automated digital tools with low-income clients?', responses: [] },
        ];
        const responsesResult = await Promise.all(intents.map((i) => firebaseApi.getResponses(botId, i.intent)));
        responsesResult.forEach((result, idx) => {
            if (result.type === AppProviderTypes_1.ResultType.ERROR) {
                return;
            }
            //@ts-ignore
            intents[idx].responses = result.result;
        });
        res.status(200).send(mustache.render(responses2_template_1.default, { intents }));
    });
    /**
     * Callback triggered once feedback recording is finished
     */
    app.post('/:botId/recordingCallback/feedback', async (req, res) => {
        const botId = utils_1.getBotId(req.params.botId);
        const recording = {
            url: req.body.RecordingUrl,
            createdAt: moment_1.default().toISOString(),
            callSid: req.body.CallSid,
        };
        const pendingId = await firebaseApi.saveFeedbackRecording(recording, botId);
        Log_1.log({
            type: LogTypes_1.LogType.PENDING_MESSAGE,
            botId,
            pendingId,
            callSid: recording.callSid,
            url: recording.url,
        });
        res.json(pendingId);
    });
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
    app.post('/:botId/recordingCallback/message', async (req, res) => {
        const botId = utils_1.getBotId(req.params.botId);
        const recording = {
            url: req.body.RecordingUrl,
            createdAt: moment_1.default().toISOString(),
            callSid: req.body.CallSid,
        };
        const pendingId = await firebaseApi.savePendingRecording(recording, botId);
        Log_1.log({
            type: LogTypes_1.LogType.PENDING_MESSAGE,
            botId,
            pendingId,
            callSid: recording.callSid,
            url: recording.url,
        });
        res.json(pendingId);
    });
    /**
     * Action callback handlers.
     */
    app.post('/:botId/gather/*', async (req, res) => {
        const botId = utils_1.getBotId(req.params.botId);
        const blockName = utils_1.pathToBlock(req.path);
        console.log(`Block Name: ${blockName}. Query Params: ${JSON.stringify(req.query)}`);
        const mobile = utils_1.getUserMobile(req.body);
        const user = await firebaseApi.getUserFromMobile(mobile, botId);
        const pageParams = utils_1.saftelyGetPageParamsOrDefaults(req.query);
        const dynamicParams = utils_1.saftelyGetDynamicParamsOrEmpty(req.query);
        /* Configure the version using a versionOverride query param */
        let botConfig;
        if (pageParams.versionOverride) {
            botConfig = await firebaseApi.getBotConfigOverride(user.id, botId, pageParams.versionOverride);
        }
        else {
            botConfig = await firebaseApi.getBotConfig(user.id, botId);
        }
        const ctx = {
            callSid: req.body.CallSid,
            mobile,
            toMobile: req.body.To,
            userId: user.id,
            firebaseApi,
            dynamicParams,
            ...pageParams,
        };
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
        const result = await TwilioRouter_1.default.gatherNextMessage(ctx, botConfig, blockName, gatherResult);
        utils_1.logTwilioResponse(result);
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(result);
    });
    /**
     * Handle all normal routes
     */
    app.post('/:botId/*', async (req, res) => {
        const botId = utils_1.getBotId(req.params.botId);
        const blockName = utils_1.pathToBlock(req.path);
        //Get the user object.
        const mobile = utils_1.getUserMobile(req.body);
        const user = await firebaseApi.getUserFromMobile(mobile, botId);
        const pageParams = utils_1.saftelyGetPageParamsOrDefaults(req.query);
        const dynamicParams = utils_1.saftelyGetDynamicParamsOrEmpty(req.query);
        /* Configure the version using a versionOverride query param */
        let botConfig;
        if (pageParams.versionOverride) {
            //RW-TODO: change this to getBotConfig with params
            botConfig = await firebaseApi.getBotConfigOverride(user.id, botId, pageParams.versionOverride);
        }
        else {
            botConfig = await firebaseApi.getBotConfig(user.id, botId);
        }
        console.log("POST /:botId/ bot config is:", botConfig);
        const ctx = {
            callSid: req.body.CallSid,
            mobile,
            toMobile: req.body.To,
            userId: user.id,
            versionOverride: req.query.versionOverride || null,
            firebaseApi,
            dynamicParams,
            ...pageParams,
        };
        Log_1.log({
            type: LogTypes_1.LogType.BLOCK,
            botId,
            callSid: ctx.callSid,
            blockId: blockName,
            mobile: ctx.mobile,
            pageParams,
        });
        const result = await TwilioRouter_1.default.nextMessage(ctx, botConfig, blockName);
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(result);
    });
    /*Error Handling - must be at bottom!*/
    app.use(ErrorHandler_1.default);
    return functions.https.onRequest(app);
};
