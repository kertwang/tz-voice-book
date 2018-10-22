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
//@ts-ignore
const morgan = require("morgan");
//@ts-ignore
const morganBody = require("morgan-body");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const FirebaseApi_1 = require("../apis/FirebaseApi");
const Firestore_1 = require("../apis/Firestore");
const TwilioApi_1 = require("../apis/TwilioApi");
const Env_1 = require("../utils/Env");
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
    /* Basic Auth using express-basic-auth */
    app.use(basicAuth({
        users: { 'admin': Env_1.temporaryInsecureAuthKey }
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
     *   "url": "https://us-central1-tz-phone-book.cloudfunctions.net/twiml/entrypoint"
     * }
     *
     */
    app.post('/triggerCall', (req, res) => __awaiter(this, void 0, void 0, function* () {
        // TODO: add Joi validation
        const response = twilioApi.startCall(req.body.mobile, req.body.url);
        res.json(response);
    }));
    /*Error Handling - must be at bottom!*/
    app.use(ErrorHandler_1.default);
    return functions.https.onRequest(app);
};
//# sourceMappingURL=fn_admin.js.map