import * as assert from 'assert';
import TwilioRouter from './TwilioRouter';

import fs from './Firestore';

import { describe } from 'mocha';
import { CallContext, GatherResult } from '../types_rn/TwilioRouter';
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

  //TODO:this still saves to the wrong firebase account o
  describe('getPendingRecordings', () => {
    let pendingId: string;

    //Save a new recording
    this.beforeAll(async() => {
      const recording: Recording = {
        url: 'example.com',
        createdAt: moment().toISOString(),
        callSid: '12345',
      };

      pendingId = await firebaseApi.savePendingRecording(recording);
    });

    it('gets the pending recordings', async () => {
      //Arrange
      const callSid = "12345";

      //Act
      const recordings: Recording[] = await firebaseApi.getPendingRecordings(callSid, 1);
      console.log("recordings:", recordings);

      //Assert
      assert.equal(recordings.length, 1);
    })

    this.afterAll(async() => {
      await fs.collection('pendingRecordings').doc(pendingId).delete();
    });

    //TODO: cleanup
  });

  describe('getPendingRecordingsWithRetries', () => {
    it('tries all the times', async () => {
      //Arrange

      //Act
      const result = await firebaseApi.getPendingRecordingsWithRetries('not_a_real_call', 1, 5);

      //Assert
      console.log("result", result);
    });
  });

  describe('getContent', function() {
    it.only('gets the content', async () => {
      //Arrange

      //Act 
      const content = await firebaseApi.getBlockContent('123', '123');

      //Assert
      //We can at least make sure the content is the right size.
      assert.equal(16, Object.keys(content).length);
    });


  })

  //TODO: this really should be in a shell script...
  describe('saveBlockConfigToFirebase', function() {

    it('saves the block config', async () => {
      //BlockConfig tells us how to navigate through the content.
      //It feels mostly redundant however.
      const blockConfig = {
        'entrypoint': ['001'],
        'intro_0': ['001', '002', '003', '004'],
        'error_0': ['001'],
        'record_0': ['001', '002'],
        'record_playback': ['001'],
        'record_playback_err': ['001'],
        'record_post_or_delete': ['001'],
        'record_post_or_delete_err': ['001'],
        'record_save': ['001'],
        'record_save_err': ['001'],
        'record_delete': ['001'],
        'listen_0': ['001', '002', '003', '004'],
        'listen_end': ['001', '002'],
        'listen_end_error': ['001'],
        'listen_feedback': ['001'],
        'listen_feedback_complete': ['001'],
      };
      
      await fs.collection('config').doc('blockConfig').set(blockConfig);
      //TODO: not sure the best way to do this atm
      await fs.collection('content').doc('default').set({
        'entrypoint': {
          '001': { text: 'Hello, and welcome to voicebook', verb: 'say'}
        },
        'intro_0': {
          '001': { text: 'To learn what is new in your community say sikiliza.', verb: 'say'},
          '002': { text: 'To record a message that people in your community can hear, say tuma.', verb: 'say'},
          '003': { text: 'To learn more about this service say msaada.', verb: 'say'},
          '004': { text: 'To hear these options again say kurudia.', verb: 'say'},
        },
        'error_0': {
          '001': {text: 'Sorry, I didn\'t catch that. Please try again.', verb: 'say'}
        }
      });    
    });
  });

});