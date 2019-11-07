'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Firestore_1 = __importDefault(require("../apis/Firestore"));
var FirebaseApi_1 = __importDefault(require("../apis/FirebaseApi"));
var AppProviderTypes_1 = require("../types_rn/AppProviderTypes");
var TwilioApi_1 = require("../apis/TwilioApi");
var Env_1 = require("../utils/Env");
var TwilioTypes_1 = require("../types_rn/TwilioTypes");
var Log_1 = require("../utils/Log");
var LogTypes_1 = require("../types_rn/LogTypes");
var utils_1 = require("../utils");
var functions = require('firebase-functions');
var WebhookClient = require('dialogflow-fulfillment').WebhookClient;
var _a = require('dialogflow-fulfillment'), Card = _a.Card, Suggestion = _a.Suggestion;
process.env.DEBUG = 'dialogflow:production'; // enables lib debugging statements
var translations = {
    en: {
        menuCall_1: "Who should I call? Make sure to enter the number with the country code e.g. +221 for Senegal",
        menuCall_2: 'Who should I call?',
        menuCall_3: 'Saved numbers:',
        menuCall_4: 'Or just type a new number.',
        error: "I'm Sorry. Something went wrong. Please say 'menu' to try again.",
        menuCallMobile_1: 'Thanks.',
        menuCallMobile_2: 'What type of call should they recieve?',
        menuCallMobile_3: "Payment Notification",
        menuCallMobile_4: 'CALL',
        menuCallMobile_5: "Mobile Money 101:",
        triggerCallError: "Something went wrong. Please try again.",
        triggerCallError_2: "There was a problem making the call. Please try again.",
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
        tripSummaryStruggleCapture_3: 'Continue'
    },
    fr: {
        menuCall_1: "Qui dois-je appeler? Assurez-vous de saisir le num\u00E9ro avec le code pays, par exemple +221 pour le S\u00E9n\u00E9gal",
        menuCall_2: 'Appeler qui?',
        menuCall_3: 'Numéros enregistrés',
        menuCall_4: 'Ou entrez un nouveau numéro',
        error: "Je suis désolé. Quelque chose s'est mal passé. S'il vous plaît dites «menu» pour essayer à nouveau.",
        menuCallMobile_1: 'Merci',
        menuCallMobile_2: 'Quel type d’appel?',
        menuCallMobile_3: "Notification de paiement",
        menuCallMobile_4: 'APPELER',
        menuCallMobile_5: "Intro \u00E0 Mobile Money",
        triggerCallError: "Something went wrong. Please try again.",
        triggerCallError_2: "There was a problem making the call. Please try again.",
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
        tripSummaryStruggleCapture_3: 'Continuer'
    }
};
//TODO: add basic auth
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(function (request, response) {
    //Super basic auth:
    if (request.headers.authorization !== utils_1.buildExpectedToken('apikey', Env_1.temporaryInsecureAuthKey)) {
        return response.status(401).send('Not Authorized');
    }
    var firebaseApi = new FirebaseApi_1["default"](Firestore_1["default"]);
    var twilioApi = new TwilioApi_1.TwilioApi();
    var client = new WebhookClient({ request: request, response: response });
    var requestLogStr = "Dialogflow Request headers:, " + JSON.stringify(request.headers);
    var responseLogStr = "Dialogflow Response headers:, " + JSON.stringify(request.headers);
    Log_1.maybeLog(requestLogStr);
    Log_1.maybeLog(responseLogStr);
    var botId = TwilioTypes_1.BotId.uncdfBot;
    var sessionId = request.body.sessionId;
    //Set up language, default to english
    var lang = 'en';
    if (request.headers && request.headers.language && request.headers.language === 'fr') {
        lang = 'fr';
    }
    function menuCall(conv) {
        return __awaiter(this, void 0, void 0, function () {
            var userResult, mobile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Log_1.log({
                            type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
                            intent: 'menu.call',
                            sessionId: sessionId
                        });
                        return [4 /*yield*/, firebaseApi.getDFUser(botId, sessionId)];
                    case 1:
                        userResult = _a.sent();
                        if (userResult.type === AppProviderTypes_1.ResultType.ERROR || !userResult.result.mobile) {
                            //No existing user
                            //TODO: Translate?
                            conv.add(translations[lang].menuCall_1);
                            return [2 /*return*/];
                        }
                        mobile = userResult.result.mobile;
                        conv.add(translations[lang].menuCall_2);
                        conv.add(new Card({
                            title: translations[lang].menuCall_3,
                            buttonText: mobile,
                            buttonUrl: mobile,
                            platform: "FACEBOOK"
                        }));
                        conv.add(translations[lang].menuCall_4);
                        return [2 /*return*/];
                }
            });
        });
    }
    function menuCallMobile(conv) {
        return __awaiter(this, void 0, void 0, function () {
            var mobile, newUser, saveResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Log_1.log({
                            type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
                            intent: 'menu.call.mobile',
                            sessionId: sessionId
                        });
                        mobile = request.body.result.parameters.mobile;
                        if (!mobile) {
                            conv.add(translations[lang].error);
                            return [2 /*return*/];
                        }
                        newUser = { mobile: "" + mobile, sessionId: sessionId };
                        return [4 /*yield*/, firebaseApi.saveDFUser(botId, sessionId, newUser)];
                    case 1:
                        saveResult = _a.sent();
                        if (saveResult.type === AppProviderTypes_1.ResultType.ERROR) {
                            conv.add(translations[lang].error);
                            return [2 /*return*/];
                        }
                        conv.add(translations[lang].menuCallMobile_1);
                        conv.add(translations[lang].menuCallMobile_2);
                        conv.add(new Card({
                            title: translations[lang].menuCallMobile_3,
                            buttonText: translations[lang].menuCallMobile_4,
                            buttonUrl: 'informal_payment_notification',
                            platform: "FACEBOOK"
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
                            platform: "FACEBOOK"
                        }));
                        if (Env_1.shouldDisplayEnglishTestCall) {
                            conv.add(new Card({
                                title: "Test Call",
                                buttonText: "CALL",
                                buttonUrl: 'test_call',
                                platform: "FACEBOOK"
                            }));
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    function triggerFormalCall(conv) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Log_1.log({
                            type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
                            intent: 'menu.call.mobile.formal',
                            sessionId: sessionId
                        });
                        url = Env_1.formalNotificationUrl;
                        return [4 /*yield*/, triggerCall(conv, url)];
                    case 1:
                        _a.sent();
                        handlePostCall(conv);
                        return [2 /*return*/];
                }
            });
        });
    }
    function triggerInformalCall(conv) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Log_1.log({
                            type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
                            intent: 'menu.call.mobile.informal',
                            sessionId: sessionId
                        });
                        url = Env_1.informalNotificationUrl;
                        return [4 /*yield*/, triggerCall(conv, url)];
                    case 1:
                        _a.sent();
                        handlePostCall(conv);
                        return [2 /*return*/];
                }
            });
        });
    }
    function triggerMMCall(conv) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Log_1.log({
                            type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
                            intent: 'menu.call.mobile.mm101',
                            sessionId: sessionId
                        });
                        url = Env_1.mm101CallUrl;
                        return [4 /*yield*/, triggerCall(conv, url)];
                    case 1:
                        _a.sent();
                        handlePostCall(conv);
                        return [2 /*return*/];
                }
            });
        });
    }
    function triggerTestCall(conv) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Log_1.log({
                            type: LogTypes_1.LogType.DIALOG_FLOW_INTENT,
                            intent: 'menu.call.mobile.test',
                            sessionId: sessionId
                        });
                        url = Env_1.testCallUrl;
                        return [4 /*yield*/, triggerCall(conv, url)];
                    case 1:
                        _a.sent();
                        handlePostCall(conv);
                        return [2 /*return*/];
                }
            });
        });
    }
    function triggerCall(conv, url) {
        return __awaiter(this, void 0, void 0, function () {
            var userResult, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, firebaseApi.getDFUser(botId, sessionId)];
                    case 1:
                        userResult = _a.sent();
                        if (userResult.type === AppProviderTypes_1.ResultType.ERROR || !userResult.result.mobile) {
                            //No existing user
                            //TODO: Translate?
                            // conv.add(`Something went wrong. Please try again.`);
                            conv.add(translations[lang].triggerCallError);
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, twilioApi.startCall(botId, userResult.result.mobile, url)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        // conv.add(`There was a problem making the call. Please try again.`);
                        conv.add(translations[lang].triggerCallError_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    function handlePostCall(conv) {
        // conv.add('Making the call now.');
        conv.add(translations[lang].handlePostCall_1);
        var quickReplies = new Suggestion({
            title: translations[lang].handlePostCall_2,
            reply: translations[lang].handlePostCall_3
        });
        quickReplies.addReply_(translations[lang].handlePostCall_4);
        conv.add(quickReplies);
    }
    //
    // Capture Words from User
    // ------------------------------------------
    function shareQuestionCapture(conv) {
        return __awaiter(this, void 0, void 0, function () {
            var text, quickReplies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = request.body && request.body.result && request.body.result.resolvedQuery;
                        if (!text) return [3 /*break*/, 2];
                        return [4 /*yield*/, firebaseApi.saveResponse(botId, 'shareQuestionCapture', text)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        quickReplies = new Suggestion({
                            title: translations[lang].shareQuestionCapture_1,
                            reply: translations[lang].shareQuestionCapture_2
                        });
                        conv.add(quickReplies);
                        return [2 /*return*/];
                }
            });
        });
    }
    function improveNotificationMessageCapture(conv) {
        return __awaiter(this, void 0, void 0, function () {
            var text, quickReplies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = request.body && request.body.result && request.body.result.resolvedQuery;
                        if (!text) return [3 /*break*/, 2];
                        return [4 /*yield*/, firebaseApi.saveResponse(botId, 'improveNotificationMessageCapture', text)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        quickReplies = new Suggestion({
                            title: translations[lang].improveNotificationMessageCapture_1,
                            reply: translations[lang].improveNotificationMessageCapture_2
                        });
                        quickReplies.addReply_(translations[lang].improveNotificationMessageCapture_3);
                        conv.add(quickReplies);
                        return [2 /*return*/];
                }
            });
        });
    }
    function conclusionOneThingCapture(conv) {
        return __awaiter(this, void 0, void 0, function () {
            var text, quickReplies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = request.body && request.body.result && request.body.result.resolvedQuery;
                        if (!text) return [3 /*break*/, 2];
                        return [4 /*yield*/, firebaseApi.saveResponse(botId, 'conclusionOneThingCapture', text)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        quickReplies = new Suggestion({
                            title: translations[lang].conclusionOneThingCapture_1,
                            reply: translations[lang].conclusionOneThingCapture_2
                        });
                        conv.add(quickReplies);
                        return [2 /*return*/];
                }
            });
        });
    }
    function tripSummaryStruggleCapture(conv) {
        return __awaiter(this, void 0, void 0, function () {
            var text, quickReplies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = request.body && request.body.result && request.body.result.resolvedQuery;
                        if (!text) return [3 /*break*/, 2];
                        return [4 /*yield*/, firebaseApi.saveResponse(botId, 'tripSummaryStruggleCapture', text)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        conv.add(translations[lang].tripSummaryStruggleCapture_1);
                        quickReplies = new Suggestion({
                            title: translations[lang].tripSummaryStruggleCapture_2,
                            reply: translations[lang].tripSummaryStruggleCapture_3
                        });
                        conv.add(quickReplies);
                        return [2 /*return*/];
                }
            });
        });
    }
    var intentMap = new Map();
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
