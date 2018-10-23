
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
import { temporaryInsecureAuthKey } from '../utils/Env';



const twilioApi = new TwilioApi();

//TODO: make newer import format
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const bodyParser = require('body-parser');
const Joi = require('joi');

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

  /**
   * Collect partial results for debugging purposes.
   */
  app.post('/recognitionResults', (req, res) => {
    console.log(`stable: '${req.body.StableSpeechResult}' unstable: '${req.body.UnstableSpeechResult}'`)
    res.json(true);
  });

  /**
   * Callback triggered once feedback recording is finished
   */
  app.post('/recordingCallback/feedback', async (req, res) => {
    const recording: Recording = {
      url: req.body.RecordingUrl,
      createdAt: moment().toISOString(),
      callSid: req.body.CallSid,
    };
    const pendingId = await firebaseApi.saveFeedbackRecording(recording);

    log({
      type: LogType.PENDING_MESSAGE,
      pendingId,
      callSid: recording.callSid,
      url: recording.url,
    });

    res.json(pendingId);
  });


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
   *   "apiKey": "<API_KEY>"
   * }
   * 
   */
  app.post('/triggerCall', (req, res) => {
    if (!req.query.temporaryInsecureAuthKey) {
      res.status(401).send('apiKey is required');
    }

    if (req.query.temporaryInsecureAuthKey !== temporaryInsecureAuthKey) {
      res.status(401).send('Invalid Api Key');
    }

    return twilioApi.startCall(req.body.mobile, req.body.url)
    .then(response => res.json(response));
  });


  /**
   * Handle Twilio Callback to save the recording for pending submission.
   */
  app.post('/recordingCallback/message', async (req, res) => {
    const recording: Recording = {
      url: req.body.RecordingUrl,
      createdAt: moment().toISOString(),
      callSid: req.body.CallSid,
    };
    const pendingId = await firebaseApi.savePendingRecording(recording);

    log({
      type: LogType.PENDING_MESSAGE,
      pendingId,
      callSid: recording.callSid,
      url: recording.url,
    });

    res.json(pendingId);
  });

  /**
   * Action callback handlers.
   */
  app.post('/gather/*', async (req, res) => {
    const blockName = pathToBlock(req.path);
    console.log(`Block Name: ${blockName}. Query Params: ${JSON.stringify(req.query)}`);

    const user = await firebaseApi.getUserFromMobile(req.body.From);
    const botConfig = await firebaseApi.getBotConfig(req.body.CallSid, user.id);
    const ctx: CallContext = {
      callSid: req.body.CallSid,
      mobile: req.body.From,
      userId: user.id,
      firebaseApi,
      ...saftelyGetPageParamsOrDefaults(req.query),
    };

    log({
      type: LogType.BLOCK,
      callSid: ctx.callSid,
      blockId: blockName,
      mobile: ctx.mobile,
      pageParams: saftelyGetPageParamsOrDefaults(req.query),
    });

    const gatherResult: DigitResult = {
      digits: req.body.Digits,
    }
    const result = await TwilioRouter.gatherNextMessage(ctx, botConfig, blockName, gatherResult);
    logTwilioResponse(result);

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(result);
  });

  /**
   * Handle all normal routes
   */
  app.post('/*', async (req, res) => {
    const blockName = pathToBlock(req.path);

    const user = await firebaseApi.getUserFromMobile(req.body.From);
    const botConfig = await firebaseApi.getBotConfig(req.body.CallSid, user.id);
    const ctx: CallContext = {
      callSid: req.body.CallSid,
      mobile: req.body.From,
      userId: user.id,
      firebaseApi,
      ...saftelyGetPageParamsOrDefaults(req.query),
    };

    log({
      type: LogType.BLOCK,
      callSid: ctx.callSid,
      blockId: blockName,
      mobile: ctx.mobile,
      pageParams: saftelyGetPageParamsOrDefaults(req.query),
    });

    const result = await TwilioRouter.nextMessage(ctx, botConfig, blockName);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(result);
  });

  /*Error Handling - must be at bottom!*/
  app.use(ErrorHandler);

  return functions.https.onRequest(app);
}