"use strict";
// import * as assert from 'assert';
// import fs from './Firestore';
// import { describe } from 'mocha';
// import FirebaseApi from './FirebaseApi';
// import { Recording } from './UserApi';
// import * as moment from 'moment';
// import { BotId, VersionId, CallContext } from '../types_rn/TwilioTypes';
// /**
//  * FirebaseApi Service Test
//  * 
//  * These require the service to be working etc.
//  */
// describe('FirebaseApi', function() {
//   this.timeout(5000);
//   const firebaseApi = new FirebaseApi(fs);
//   const ctx: CallContext = {
//     callSid: '12345',
//     mobile: '+61410233233',
//     toMobile: '+61410233233',
//     firebaseApi: new FirebaseApi(fs)
//   };
//   //TODO:this still saves to the wrong firebase account o
//   describe('getPendingRecordings', () => {
//     let pendingId: string;
//     //Save a new recording
//     this.beforeAll(async() => {
//       const recording: Recording = {
//         url: 'example.com',
//         createdAt: moment().toISOString(),
//         callSid: '12345',
//       };
//       pendingId = await firebaseApi.savePendingRecording(recording);
//     });
//     it('gets the pending recordings', async () => {
//       //Arrange
//       const callSid = "12345";
//       //Act
//       const recordings: Recording[] = await firebaseApi.getPendingRecordings(callSid, 1);
//       console.log("recordings:", recordings);
//       //Assert
//       assert.equal(recordings.length, 1);
//     })
//     this.afterAll(async() => {
//       await fs.collection('pendingRecordings').doc(pendingId).delete();
//     });
//     //TODO: cleanup
//   });
//   describe('getPendingRecordingsWithRetries', () => {
//     it('tries all the times', async () => {
//       //Arrange
//       //Act
//       const result = await firebaseApi.getPendingRecordingsWithRetries('not_a_real_call', 1, 5);
//       //Assert
//       console.log("result", result);
//     });
//   });
//   describe('getContent', function() {
//     it('gets the content', async () => {
//       //Arrange
//       //Act 
//       const content = await firebaseApi.getBlockContent('123', '123');
//       //Assert
//       //We can at least make sure the content is the right size.
//       assert.equal(16, Object.keys(content).length);
//     });
//   });
//   /**
//    * Don't use this. Use gulp instead
//    */
//   describe.skip('saveBlockConfigToFirebase', function() {
//     it('saves the block config', async () => {
//       const en_us_flows = require('../admin/content/en_us_flows');
//       const en_us_blocks = require('../admin/content/en_us_blocks');
//       const en_us_messages = require('../admin/content/en_us_messages');
//       await firebaseApi.deployConfigForBotAndVersion(BotId.voicebook, VersionId.en_us, {
//         messages: en_us_messages,
//         blocks: en_us_blocks,
//         flows: en_us_flows,
//       });
//     });
//   });
// });
