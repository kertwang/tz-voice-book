'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Firestore_1 = require("../apis/Firestore");
const FirebaseApi_1 = require("../apis/FirebaseApi");
const AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
const TwilioApi_1 = require("../apis/TwilioApi");
const Env_1 = require("../utils/Env");
const TwilioTypes_1 = require("../types_rn/TwilioTypes");
const Log_1 = require("../utils/Log");
const LogTypes_1 = require("../types_rn/LogTypes");
const utils_1 = require("../utils");
const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');
process.env.DEBUG = 'dialogflow:production'; // enables lib debugging statements
//TODO: add basic auth
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    //Super basic auth:
    if (request.headers.authorization !== utils_1.buildExpectedToken('apikey', Env_1.temporaryInsecureAuthKey)) {
        console.log("unquthorized request");
        return response.status(401).send('Not Authorized');
    }
    const firebaseApi = new FirebaseApi_1.default(Firestore_1.default);
    const twilioApi = new TwilioApi_1.TwilioApi();
    const client = new WebhookClient({ request, response });
    const requestLogStr = `Dialogflow Request headers:, ${JSON.stringify(request.headers)}`;
    const responseLogStr = `Dialogflow Response headers:, ${JSON.stringify(request.headers)}`;
    Log_1.maybeLog(requestLogStr);
    Log_1.maybeLog(responseLogStr);
    const botId = TwilioTypes_1.BotId.uncdfBot;
    const sessionId = request.body.sessionId;
    function menuCall(conv) {
        return __awaiter(this, void 0, void 0, function* () {
            Log_1.log({
                type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
                intent: 'menu.call',
                sessionId,
            });
            const userResult = yield firebaseApi.getDFUser(botId, sessionId);
            if (userResult.type === AppProviderTypes_1.ResultType.ERROR || !userResult.result.mobile) {
                //No existing user
                //TODO: Translate?
                conv.add(`Who should I call? Make sure to enter the number with the country code e.g. +221 for Senegal`);
                return;
            }
            const mobile = userResult.result.mobile;
            conv.add('Who should I call?');
            conv.add(new Card({
                title: `Saved numbers:`,
                buttonText: mobile,
                buttonUrl: mobile,
                platform: "FACEBOOK",
            }));
            conv.add('Or just type a new number.');
            return;
        });
    }
    function menuCallMobile(conv) {
        return __awaiter(this, void 0, void 0, function* () {
            Log_1.log({
                type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
                intent: 'menu.call.mobile',
                sessionId,
            });
            const mobile = request.body.result.parameters.mobile;
            if (!mobile) {
                conv.add("I'm Sorry. Something went wrong. Please say 'menu' to try again.");
                return;
            }
            /* Save the number and user */
            const newUser = { mobile: `${mobile}`, sessionId };
            const saveResult = yield firebaseApi.saveDFUser(botId, sessionId, newUser);
            if (saveResult.type === AppProviderTypes_1.ResultType.ERROR) {
                console.log("ERROR:", saveResult.message);
                conv.add("Sorry. Something went wrong. Please say 'menu' to try again.");
                return;
            }
            conv.add('Thanks.');
            conv.add('What type of call should they recieve?');
            conv.add(new Card({
                title: `Payment Notification`,
                buttonText: 'CALL',
                buttonUrl: 'informal_payment_notification',
                platform: "FACEBOOK",
            }));
            // conv.add(new Card({
            //   title: `Formal Payment Notification:`,
            //   buttonText: 'CALL',
            //   buttonUrl: 'formal_payment_notification',
            //   platform: "FACEBOOK",
            // }));
            conv.add(new Card({
                title: `Mobile Money 101:`,
                buttonText: 'CALL',
                buttonUrl: 'mobile_money_101',
                platform: "FACEBOOK",
            }));
            if (Env_1.shouldDisplayEnglishTestCall) {
                conv.add(new Card({
                    title: `Test Call`,
                    buttonText: `CALL`,
                    buttonUrl: 'test_call',
                    platform: "FACEBOOK",
                }));
            }
            return;
        });
    }
    function triggerFormalCall(conv) {
        return __awaiter(this, void 0, void 0, function* () {
            Log_1.log({
                type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
                intent: 'menu.call.mobile.formal',
                sessionId,
            });
            const url = Env_1.formalNotificationUrl;
            yield triggerCall(conv, url);
            handlePostCall(conv);
        });
    }
    function triggerInformalCall(conv) {
        return __awaiter(this, void 0, void 0, function* () {
            Log_1.log({
                type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
                intent: 'menu.call.mobile.informal',
                sessionId,
            });
            const url = Env_1.informalNotificationUrl;
            yield triggerCall(conv, url);
            handlePostCall(conv);
        });
    }
    function triggerMMCall(conv) {
        return __awaiter(this, void 0, void 0, function* () {
            Log_1.log({
                type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
                intent: 'menu.call.mobile.mm101',
                sessionId,
            });
            const url = Env_1.mm101CallUrl;
            yield triggerCall(conv, url);
            handlePostCall(conv);
        });
    }
    function triggerTestCall(conv) {
        return __awaiter(this, void 0, void 0, function* () {
            Log_1.log({
                type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
                intent: 'menu.call.mobile.test',
                sessionId,
            });
            const url = Env_1.testCallUrl;
            yield triggerCall(conv, url);
            handlePostCall(conv);
        });
    }
    function triggerCall(conv, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const userResult = yield firebaseApi.getDFUser(botId, sessionId);
            if (userResult.type === AppProviderTypes_1.ResultType.ERROR || !userResult.result.mobile) {
                //No existing user
                //TODO: Translate?
                conv.add(`Something went wrong. Please try again.`);
                return;
            }
            try {
                yield twilioApi.startCall(botId, userResult.result.mobile, url);
            }
            catch (err) {
                conv.add(`There was a problem making the call. Please try again.`);
            }
            return;
        });
    }
    function handlePostCall(conv) {
        conv.add('Making the call now.');
        const quickReplies = new Suggestion({
            title: 'What would you like to do next?',
            reply: 'New Call'
        });
        quickReplies.addReply_('Menu');
        conv.add(quickReplies);
    }
    //
    // Capture Words from User
    // ------------------------------------------
    function conclusionOneThingCapture(conv) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = request.body && request.body.result && request.body.result.resolvedQuery;
            if (text) {
                yield firebaseApi.saveResponse(botId, 'conclusionOneThingCapture', text);
            }
            //TODO: translate
            const quickReplies = new Suggestion({
                title: 'Okay got it, we’ll do our best! To review the content we just went over and see other things this chatbot can help you with, simply type “menu” at any time.',
                reply: 'Menu'
            });
            conv.add(quickReplies);
        });
    }
    function tripSummaryStruggleCapture(conv) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = request.body && request.body.result && request.body.result.resolvedQuery;
            if (text) {
                yield firebaseApi.saveResponse(botId, 'tripSummaryStruggleCapture', text);
            }
            //TODO: translate
            conv.add('What aspects of the bots did your beneficiary struggle with? With your fellow group members, write down a few observations on the RED notes. Write one observation per note.');
        });
    }
    const intentMap = new Map();
    intentMap.set('menu.call', menuCall);
    intentMap.set('menu.call.mobile', menuCallMobile);
    intentMap.set('menu.call.mobile.formal', triggerFormalCall);
    intentMap.set('menu.call.mobile.informal', triggerInformalCall);
    intentMap.set('menu.call.mobile.mm101', triggerMMCall);
    intentMap.set('menu.call.mobile.test', triggerTestCall);
    intentMap.set('4.1_conclusion - fallback', conclusionOneThingCapture);
    intentMap.set('u.1.trip_summary.struggle_1', tripSummaryStruggleCapture);
    //TODO: add other fallback intent capture methods
    client.handleRequest(intentMap);
});
//# sourceMappingURL=fn_dialogflow.js.map