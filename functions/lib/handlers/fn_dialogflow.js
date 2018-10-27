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
const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion, Payload, PLATFORMS } = require('dialogflow-fulfillment');
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
//TODO: add basic auth
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const firebaseApi = new FirebaseApi_1.default(Firestore_1.default);
    const twilioApi = new TwilioApi_1.TwilioApi();
    const client = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body, null, 2));
    const botId = 'uncdfBot';
    const sessionId = request.body.sessionId;
    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }
    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }
    function menuCall(conv) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("sessionId", sessionId);
            const userResult = yield firebaseApi.getDFUser(botId, sessionId);
            if (userResult.type === AppProviderTypes_1.ResultType.ERROR || !userResult.result.mobile) {
                //No existing user
                //TODO: Translate?
                conv.add(`Who should I call? Make sure to enter the number with the country code e.g. +221 for Senegal`);
                return;
            }
            const mobile = userResult.result.mobile;
            // let card = new Card('Last Numbers:'); 
            // card.setPlatform("FACEBOOK");
            // //TODO: use payload instead
            conv.add('Who should I call?');
            // // card.setButton({ title: mobile, text: 'Call'});
            // card.setButton({text: mobile, url: 'http://yoururlhere.com' });
            // conv.add(card);
            // conv.add('Or just type a new number.');
            conv.add(new Card({
                title: `Saved numbers:`,
                buttonText: mobile,
                buttonUrl: mobile,
                platform: "FACEBOOK",
            }));
            conv.add('Or just type a new number.');
            // conv.add(new Suggestion({title: `${mobile}`, platform: 'FACEBOOK'}));
            return;
        });
    }
    function menuCallMobile(conv) {
        return __awaiter(this, void 0, void 0, function* () {
            const mobile = request.body.result.parameters.mobile;
            if (!mobile) {
                conv.add("I'm Sorry. Something went wrong. Please say 'menu' to try again.");
                return;
            }
            /* Save the number and user */
            const newUser = { mobile, sessionId };
            const saveResult = yield firebaseApi.saveDFUser(botId, sessionId, newUser);
            if (saveResult.type === AppProviderTypes_1.ResultType.ERROR) {
                console.log("ERROR:", saveResult.message);
                conv.add("Sorry. Something went wrong. Please say 'menu' to try again.");
                return;
            }
            conv.add('Thanks.');
            conv.add('What type of call should they recieve?.');
            conv.add(new Card({
                title: `Informal Payment Notification`,
                buttonText: 'CALL',
                buttonUrl: 'informal_payment_notification',
                platform: "FACEBOOK",
            }));
            conv.add(new Card({
                title: `Formal Payment Notification:`,
                buttonText: 'CALL',
                buttonUrl: 'formal_payment_notification',
                platform: "FACEBOOK",
            }));
            conv.add(new Card({
                title: `Mobile Money 101:`,
                buttonText: 'CALL',
                buttonUrl: 'mobile_money_101',
                platform: "FACEBOOK",
            }));
            return;
        });
    }
    function triggerFormalCall(conv) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = Env_1.formalNotificationUrl;
            yield triggerCall(conv, url);
            handlePostCall(conv);
        });
    }
    function triggerInformalCall(conv) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = Env_1.informalNotificationUrl;
            yield triggerCall(conv, url);
            handlePostCall(conv);
        });
    }
    function triggerMMCall(conv) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = Env_1.mm101CallUrl;
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
                yield twilioApi.startCall(userResult.result.mobile, url);
            }
            catch (err) {
                conv.add(`There was a problem making the call. Please try again.`);
            }
            return;
        });
    }
    function handlePostCall(conv) {
        conv.add('Making the call now.');
        conv.add(new Card({
            title: `Make another Call`,
            buttonText: 'New Call',
            buttonUrl: 'trigger call',
            platform: "FACEBOOK",
        }));
    }
    const intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('menu.call', menuCall);
    intentMap.set('menu.call.mobile', menuCallMobile);
    intentMap.set('menu.call.mobile.formal', triggerFormalCall);
    intentMap.set('menu.call.mobile.informal', triggerInformalCall);
    intentMap.set('menu.call.mobile.mm101', triggerMMCall);
    client.handleRequest(intentMap);
});
//# sourceMappingURL=fn_dialogflow.js.map