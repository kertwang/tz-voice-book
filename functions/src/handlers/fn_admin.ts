
import * as express from 'express';
import * as cors from 'cors';
import * as moment from 'moment';
//@ts-ignore
import * as morgan from 'morgan';
//@ts-ignore
import * as morganBody from 'morgan-body';
import TwilioRouter from '../apis/TwilioRouter';
import AppError from '../utils/AppError';
import ErrorHandler from '../utils/ErrorHandler';
import { pathToBlock, logGatherBlock, logTwilioResponse, saftelyGetPageParamsOrDefaults } from '../utils';
import { GatherResult, CallContext, DigitResult, LogType } from '../types_rn/TwilioTypes';
import UserApi, { Recording } from '../apis/UserApi';
import FirebaseApi from '../apis/FirebaseApi';
import fs from '../apis/Firestore';
import { log } from '../utils/Log';
import { TwilioApi } from '../apis/TwilioApi';
import { ENODEV } from 'constants';
import { eventNames } from 'cluster';
import { temporaryInsecureAuthKey } from '../utils/Env';
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth')


const twilioApi = new TwilioApi();

module.exports = (functions: any) => {
  const app = express();
  app.use(bodyParser.json());
  const firebaseApi = new FirebaseApi(fs);


  if (process.env.VERBOSE_LOG === 'false') {
    console.log('Using simple log');
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  } else {
    console.log('Using verbose log');
    morganBody(app);
    // app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  }

  /* CORS Configuration */
  const openCors = cors({ origin: '*' });
  app.use(openCors);


  /* Basic Auth using express-basic-auth */
  app.use(basicAuth({
    users: { 'admin': temporaryInsecureAuthKey }
  }))





  /*Error Handling - must be at bottom!*/
  app.use(ErrorHandler);

  return functions.https.onRequest(app);
}