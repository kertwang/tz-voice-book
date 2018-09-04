import * as validate from 'express-validation';
import * as express from 'express';
import * as cors from 'cors';
import * as moment from 'moment';
import * as morgan from 'morgan';
import * as morganBody from 'morgan-body';
import TwilioRouter, { GatherResult } from '../apis/TwilioRouter';
import AppError from '../utils/AppError';
import ErrorHandler from '../utils/ErrorHandler';
import { pathToBlock, logGatherBlock } from '../utils';

//TODO: make newer import format
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const bodyParser = require('body-parser');
const Joi = require('joi');
const fb = require('firebase-admin');

module.exports = (functions, admin, twilioClient) => {
  const app = express();
  app.use(bodyParser.json());

  if (process.env.VERBOSE_LOG === 'false') {
    console.log('Using simple log');
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  } else {
    console.log('Using verbose log');
    morganBody(app);
  }

  /* CORS Configuration */
  const openCors = cors({ origin: '*' });
  app.use(openCors);

  /**
   * Collect partial results for debugging purposes.
   */
  app.post('/recognitionResults', (req, res) => {

    res.json(true);
  });

  /**
     * Action callback handlers.
     * For some reason, it makes sense to me to separate these out
     * just a hunch though
     */
  app.post('/gather/*', (req, res) => {
    const blockName = pathToBlock(req.path);
    
    const gatherResult: GatherResult = {
      speechResult: req.body.SpeechResult,
      confidence: req.body.Confidence,
    };
    logGatherBlock(blockName, gatherResult);
    const result = TwilioRouter.gatherNextMessage(blockName, gatherResult);

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(result);
  });


  /**
   * Handle all normal routes
   */
  app.post('/*', (req, res) => {
    const blockName = pathToBlock(req.path);

    const result = TwilioRouter.nextMessage(blockName);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(result);
  });


  /*Error Handling - must be at bottom!*/
  app.use(ErrorHandler);

  return functions.https.onRequest(app);
}