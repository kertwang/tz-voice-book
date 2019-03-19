"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
//@ts-ignore
var morgan_body_1 = __importDefault(require("morgan-body"));
var ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
var FirebaseApi_1 = __importDefault(require("../apis/FirebaseApi"));
var Firestore_1 = __importDefault(require("../apis/Firestore"));
var TwilioApi_1 = require("../apis/TwilioApi");
var Env_1 = require("../utils/Env");
var FirebaseAuth_1 = __importDefault(require("../middlewares/FirebaseAuth"));
var utils_1 = require("../utils");
var AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
var bodyParser = require('body-parser');
var twilioApi = new TwilioApi_1.TwilioApi();
module.exports = function (functions) {
    var app = express_1["default"]();
    app.use(bodyParser.json());
    var firebaseApi = new FirebaseApi_1["default"](Firestore_1["default"]);
    if (process.env.VERBOSE_LOG === 'false') {
        console.log('Using simple log');
        app.use(morgan_1["default"](':method :url :status :res[content-length] - :response-time ms'));
    }
    else {
        console.log('Using verbose log');
        morgan_body_1["default"](app);
        // app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
    }
    /* CORS Configuration */
    var openCors = cors_1["default"]({ origin: '*' });
    app.use(openCors);
    /* Firebase Authentication Middleware */
    app.use(FirebaseAuth_1["default"]);
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
    app.post('/triggerCallFromRelay', function (req, res) {
        console.log("req.body is", JSON.stringify(req.body, null, 2));
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
    /*Error Handling - must be at bottom!*/
    app.use(ErrorHandler_1["default"]);
    return functions.https.onRequest(app);
};
