import * as assert from 'assert';
import TwilioRouter from './TwilioRouter';

import {describe} from 'mocha';

const baseUrl = 'http://localhost:5000';

describe('TwilioRouter', function() {

  describe('/entrypoint', () => {
    it('gets the default next message', () => {
      //Arrange
      //Act 
      const result = TwilioRouter.nextMessage('entrypoint');

      //Assert
      const expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Hello from your pals at Twilio! Have fun.</Say></Response>'
      assert.equal(expected, result);
    });
  });


  describe('/intro_0', () => {
    it('gets the default next message', () => {
      //Arrange
      //Act 
      const result = TwilioRouter.nextMessage('intro_0');

      //Assert
      const expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Gather action="/gather/intro_0" method="POST"/><Say>To learn what is new in your community say SIKILIZA. To record a message that people in your community can hear, say TUMA. To learn more about this service say MSAADA. To hear these options again say KURUDIA.</Say></Response>'
      assert.equal(expected, result);
    });

  });
    
});