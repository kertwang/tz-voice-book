import * as validate from 'express-validation';
import * as express from 'express';
import * as cors from 'cors';
import * as moment from 'moment';
import * as morgan from 'morgan';
import * as morganBody from 'morgan-body';
import TwilioRouter from '../apis/TwilioRouter';
import AppError from '../utils/AppError';
import ErrorHandler from '../utils/ErrorHandler';
import { pathToBlock, logGatherBlock, logTwilioResponse } from '../utils';
import { GatherResult, CallContext } from '../Types/TwilioRouter';
import UserApi, { Recording } from '../apis/UserApi';
import FirebaseApi from '../apis/FirebaseApi';
import fs from '../apis/Firestore';


//TODO: make newer import format
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const bodyParser = require('body-parser');
const Joi = require('joi');

module.exports = (functions) => {
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

  app.use((req, res, next) => {
    if(!req.body.From) {
      console.log("WARNING: No FROM found in request body");
    }

    return next();
  });

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
  app.post('/recordingCallback/feedback', (req, res) => {
    console.log(`SAVED recording to: ${req.body.RecordingUrl}`);
    //TODO: save to a feedback object

    res.json(true);
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

    res.json(pendingId);
  });

  /**
   * Action callback handlers.
   */
  app.post('/gather/*', async (req, res) => {
    const ctx: CallContext = {
      callSid: req.body.CallSid,
      mobile: req.body.From,
      firebaseApi,
    }
    const blockName = pathToBlock(req.path);
    
    const gatherResult: GatherResult = {
      speechResult: req.body.SpeechResult,
      confidence: req.body.Confidence,
    };
    logGatherBlock(blockName, gatherResult);
    const result = await TwilioRouter.gatherNextMessage(ctx, blockName, gatherResult);
    logTwilioResponse(result);

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(result);
  });

  /**
   * Handle all normal routes
   */
  app.post('/*', async (req, res) => {
    const ctx: CallContext = {
      callSid: req.body.CallSid,
      mobile: req.body.From,
      firebaseApi,
    }
    const blockName = pathToBlock(req.path);

    const result = await TwilioRouter.nextMessage(ctx, blockName);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(result);
  });

  /*Error Handling - must be at bottom!*/
  app.use(ErrorHandler);

  return functions.https.onRequest(app);
}