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
import { GatherResult } from '../Types/TwilioRouter';
import AppApi from '../apis/AppApi';
import FirebaseApi from '../apis/FirebaseApi';

//TODO: make newer import format
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const bodyParser = require('body-parser');
const Joi = require('joi');
const fb = require('firebase-admin');

module.exports = (functions, admin, twilioClient) => {
  const app = express();
  app.use(bodyParser.json());
  const fs = admin.firestore();
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
  app.post('/recordingCallback/feedback', (req, res) => {
    console.log(`SAVED recording to: ${req.body.RecordingUrl}`);
    //TODO: save to a feedback object

    res.json(true);
  });

  /**
   * Handle Twilio Callback to save the recording for pending submission.
   */
  app.post('/recordingCallback/message', async (req, res) => {
    const appApi = await AppApi.fromMobileNumber(firebaseApi, req.body.From);
    const pendingId = appApi.savePendingRecording(req.body.RecordingUrl);

    res.json(pendingId);
  });

  /**
   * Action callback handlers.
   */
  app.post('/gather/*', (req, res) => {
    const appApi = AppApi.fromMobileNumber(firebaseApi, req.body.From);
    const blockName = pathToBlock(req.path);
    
    const gatherResult: GatherResult = {
      speechResult: req.body.SpeechResult,
      confidence: req.body.Confidence,
    };
    logGatherBlock(blockName, gatherResult);
    const result = TwilioRouter.gatherNextMessage(blockName, gatherResult);
    logTwilioResponse(result);

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(result);
  });

  /**
   * Handle all normal routes
   */
  app.post('/*', (req, res) => {
    const appApi = AppApi.fromMobileNumber(firebaseApi, req.body.From);
    const blockName = pathToBlock(req.path);

    const result = TwilioRouter.nextMessage(blockName);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(result);
  });

  /*Error Handling - must be at bottom!*/
  app.use(ErrorHandler);

  return functions.https.onRequest(app);
}