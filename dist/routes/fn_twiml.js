"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var TwimlHandler_1 = __importDefault(require("../handlers/TwimlHandler"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = require('express-promise-router')();
app.use(body_parser_1["default"].urlencoded({ extended: false }));
/* Not yet implemented - likely out of scope for now*/
app.post('/recognitionResults', TwimlHandler_1["default"].postRecognitionResults);
app.get('/:botId/responses', TwimlHandler_1["default"].getResponses);
app.post('/:botId/recordingCallback/feedback', TwimlHandler_1["default"].postFeedback);
app.post('/:botId/recordingCallback/message', TwimlHandler_1["default"].postRecordingCallback);
/**
 * @function POST /triggerCall
 * @description Triggers an outbound call from vb-server
 * @example
 *   {
 *     "mobile": "+61411222333",
 *     "url": "https://us-central1-tz-phone-book.cloudfunctions.net/twiml/entrypoint",
 *     "botId": "senegalNotification",
 *   }
 */
app.post('/triggerCall', TwimlHandler_1["default"].postTriggerCall);
/**
 * @function POST /:botId/gather/*
 * @description Handles a callback from a Gather block. This is triggered when a user
 *   presses a button on the keypad or says a response
 */
app.post('/:botId/gather/*', TwimlHandler_1["default"].postGather);
/**
 * @function POST /:botId/*
 * @description Default Twiml route. All uris not matched above will fallback
 *   to here
 */
app.post('/:botId/*', TwimlHandler_1["default"].postBot);
exports["default"] = app;
