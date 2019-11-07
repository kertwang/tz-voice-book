//@ts-ignore
import ErrorHandler from '../utils/ErrorHandler';
import bodyParser from 'body-parser'
import { TwilioApi } from '../apis/TwilioApi';
import { relayDefaultCountrycode } from '../utils/Env';
import { formatMobile, sleep } from '../utils';
import { ResultType, } from '../types_rn/AppProviderTypes';
import GenericApi from '../apis/GenericApi';

const twilioApi = new TwilioApi();
const app = require('express-promise-router')();
const firebaseApi = new GenericApi();

import AdminHandler from '../handlers/AdminHandler';

app.use(bodyParser.json())

app.get('/status', (req: any, res: any) => {
  res.json('Hello!')
})

app.get('/content/:botId/:versionId', AdminHandler.getContent)

/**
 * postContent
 * 
 * Given a BotConfig object, create or update the content of a given bot
 */
//TODO: joi validation
app.post('/content/:botId', AdminHandler.postContent)

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
app.post('/triggerCallFromRelay', (req: any, res: any) => {

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
  let mobile: string;

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


export default app;