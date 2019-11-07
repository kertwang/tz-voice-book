import TwimlHandler from '../handlers/TwimlHandler'
import bodyParser from 'body-parser'


const app = require('express-promise-router')();

app.use(bodyParser.urlencoded({ extended: false }))

/* Not yet implemented - likely out of scope for now*/
app.post('/recognitionResults', TwimlHandler.postRecognitionResults);
app.get('/:botId/responses', TwimlHandler.getResponses);
app.post('/:botId/recordingCallback/feedback', TwimlHandler.postFeedback);
app.post('/:botId/recordingCallback/message', TwimlHandler.postRecordingCallback);

/**
 * @function POST /triggerCall
 * @description Triggers an outbound call from vb-server
 * @example
 *   {
 *     "mobile": "+61411222333",
 *     "url": "https://us-central1-tz-phone-book.cloudfunctions.net/twiml/entrypoint",
 *     "botId": "senegalNotification",
 *   }
 */
app.post('/triggerCall', TwimlHandler.postTriggerCall);

/**
 * @function POST /:botId/gather/*
 * @description Handles a callback from a Gather block. This is triggered when a user
 *   presses a button on the keypad or says a response
 */
app.post('/:botId/gather/*', TwimlHandler.postGather);

/**
 * @function POST /:botId/*
 * @description Default Twiml route. All uris not matched above will fallback
 *   to here
 */
app.post('/:botId/*', TwimlHandler.postBot);


export default app
