'use strict';

import fs from '../apis/Firestore';
import FirebaseApi from "../apis/FirebaseApi";
import { ResultType } from '../types_rn/AppProviderTypes';
import { TwilioApi } from '../apis/TwilioApi';
import { mm101CallUrl, informalNotificationUrl, formalNotificationUrl, temporaryInsecureAuthKey, shouldDisplayEnglishTestCall, testCallUrl } from '../utils/Env';
import { BotId } from '../types_rn/TwilioTypes';
import { log, maybeLog } from '../utils/Log';
import { LogType } from '../types_rn/LogTypes';
import { buildExpectedToken } from '../utils';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:production'; // enables lib debugging statements

export type DFUser = { 
  sessionId: string,
  mobile: string,
}


//TODO: add basic auth
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  
  //Super basic auth:
  if (request.headers.authorization !== buildExpectedToken('apikey', temporaryInsecureAuthKey)) {
    console.log("unquthorized request");
    return response.status(401).send('Not Authorized');
  }
  const firebaseApi = new FirebaseApi(fs);
  const twilioApi = new TwilioApi();
  const client = new WebhookClient({ request, response });

  const requestLogStr = `Dialogflow Request headers:, ${JSON.stringify(request.headers)}`;
  const responseLogStr = `Dialogflow Response headers:, ${JSON.stringify(request.headers)}`;
  maybeLog(requestLogStr);
  maybeLog(responseLogStr);

  const botId = BotId.uncdfBot;
  const sessionId = request.body.sessionId;

  async function menuCall(conv: any) {
    log({
      type: LogType.DIALOG_FLOW_INTENT,
      intent: 'menu.call',
      sessionId,
    });

    const userResult = await firebaseApi.getDFUser(botId, sessionId);
    if (userResult.type === ResultType.ERROR || !userResult.result.mobile) {
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
    return
  }

  async function menuCallMobile(conv: any) {
    log({
      type: LogType.DIALOG_FLOW_INTENT,
      intent: 'menu.call.mobile',
      sessionId,
    });

    const mobile = request.body.result.parameters.mobile;
    if (!mobile) {
      conv.add("I'm Sorry. Something went wrong. Please say 'menu' to try again.");
      return;
    }

    /* Save the number and user */
    const newUser: DFUser = { mobile: `${mobile}`, sessionId }; 
    const saveResult = await firebaseApi.saveDFUser(botId, sessionId, newUser);

    if (saveResult.type === ResultType.ERROR) {
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

    if (shouldDisplayEnglishTestCall) {
      conv.add(new Card({
        title: `Test Call`,
        buttonText: `CALL`,
        buttonUrl: 'test_call',
        platform: "FACEBOOK",
      }));
    }
    return;
  }

  async function triggerFormalCall(conv: any) {
    log({
      type: LogType.DIALOG_FLOW_INTENT,
      intent: 'menu.call.mobile.formal',
      sessionId,
    });

    const url = formalNotificationUrl;
    await triggerCall(conv, url);
    handlePostCall(conv);
  }

  async function triggerInformalCall(conv: any) {
    log({
      type: LogType.DIALOG_FLOW_INTENT,
      intent: 'menu.call.mobile.informal',
      sessionId,
    });

    const url = informalNotificationUrl;
    await triggerCall(conv, url);
    handlePostCall(conv);
  }

  async function triggerMMCall(conv: any) {
    log({
      type: LogType.DIALOG_FLOW_INTENT,
      intent: 'menu.call.mobile.mm101',
      sessionId,
    });

    const url = mm101CallUrl;
    await triggerCall(conv, url);
    handlePostCall(conv);
  }

  async function triggerTestCall(conv: any) {
    log({
      type: LogType.DIALOG_FLOW_INTENT,
      intent: 'menu.call.mobile.test',
      sessionId,
    });

    const url = testCallUrl;
    await triggerCall(conv, url);
    handlePostCall(conv);
  }

  async function triggerCall(conv: any, url: string) {
    const userResult = await firebaseApi.getDFUser(botId, sessionId);
    if (userResult.type === ResultType.ERROR || !userResult.result.mobile) {
      //No existing user
      //TODO: Translate?
      conv.add(`Something went wrong. Please try again.`);
      return;
    }

    try {
      await twilioApi.startCall(botId, userResult.result.mobile, url);
    } catch (err) {
      conv.add(`There was a problem making the call. Please try again.`);
    }

    return;
  }

  function handlePostCall(conv: any) {
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

  async function shareQuestionCapture(conv: any) {
    const text = request.body && request.body.result && request.body.result.resolvedQuery;
    if (text) {
      await firebaseApi.saveResponse(botId, 'shareQuestionCapture', text);
    }

    //TODO: translate
    const quickReplies = new Suggestion({
      title: 'Excellent question. It’s useful for me to know what kinds of things you humans like to know about 😉',
      reply: 'Continue'
    });
    conv.add(quickReplies);
  }

  async function improveNotificationMessageCapture(conv: any) {
    const text = request.body && request.body.result && request.body.result.resolvedQuery;
    if (text) {
      await firebaseApi.saveResponse(botId, 'improveNotificationMessageCapture', text);
    }

    //TODO: translate
    const quickReplies = new Suggestion({
      title: 'Great. The “Interviewer” in your group will lead this, but you can all ask questions. When you speak with your beneficiary, start with open-ended questions to see what your beneficiary offers up, and then get more specific. Sometimes you may even want to ask the same question in different ways to see if you get a different response.',
      reply: 'See an example'
    });
    quickReplies.addReply_('Got it');
    conv.add(quickReplies);
  }


  async function conclusionOneThingCapture(conv: any) {
    const text = request.body && request.body.result && request.body.result.resolvedQuery;
    if (text) {
      await firebaseApi.saveResponse(botId, 'conclusionOneThingCapture', text);
    }

    //TODO: translate
    const quickReplies = new Suggestion({
      title: 'Okay got it, we’ll do our best! To review the content we just went over and see other things this chatbot can help you with, simply type “menu” at any time.',
      reply: 'Menu'
    });
    conv.add(quickReplies);
  }

  async function tripSummaryStruggleCapture(conv: any) {
    const text = request.body && request.body.result && request.body.result.resolvedQuery;
    if (text) {
      await firebaseApi.saveResponse(botId, 'tripSummaryStruggleCapture', text);
    }

    //TODO: translate
    conv.add('What aspects of the bots did your beneficiary struggle with? With your fellow group members, write down a few observations on the RED notes. Write one observation per note.');
  }

  const intentMap = new Map();
  intentMap.set('menu.call', menuCall);
  intentMap.set('menu.call.mobile', menuCallMobile);
  intentMap.set('menu.call.mobile.formal',  triggerFormalCall);
  intentMap.set('menu.call.mobile.informal',  triggerInformalCall);
  intentMap.set('menu.call.mobile.mm101',  triggerMMCall);
  intentMap.set('menu.call.mobile.test', triggerTestCall);

  intentMap.set('2.7_user_question', shareQuestionCapture);
  intentMap.set('3.1_asking_questions_fallback', improveNotificationMessageCapture);
  intentMap.set('4.1_conclusion - fallback', conclusionOneThingCapture);
  intentMap.set('u.1.trip_summary.struggle_1', tripSummaryStruggleCapture);
  //TODO: add other fallback intent capture methods

  client.handleRequest(intentMap);
});