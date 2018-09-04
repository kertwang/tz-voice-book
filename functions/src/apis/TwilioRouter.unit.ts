import * as assert from 'assert';
import TwilioRouter from './TwilioRouter';

import {describe} from 'mocha';

const baseUrl = 'http://localhost:5000';

describe('TwilioRouter', function() {

  describe('/entrypoint', () => {
    it('gets the default next message', () => {
      //Arrange
      //Act 
      const result = TwilioRouter.nextMessage(baseUrl,'entrypoint');

      //Assert
      const expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Hello from your pals at Twilio! Have fun.</Say></Response>'
      assert.equal(expected, result);
    });
  });
});