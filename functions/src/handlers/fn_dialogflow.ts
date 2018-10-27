'use strict';

import fs from '../apis/Firestore';
import FirebaseApi from "../apis/FirebaseApi";
import { ResultType } from '../types_rn/AppProviderTypes';
import { user } from 'firebase-functions/lib/providers/auth';
import { TwilioApi } from '../apis/TwilioApi';
import { mm101CallUrl, informalNotificationUrl, formalNotificationUrl } from '../utils/Env';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion, Payload, PLATFORMS } = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

export type DFUser = { 
  sessionId: string,
  mobile: string,
}


//TODO: add basic auth
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const firebaseApi = new FirebaseApi(fs);
  const twilioApi = new TwilioApi();
  const client = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body, null, 2));
  
  const botId = 'uncdfBot';
  const sessionId = request.body.sessionId;

  function welcome(agent: any) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback(agent: any) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  async function menuCall(conv: any) {
    console.log("sessionId", sessionId);

    const userResult = await firebaseApi.getDFUser(botId, sessionId);
    if (userResult.type === ResultType.ERROR || !userResult.result.mobile) {
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
    return
  }

  async function menuCallMobile(conv: any) {
    const mobile = request.body.result.parameters.mobile;
    if (!mobile) {
      conv.add("I'm Sorry. Something went wrong. Please say 'menu' to try again.");
      return;
    }

    /* Save the number and user */
    const newUser: DFUser = { mobile, sessionId }; 
    const saveResult = await firebaseApi.saveDFUser(botId, sessionId, newUser);

    if (saveResult.type === ResultType.ERROR) {
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
  }

  async function triggerFormalCall(conv: any) {
    const url = formalNotificationUrl;
    await triggerCall(conv, url);
    handlePostCall(conv);
  }

  async function triggerInformalCall(conv: any) {
    const url = informalNotificationUrl;
    await triggerCall(conv, url);
    handlePostCall(conv);
  }

  async function triggerMMCall(conv: any) {
    const url = mm101CallUrl;
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
      await twilioApi.startCall(userResult.result.mobile, url);
    } catch (err) {
      conv.add(`There was a problem making the call. Please try again.`);
    }

    return;
  }

  function handlePostCall(conv: any) {
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