"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var body_parser_1 = __importDefault(require("body-parser"));
var TwilioApi_1 = require("../apis/TwilioApi");
var Env_1 = require("../utils/Env");
var utils_1 = require("../utils");
var AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
var GenericApi_1 = __importDefault(require("../apis/GenericApi"));
var twilioApi = new TwilioApi_1.TwilioApi();
var app = require('express-promise-router')();
var firebaseApi = new GenericApi_1["default"]();
var AdminHandler_1 = __importDefault(require("../handlers/AdminHandler"));
app.use(body_parser_1["default"].json());
app.get('/status', function (req, res) {
    res.json('Hello!');
});
app.get('/content/:botId/:versionId', AdminHandler_1["default"].getContent);
/**
 * postContent
 *
 * Given a BotConfig object, create or update the content of a given bot
 */
//TODO: joi validation
app.post('/content/:botId', AdminHandler_1["default"].postContent);
/**
 * triggerCallFromRelay
 *
 * Triggers a call, from the relay application.
 * Mobile number may need to be formatted for a specific region.
 * Also implements a wait time (in seconds) which delays the call to Twilio to
 * allow the user to hang up in time.
 *
 * //TODO: secure using a firebase user token - need to update the relay app first.
 *
 * example body:
 * {
 *   "unformattedMobile": "0410237238",
 *   "botId": 'voicebook',
 *   "url": "https://us-central1-tz-phone-book.cloudfunctions.net/twiml/entrypoint",
 *   "wait": 30
 * }
 *
 */
//TODO: remove this? We no longer need this method
app.post('/triggerCallFromRelay', function (req, res) {
    //TODO: get the user's phone number, check that its in a whitelist.
    var wait = req.body.wait;
    var _a = req.body, unformattedMobile = _a.unformattedMobile, url = _a.url, botId = _a.botId, userId = _a.userId;
    if (!botId || !unformattedMobile || !url || !userId) {
        return res.status(400).send('botId is required. unformattedMobile is required. url is required. userId is required.');
    }
    if (!wait) {
        wait = 10; //wait 10 seconds by default
    }
    //Get the country code for the userId
    //TODO: load in the desired format for tz
    // const mobile = formatMobile(unformattedMobile, relayDefaultCountrycode);
    var mobile;
    //Wait to make sure the user has sufficent time to hang up.
    return firebaseApi.getRelayUser(botId, userId)
        .then(function (userResult) {
        if (userResult.type === AppProviderTypes_1.ResultType.ERROR) {
            throw new Error(userResult.message);
        }
        var countryCode = userResult.result.countryCode;
        if (!countryCode) {
            console.warn("No user country code found. Defaulting to: " + Env_1.relayDefaultCountrycode);
            countryCode = Env_1.relayDefaultCountrycode;
        }
        mobile = utils_1.formatMobile(unformattedMobile, countryCode);
        return utils_1.sleep(wait * 1000);
    })
        .then(function () { return twilioApi.startCall(botId, mobile, url); })
        .then(function (response) { return res.json(response); });
});
exports["default"] = app;
