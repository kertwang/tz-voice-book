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
