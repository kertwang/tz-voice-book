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
import { ResultType } from '../types_rn/AppProviderTypes';
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
        if (userResult.type === ResultType.ERROR) {
          throw new Error(userResult.message);
        }
        let countryCode = userResult.result.countryCode;
        if (!countryCode) {
          console.warn(`No user country code found. Defaulting to: ${relayDefaultCountrycode}`);
          countryCode = relayDefaultCountrycode
        }

        mobile = formatMobile(unformattedMobile, countryCode);
        return sleep(wait * 1000);
      })
      .then(() => twilioApi.startCall(botId, mobile, url))
      .then(response => res.json(response));
  });








  /*Error Handling - must be at bottom!*/
  app.use(ErrorHandler);

  return functions.https.onRequest(app);
}