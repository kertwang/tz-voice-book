"use strict";
//old twiml functions - keeping around for reference only
// module.exports = (functions: any) => {
//   const app = express();
//   app.use(bodyParser.json());
//   const firebaseApi = new FirebaseApi(fs);
//   if (process.env.VERBOSE_LOG === 'false') {
//     console.log('Using simple log');
//     app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
//   } else {
//     console.log('Using verbose log');
//     app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
//     //For some reason morgan body doesn't work.
//     // morganBody(app);
//   }
//   /* CORS Configuration */
//   const openCors = cors({ origin: '*' });
//   app.use(openCors);
//   /**
//    * Collect partial results for debugging purposes.
//    */
//   app.post('/recognitionResults', (req, res) => {
//     console.log(`stable: '${req.body.StableSpeechResult}' unstable: '${req.body.UnstableSpeechResult}'`)
//     res.json(true);
//   });
//   /**
//    * Get the responses from the chatbot in a simple text format
//    */
//   app.get('/:botId/responses', async (req, res) => {
//     const { botId } = req.params;
//     const intents = [
//       { intent: 'shareQuestionCapture', question: 'Great. Would you mind sharing one of your questions with me? You can type it below:', responses:[] },
//       { intent: 'improveNotificationMessageCapture', question: 'Is there anything about the notification text message that you think could be improved? Take a minute and jot down any ideas you have that might improve it. What’s one thing you jotted down?', responses: []},
//       { intent: 'conclusionOneThingCapture', question: 'One quick question: What would you most like to get out of the exercise today?', responses: []},
//       { intent: 'tripSummaryStruggleCapture', question: 'In one word, what do you now think is the most important key to using automated digital tools with low-income clients?', responses: []},
//     ];
//     const responsesResult: Array<SomeResult<string[]>> = await Promise.all(intents.map((i: any) => firebaseApi.getResponses(botId, i.intent)));
//     responsesResult.forEach((result, idx) => {
//       if (result.type === ResultType.ERROR) {
//         return;
//       }
//       //@ts-ignore
//       intents[idx].responses = result.result;
//     });
//     res.status(200).send(mustache.render(template, { intents }));
//   });
//   /**
//    * Callback triggered once feedback recording is finished
//    */
//   app.post('/:botId/recordingCallback/feedback', async (req, res) => {
//     const botId = getBotId(req.params.botId);
//     const recording: Recording = {
//       url: req.body.RecordingUrl,
//       createdAt: moment().toISOString(),
//       callSid: req.body.CallSid,
//     };
//     const pendingId = await firebaseApi.saveFeedbackRecording(recording, botId);
//     log({
//       type: LogType.PENDING_MESSAGE,
//       botId,
//       pendingId,
//       callSid: recording.callSid,
//       url: recording.url,
//     });
//     res.json(pendingId);
//   });
//   /**
//    * triggerCall
//    * 
//    * triggers a call.
//    * TODO: set up auth
//    * 
//    * example body:
//    * {
//    *   "mobile": "+61410237238",
//    *   "url": "https://us-central1-tz-phone-book.cloudfunctions.net/twiml/entrypoint",
//    *   "botId": "senegalNotification",
//    * }
//    * 
//    */
//   app.post('/triggerCall', (req, res) => {
//     if (!req.query.temporaryInsecureAuthKey) {
//       res.status(401).send('apiKey is required');
//     }
//     if (req.query.temporaryInsecureAuthKey !== temporaryInsecureAuthKey) {
//       res.status(401).send('Invalid Api Key');
//     }
//     return twilioApi.startCall(req.body.botId, req.body.mobile, req.body.url)
//     .then(response => res.json(response));
//   });
//   /**
//    * Handle Twilio Callback to save the recording for pending submission.
//    */
//   app.post('/:botId/recordingCallback/message', async (req, res) => {
//     const botId = getBotId(req.params.botId);
//     const recording: Recording = {
//       url: req.body.RecordingUrl,
//       createdAt: moment().toISOString(),
//       callSid: req.body.CallSid,
//     };
//     const pendingId = await firebaseApi.savePendingRecording(recording, botId);
//     log({
//       type: LogType.PENDING_MESSAGE,
//       botId,
//       pendingId,
//       callSid: recording.callSid,
//       url: recording.url,
//     });
//     res.json(pendingId);
//   });
//   /**
//    * Action callback handlers.
//    */
//   app.post('/:botId/gather/*', async (req, res) => {
//     const botId = getBotId(req.params.botId);
//     const blockName = pathToBlock(req.path);
//     console.log(`Block Name: ${blockName}. Query Params: ${JSON.stringify(req.query)}`);
//     const mobile = getUserMobile(req.body);
//     const user = await firebaseApi.getUserFromMobile(mobile, botId);
//     const pageParams = saftelyGetPageParamsOrDefaults(req.query);
//     const dynamicParams = saftelyGetDynamicParamsOrEmpty(req.query);
//     /* Configure the version using a versionOverride query param */
//     let botConfig: BotConfig;
//     if (pageParams.versionOverride) {
//       botConfig = await firebaseApi.getBotConfigOverride(user.id, botId, pageParams.versionOverride);
//     } else {
//       botConfig = await firebaseApi.getBotConfig(user.id, botId);
//     }
//     const ctx: CallContext = {
//       callSid: req.body.CallSid,
//       mobile,
//       toMobile: req.body.To,
//       userId: user.id,
//       firebaseApi,
//       dynamicParams,
//       ...pageParams,
//       enableDemoMessages: false, //TODO: make remote config for this
//     };
//     log({
//       type: LogType.BLOCK,
//       botId,
//       callSid: ctx.callSid,
//       blockId: blockName,
//       mobile: ctx.mobile,
//       pageParams,
//     });
//     const gatherResult: DigitResult = {
//       digits: req.body.Digits,
//     }
//     const result = await TwilioRouter.gatherNextMessage(ctx, botConfig, blockName, gatherResult);
//     logTwilioResponse(result);
//     res.writeHead(200, { 'Content-Type': 'text/xml' });
//     res.end(result);
//   });
//   /**
//    * Handle all normal routes
//    */
//   app.post('/:botId/*', async (req, res) => {
//     const botId = getBotId(req.params.botId);
//     const blockName = pathToBlock(req.path);
//     //Get the user object.
//     const mobile = getUserMobile(req.body);
//     const user = await firebaseApi.getUserFromMobile(mobile, botId);
//     const pageParams = saftelyGetPageParamsOrDefaults(req.query);
//     const dynamicParams = saftelyGetDynamicParamsOrEmpty(req.query);
//     /* Configure the version using a versionOverride query param */
//     let botConfig: BotConfig;
//     if (pageParams.versionOverride) {
//       //RW-TODO: change this to getBotConfig with params
//       botConfig = await firebaseApi.getBotConfigOverride(user.id, botId, pageParams.versionOverride);
//     } else {
//       botConfig = await firebaseApi.getBotConfig(user.id, botId);
//     }
//     const ctx: CallContext = {
//       callSid: req.body.CallSid,
//       mobile,
//       toMobile: req.body.To,
//       userId: user.id,
//       versionOverride: req.query.versionOverride || null,
//       firebaseApi,
//       dynamicParams,
//       ...pageParams,
//       enableDemoMessages: false, //TODO: make remote config for this
//     };
//     log({
//       type: LogType.BLOCK,
//       botId,
//       callSid: ctx.callSid,
//       blockId: blockName,
//       mobile: ctx.mobile,
//       pageParams,
//     });
//     const result = await TwilioRouter.nextMessage(ctx, botConfig, blockName);
//     logTwilioResponse(result);
//     res.writeHead(200, { 'Content-Type': 'text/xml' });
//     res.end(result);
//   });
//   /*Error Handling - must be at bottom!*/
//   app.use(ErrorHandler);
//   return functions.https.onRequest(app);
// }
