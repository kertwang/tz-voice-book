"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
//TODO: make newer import format
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const bodyParser = require('body-parser');
const Joi = require('joi');
const fb = require('firebase-admin');
module.exports = (functions, admin, twilioClient) => {
    const app = express();
    app.use(bodyParser.json());
    const fs = admin.firestore();
    /* CORS Configuration */
    const openCors = cors({ origin: '*' });
    app.use(openCors);
    app.use(function (err, req, res, next) {
        console.log("error", err);
        if (err.status) {
            return res.status(err.status).json(err);
        }
        return res.status(500).json({ status: 500, message: err.message });
    });
    app.post('/*', (req, res, next) => {
        console.log('originalUrl', req.originalUrl);
        // Create TwiML response
        const twiml = new VoiceResponse();
        twiml.say('Hello from your pals at Twilio! Have fun.');
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
    });
    return functions.https.onRequest(app);
};
//# sourceMappingURL=fn_twiml.js.map