import assert from 'assert';
import TwilioRouter from './TwilioRouter';

import {describe} from 'mocha';
import FirebaseApi from './FirebaseApi';
import { CallContext, DigitResult, BlockId } from '../types_rn/TwilioTypes';

const admin = require('firebase-admin');
admin.initializeApp();
const fs = admin.firestore();

const botConfig: any = {

};
const ctx: CallContext = {
  callSid: '12345',
  mobile: '+61410233233',
  toMobile: '+61410233233',
  firebaseApi: new FirebaseApi(fs),
  userId: 'user_12345',
  versionOverride: null,
  dynamicParams: [],
  page: 1,
  pageSize: 1,
  maxMessages: 1,
};



describe.skip('TwilioRouter', function() {

  describe('/entrypoint', () => {
    it('gets the default next message', () => {
      //Arrange
      //Act 
      const result = TwilioRouter.nextMessage(ctx, botConfig, BlockId.entrypoint);

      //Assert
      const expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Hello, and welcome to voicebook</Say><Redirect method="POST">./intro_0</Redirect></Response>'
      assert.equal(expected, result);
    });
  });


  describe('/intro_0', () => {
    it('gets the default next message', () => {
      //Arrange
      //Act 
      const result = TwilioRouter.nextMessage(ctx, botConfig, BlockId.intro_0);

      //Assert
      const expected = `<?xml version="1.0" encoding="UTF-8"?><Response><Gather action="./gather/intro_0" method="POST" language="sw-TZ" input="speech" hints="sikiliza,tuma,msaada,kurudia"><Say>To learn what is new in your community say sikiliza. To record a message that people in your community can hear, say tuma. To learn more about this service say msaada. To hear these options again say kurudia.</Say></Gather><Say>We didn't receive any input. Hrrmm.</Say></Response>`;
      assert.equal(expected, result);
    });

  });
    

  describe('gather intro_0', function() {
    it('handles error case', () => {
      //Arrange
      const gatherResult: DigitResult = {
        digits: '10',
      };

      //Act
      const result = TwilioRouter.gatherNextMessage(ctx, botConfig, BlockId.entrypoint, gatherResult);

      //Assert
      const expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Sorry, something went wrong</Say></Response>';
      assert.equal(expected, result);
    });

    it('handles a success case', () => {
      //Arrange
      const gatherResult: DigitResult = {
        digits: '1',
      };

      //Act
      const result = TwilioRouter.gatherNextMessage(ctx, botConfig, BlockId.entrypoint, gatherResult);


      //Assert
      const expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Redirect method="POST">../listen_0</Redirect></Response>';
      assert.equal(expected, result);
    });
  });
});