import * as express from 'express';
import * as cors from 'cors';
//@ts-ignore
import * as morgan from 'morgan';
//@ts-ignore
import * as morganBody from 'morgan-body';
import ErrorHandler from '../utils/ErrorHandler';
import FirebaseApi from '../apis/FirebaseApi';
import fs from '../apis/Firestore';
import { TwilioApi } from '../apis/TwilioApi';
import { temporaryInsecureAuthKey, relayDefaultCountrycode } from '../utils/Env';
import FirebaseAuth from '../middlewares/FirebaseAuth';
import { formatMobile, sleep } from '../utils';
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

  /* Firebase Authentication Middleware */
  app.use(FirebaseAuth);

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
    const mobile = formatMobile(unformattedMobile, relayDefaultCountrycode);


    return sleep(wait * 1000)
      .then(() => twilioApi.startCall(botId, mobile, url))
      .then(response => res.json(response));
  });








  /*Error Handling - must be at bottom!*/
  app.use(ErrorHandler);

  return functions.https.onRequest(app);
}