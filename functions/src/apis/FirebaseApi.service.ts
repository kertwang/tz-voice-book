import * as assert from 'assert';
import TwilioRouter from './TwilioRouter';

import fs from './Firestore';

import { describe } from 'mocha';
import { CallContext, GatherResult } from '../types/TwilioRouter';
import FirebaseApi from './FirebaseApi';
import { Block } from '../../lib/types/TwilioRouter';
import { Recording } from './UserApi';
import * as moment from 'moment';


/**
 * FirebaseApi Service Test
 * 
 * These require the service to be working etc.
 */
describe('FirebaseApi', function() {
  this.timeout(5000);

  const firebaseApi = new FirebaseApi(fs);

  // const ctx: CallContext = {
  //   callSid: '12345',
  //   mobile: '+61410233233',
  //   firebaseApi: new FirebaseApi(fs)
  // };

  describe('getPendingRecordings', () => {
    let pendingId: string;

    //Save a new recording
    //TODO: WTF?? Why is this pointing to our water?
    this.beforeAll(async() => {
      const recording: Recording = {
        url: 'example.com',
        createdAt: moment().toISOString(),
        callSid: '12345',
      };

      pendingId = await firebaseApi.savePendingRecording(recording);
    });

    it.only('gets the pending recordings', async () => {
      //Arrange
      const callSid = "12345";

      //Act
      const recordings: Recording[] = await firebaseApi.getPendingRecordings(callSid, 1);
      console.log("recordings:", recordings);

      //Assert
      assert.equal(recordings.length, 1);
    })

    this.afterAll(async() => {
      await fs.collection('')
    });

    //TODO: cleanup
  });

});