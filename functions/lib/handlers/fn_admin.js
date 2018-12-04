"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
//@ts-ignore
const morgan = require("morgan");
//@ts-ignore
const morganBody = require("morgan-body");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const FirebaseApi_1 = require("../apis/FirebaseApi");
const Firestore_1 = require("../apis/Firestore");
const TwilioApi_1 = require("../apis/TwilioApi");
const Env_1 = require("../utils/Env");
const FirebaseAuth_1 = require("../middlewares/FirebaseAuth");
const utils_1 = require("../utils");
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
     * //TODO: secure using a firebase user token
     *
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
        const { unformattedMobile, url, botId } = req.body;
        if (!botId || !unformattedMobile || !url) {
            return res.status(400).send('botId is required. unformattedMobile is required. url is required');
        }
        if (!wait) {
            wait = 10; //wait 30 seconds by default
        }
        //TODO: load in the desired format for tz
        const mobile = utils_1.formatMobile(unformattedMobile, Env_1.relayDefaultCountrycode);
        return utils_1.sleep(wait * 1000)
            .then(() => twilioApi.startCall(botId, mobile, url))
            .then(response => res.json(response));
    });
    /*Error Handling - must be at bottom!*/
    app.use(ErrorHandler_1.default);
    return functions.https.onRequest(app);
};
//# sourceMappingURL=fn_admin.js.map