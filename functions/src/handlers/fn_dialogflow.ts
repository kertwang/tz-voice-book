'use strict';

import fs from '../apis/Firestore';
import FirebaseApi from "../apis/FirebaseApi";
import { ResultType } from '../types_rn/AppProviderTypes';
import { user } from 'firebase-functions/lib/providers/auth';

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

    // conv.add(new Card({
    //   title: `Title: this is a card title`,
    //   imageUrl: 'https://dialogflow.com/images/api_home_laptop.svg',
    //   text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
    //   buttonText: 'This is a button',
    //   buttonUrl: 'this is a button',
    //   platform: "FACEBOOK",
    // }));

    conv.add('Or just type a new number.');
    conv.add(new Suggestion({title: `${mobile}`, platform: 'FACEBOOK'}));
    return
  }

  async function menuCallMobile(conv: any) {
    console.log("request.body", request.body);
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
    conv.add('What type of call should I make?');
    //TODO: Add cards for each call type
    return;
  }

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase inline editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://dialogflow.com/images/api_home_laptop.svg',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://docs.dialogflow.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('menu.call', menuCall);
  intentMap.set('menu.call.mobile', menuCallMobile);
  // intentMap.set('<INTENT_NAME_HERE>', yourFunctionHandler);
  // intentMap.set('<INTENT_NAME_HERE>', googleAssistantHandler);
  client.handleRequest(intentMap);
});