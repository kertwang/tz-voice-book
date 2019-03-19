'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Firestore_1 = __importDefault(require("../apis/Firestore"));
const FirebaseApi_1 = __importDefault(require("../apis/FirebaseApi"));
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
const translations = {
    en: {
        menuCall_1: `Who should I call? Make sure to enter the number with the country code e.g. +221 for Senegal`,
        menuCall_2: 'Who should I call?',
        menuCall_3: 'Saved numbers:',
        menuCall_4: 'Or just type a new number.',
        error: "I'm Sorry. Something went wrong. Please say 'menu' to try again.",
        menuCallMobile_1: 'Thanks.',
        menuCallMobile_2: 'What type of call should they recieve?',
        menuCallMobile_3: `Payment Notification`,
        menuCallMobile_4: 'CALL',
        menuCallMobile_5: `Mobile Money 101:`,
        triggerCallError: `Something went wrong. Please try again.`,
        triggerCallError_2: `There was a problem making the call. Please try again.`,
        handlePostCall_1: 'Making the call now.',
        handlePostCall_2: 'What would you like to do next?',
        handlePostCall_3: 'New Call',
        handlePostCall_4: 'Menu',
        shareQuestionCapture_1: 'Excellent question. It’s useful for me to know what kinds of things you humans like to know about 😉',
        shareQuestionCapture_2: 'Continue',
        improveNotificationMessageCapture_1: 'Great. The “Interviewer” in your group will lead this, but you can all ask questions. When you speak with your beneficiary, start with open-ended questions to see what your beneficiary offers up, and then get more specific. Sometimes you may even want to ask the same question in different ways to see if you get a different response.',
        improveNotificationMessageCapture_2: 'See an example',
        improveNotificationMessageCapture_3: 'Got it',
        conclusionOneThingCapture_1: 'Okay got it, we’ll do our best! To review the content we just went over and see other things this chatbot can help you with, simply type “menu” at any time.',
        conclusionOneThingCapture_2: 'Menu',
        tripSummaryStruggleCapture_1: 'What aspects of the bots did your beneficiary struggle with? With your fellow group members, write down a few observations on the RED notes. Write one observation per note.',
        tripSummaryStruggleCapture_2: 'Press continue when you\'re done.',
        tripSummaryStruggleCapture_3: 'Continue',
    },
    fr: {
        menuCall_1: `Qui dois-je appeler? Assurez-vous de saisir le numéro avec le code pays, par exemple +221 pour le Sénégal`,
        menuCall_2: 'Appeler qui?',
        menuCall_3: 'Numéros enregistrés',
        menuCall_4: 'Ou entrez un nouveau numéro',
        error: "Je suis désolé. Quelque chose s'est mal passé. S'il vous plaît dites «menu» pour essayer à nouveau.",
        menuCallMobile_1: 'Merci',
        menuCallMobile_2: 'Quel type d’appel?',
        menuCallMobile_3: `Notification de paiement`,
        menuCallMobile_4: 'APPELER',
        menuCallMobile_5: `Intro à Mobile Money`,
        triggerCallError: `Something went wrong. Please try again.`,
        triggerCallError_2: `There was a problem making the call. Please try again.`,
        handlePostCall_1: 'Appel en cours',
        handlePostCall_2: 'Que voulez-vous faire ensuite?',
        handlePostCall_3: 'Nouvel appel',
        handlePostCall_4: 'Menu',
        shareQuestionCapture_1: 'Excellente question. C’est utile pour moi de savoir le genre de chose vous humains aimez savoir. 😉',
        shareQuestionCapture_2: 'Continuer',
        improveNotificationMessageCapture_1: 'Génial. L’intervieweur de votre groupe dirigera la discussion, mais vous pouvez tous poser des questions. Lorsque vous parlez à votre bénéficiaire, commencez par des questions ouvertes pour voir ce que votre bénéficiaire offre, puis faites suit avec des questions plus précis. Parfois, vous voudrez peut-être même poser la même question de différentes façons pour voir si la réponse est différente.',
        improveNotificationMessageCapture_2: 'Voir un exemple',
        improveNotificationMessageCapture_3: 'Je l\'ai',
        conclusionOneThingCapture_1: 'Okay, nous ferons de notre mieux! Pour revoir le contenu que nous venons de presenter et pour voir autres applications de ce chatbot, tapez simplement \'menu\' à tout moment.',
        conclusionOneThingCapture_2: 'Menu',
        tripSummaryStruggleCapture_1: 'Quels aspects des robots ont poser des problèmes pour votre bénéficiaire? Avec les autres membres de votre groupe, écrivez quelques observations sur les feuillets ROUGES -- une observation par feuillet.',
        tripSummaryStruggleCapture_2: 'Appuyez sur «Continuer» quand vous avez terminé.',
        tripSummaryStruggleCapture_3: 'Continuer',
    }
};
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
    //Set up language, default to english
    let lang = 'en';
    if (request.headers && request.headers.language && request.headers.language === 'fr') {
        lang = 'fr';
    }
    async function menuCall(conv) {
        Log_1.log({
            type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
            intent: 'menu.call',
            sessionId,
        });
        const userResult = await firebaseApi.getDFUser(botId, sessionId);
        if (userResult.type === AppProviderTypes_1.ResultType.ERROR || !userResult.result.mobile) {
            //No existing user
            //TODO: Translate?
            conv.add(translations[lang].menuCall_1);
            return;
        }
        const mobile = userResult.result.mobile;
        conv.add(translations[lang].menuCall_2);
        conv.add(new Card({
            title: translations[lang].menuCall_3,
            buttonText: mobile,
            buttonUrl: mobile,
            platform: "FACEBOOK",
        }));
        conv.add(translations[lang].menuCall_4);
        return;
    }
    async function menuCallMobile(conv) {
        Log_1.log({
            type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
            intent: 'menu.call.mobile',
            sessionId,
        });
        const mobile = request.body.result.parameters.mobile;
        if (!mobile) {
            conv.add(translations[lang].error);
            return;
        }
        /* Save the number and user */
        const newUser = { mobile: `${mobile}`, sessionId };
        const saveResult = await firebaseApi.saveDFUser(botId, sessionId, newUser);
        if (saveResult.type === AppProviderTypes_1.ResultType.ERROR) {
            console.log("ERROR:", saveResult.message);
            conv.add(translations[lang].error);
            return;
        }
        conv.add(translations[lang].menuCallMobile_1);
        conv.add(translations[lang].menuCallMobile_2);
        conv.add(new Card({
            title: translations[lang].menuCallMobile_3,
            buttonText: translations[lang].menuCallMobile_4,
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
            title: translations[lang].menuCallMobile_5,
            buttonText: translations[lang].menuCallMobile_4,
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
    }
    async function triggerFormalCall(conv) {
        Log_1.log({
            type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
            intent: 'menu.call.mobile.formal',
            sessionId,
        });
        const url = Env_1.formalNotificationUrl;
        await triggerCall(conv, url);
        handlePostCall(conv);
    }
    async function triggerInformalCall(conv) {
        Log_1.log({
            type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
            intent: 'menu.call.mobile.informal',
            sessionId,
        });
        const url = Env_1.informalNotificationUrl;
        await triggerCall(conv, url);
        handlePostCall(conv);
    }
    async function triggerMMCall(conv) {
        Log_1.log({
            type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
            intent: 'menu.call.mobile.mm101',
            sessionId,
        });
        const url = Env_1.mm101CallUrl;
        await triggerCall(conv, url);
        handlePostCall(conv);
    }
    async function triggerTestCall(conv) {
        Log_1.log({
            type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
            intent: 'menu.call.mobile.test',
            sessionId,
        });
        const url = Env_1.testCallUrl;
        await triggerCall(conv, url);
        handlePostCall(conv);
    }
    async function triggerCall(conv, url) {
        const userResult = await firebaseApi.getDFUser(botId, sessionId);
        if (userResult.type === AppProviderTypes_1.ResultType.ERROR || !userResult.result.mobile) {
            //No existing user
            //TODO: Translate?
            // conv.add(`Something went wrong. Please try again.`);
            conv.add(translations[lang].triggerCallError);
            return;
        }
        try {
            await twilioApi.startCall(botId, userResult.result.mobile, url);
        }
        catch (err) {
            // conv.add(`There was a problem making the call. Please try again.`);
            conv.add(translations[lang].triggerCallError_2);
        }
        return;
    }
    function handlePostCall(conv) {
        // conv.add('Making the call now.');
        conv.add(translations[lang].handlePostCall_1);
        const quickReplies = new Suggestion({
            title: translations[lang].handlePostCall_2,
            reply: translations[lang].handlePostCall_3,
        });
        quickReplies.addReply_(translations[lang].handlePostCall_4);
        conv.add(quickReplies);
    }
    //
    // Capture Words from User
    // ------------------------------------------
    async function shareQuestionCapture(conv) {
        const text = request.body && request.body.result && request.body.result.resolvedQuery;
        if (text) {
            await firebaseApi.saveResponse(botId, 'shareQuestionCapture', text);
        }
        //TODO: translate
        const quickReplies = new Suggestion({
            title: translations[lang].shareQuestionCapture_1,
            reply: translations[lang].shareQuestionCapture_2
        });
        conv.add(quickReplies);
    }
    async function improveNotificationMessageCapture(conv) {
        const text = request.body && request.body.result && request.body.result.resolvedQuery;
        if (text) {
            await firebaseApi.saveResponse(botId, 'improveNotificationMessageCapture', text);
        }
        const quickReplies = new Suggestion({
            title: translations[lang].improveNotificationMessageCapture_1,
            reply: translations[lang].improveNotificationMessageCapture_2,
        });
        quickReplies.addReply_(translations[lang].improveNotificationMessageCapture_3);
        conv.add(quickReplies);
    }
    async function conclusionOneThingCapture(conv) {
        const text = request.body && request.body.result && request.body.result.resolvedQuery;
        if (text) {
            await firebaseApi.saveResponse(botId, 'conclusionOneThingCapture', text);
        }
        const quickReplies = new Suggestion({
            title: translations[lang].conclusionOneThingCapture_1,
            reply: translations[lang].conclusionOneThingCapture_2,
        });
        conv.add(quickReplies);
    }
    async function tripSummaryStruggleCapture(conv) {
        const text = request.body && request.body.result && request.body.result.resolvedQuery;
        if (text) {
            await firebaseApi.saveResponse(botId, 'tripSummaryStruggleCapture', text);
        }
        conv.add(translations[lang].tripSummaryStruggleCapture_1);
        //TODO: translate
        const quickReplies = new Suggestion({
            title: translations[lang].tripSummaryStruggleCapture_2,
            reply: translations[lang].tripSummaryStruggleCapture_3,
        });
        conv.add(quickReplies);
    }
    const intentMap = new Map();
    intentMap.set('menu.call', menuCall);
    intentMap.set('menu.call.mobile', menuCallMobile);
    intentMap.set('menu.call.mobile.formal', triggerFormalCall);
    intentMap.set('menu.call.mobile.informal', triggerInformalCall);
    intentMap.set('menu.call.mobile.mm101', triggerMMCall);
    intentMap.set('menu.call.mobile.test', triggerTestCall);
    //For some reason, this is the french one, but not english
    intentMap.set('2.7_sharing_question - fallback', shareQuestionCapture);
    intentMap.set('2.7_user_question', shareQuestionCapture);
    intentMap.set('3.1_asking_questions_fallback', improveNotificationMessageCapture);
    intentMap.set('4.1_conclusion - fallback', conclusionOneThingCapture);
    intentMap.set('u.1.trip_summary.struggle_1', tripSummaryStruggleCapture);
    //TODO: add other fallback intent capture methods
    client.handleRequest(intentMap);
});
