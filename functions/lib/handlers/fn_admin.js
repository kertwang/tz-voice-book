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
const express = __importStar(require("express"));
const cors = __importStar(require("cors"));
//@ts-ignore
const morgan = __importStar(require("morgan"));
//@ts-ignore
const morganBody = __importStar(require("morgan-body"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const FirebaseApi_1 = __importDefault(require("../apis/FirebaseApi"));
const Firestore_1 = __importDefault(require("../apis/Firestore"));
const TwilioApi_1 = require("../apis/TwilioApi");
const Env_1 = require("../utils/Env");
const FirebaseAuth_1 = __importDefault(require("../middlewares/FirebaseAuth"));
const utils_1 = require("../utils");
const AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const twilioApi = new TwilioApi_1.TwilioApi();
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
    /* Firebase Authentication Middleware */
    app.use(FirebaseAuth_1.default);
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
    app.post('/triggerCallFromRelay', (req, res) => {
        console.log("req.body is", JSON.stringify(req.body, null, 2));
        //TODO: get the user's phone number, check that its in a whitelist.
        let { wait } = req.body;
        const { unformattedMobile, url, botId, userId } = req.body;
        if (!botId || !unformattedMobile || !url || !userId) {
            return res.status(400).send('botId is required. unformattedMobile is required. url is required. userId is required.');
        }
        if (!wait) {
            wait = 10; //wait 10 seconds by default
        }
        //Get the country code for the userId
        //TODO: load in the desired format for tz
        // const mobile = formatMobile(unformattedMobile, relayDefaultCountrycode);
        let mobile;
        //Wait to make sure the user has sufficent time to hang up.
        return firebaseApi.getRelayUser(botId, userId)
            .then(userResult => {
            if (userResult.type === AppProviderTypes_1.ResultType.ERROR) {
                throw new Error(userResult.message);
            }
            let countryCode = userResult.result.countryCode;
            if (!countryCode) {
                console.warn(`No user country code found. Defaulting to: ${Env_1.relayDefaultCountrycode}`);
                countryCode = Env_1.relayDefaultCountrycode;
            }
            mobile = utils_1.formatMobile(unformattedMobile, countryCode);
            return utils_1.sleep(wait * 1000);
        })
            .then(() => twilioApi.startCall(botId, mobile, url))
            .then(response => res.json(response));
    });
    /*Error Handling - must be at bottom!*/
    app.use(ErrorHandler_1.default);
    return functions.https.onRequest(app);
};
