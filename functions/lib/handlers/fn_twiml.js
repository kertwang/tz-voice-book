"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const morganBody = require("morgan-body");
const TwilioRouter_1 = require("../apis/TwilioRouter");
const ErrorHandler_1 = require("../utils/ErrorHandler");
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
        morganBody(app);
    }
    /* CORS Configuration */
    const openCors = cors({ origin: '*' });
    app.use(openCors);
    /**
       * Action callback handlers.
       * For some reason, it makes sense to me to separate these out
       * just a hunch though
       */
    app.post('/gather/*', (req, res) => {
        console.log('originalUrl', req.originalUrl);
        const blockName = req.originalUrl.replace('/gather/', '');
        const result = TwilioRouter_1.default.gatherNextMessage(blockName);
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(result);
    });
    /**
     * Handle all normal routes
     */
    app.post('/*', (req, res, next) => {
        console.log('originalUrl', req.originalUrl);
        const blockName = req.originalUrl.replace('/', '');
        try {
            const result = TwilioRouter_1.default.nextMessage(blockName);
            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(result);
        }
        catch (err) {
            console.log("WTF??");
            return next(err);
        }
    });
    /*Error Handling - must be at bottom!*/
    app.use(ErrorHandler_1.default);
    return functions.https.onRequest(app);
};
//# sourceMappingURL=fn_twiml.js.map