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
    /*Error Handling - must be at bottom!*/
    app.use(ErrorHandler_1.default);
    return functions.https.onRequest(app);
};
//# sourceMappingURL=dep_fs_dialogflow.js.map