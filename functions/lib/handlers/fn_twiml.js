"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const TwilioRouter_1 = require("../apis/TwilioRouter");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const utils_1 = require("../utils");
//TODO: make newer import format
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const bodyParser = require('body-parser');
const Joi = require('joi');
const fb = require('firebase-admin');
module.exports = (functions, admin, twilioClient) => {
    const app = express();
    app.use(bodyParser.json());
    if (process.env.VERBOSE_LOG === 'false') {
        console.log('Using simple log');
        app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
    }
    else {
        console.log('Using verbose log');
        // morganBody(app);
        app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
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
    app.post('/recordingCallback', (req, res) => {
        console.log(`SAVED FEEDBACK to: ${req.body.RecordingUrl}`);
        //TODO: save to proper place based on req params
        res.json(true);
    });
    /**
     * Action callback handlers.
     * For some reason, it makes sense to me to separate these out
     * just a hunch though
     */
    app.post('/gather/*', (req, res) => {
        const blockName = utils_1.pathToBlock(req.path);
        const gatherResult = {
            speechResult: req.body.SpeechResult,
            confidence: req.body.Confidence,
        };
        utils_1.logGatherBlock(blockName, gatherResult);
        const result = TwilioRouter_1.default.gatherNextMessage(blockName, gatherResult);
        utils_1.logTwilioResponse(result);
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(result);
    });
    /**
     * Handle all normal routes
     */
    app.post('/*', (req, res) => {
        const blockName = utils_1.pathToBlock(req.path);
        const result = TwilioRouter_1.default.nextMessage(blockName);
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(result);
    });
    /*Error Handling - must be at bottom!*/
    app.use(ErrorHandler_1.default);
    return functions.https.onRequest(app);
};
//# sourceMappingURL=fn_twiml.js.map