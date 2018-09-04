import * as assert from 'assert';
import TwilioRouter, { Block, GatherResult } from './TwilioRouter';
import * as format from 'xml-formatter';

import {describe} from 'mocha';

const baseUrl = 'http://localhost:5000';

describe('TwilioRouter', function() {

  describe('/entrypoint', () => {
    it('gets the default next message', () => {
      //Arrange
      //Act 
      const result = TwilioRouter.nextMessage(Block.entrypoint);

      //Assert
      const expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Hello, and welcome to voicebook</Say><Redirect method="POST">./intro_0</Redirect></Response>'
      assert.equal(expected, result);
    });
  });


  describe('/intro_0', () => {
    it('gets the default next message', () => {
      //Arrange
      //Act 
      const result = TwilioRouter.nextMessage(Block.intro_0);

      //Assert
      const expected = `<?xml version="1.0" encoding="UTF-8"?><Response><Gather action="./gather/intro_0" method="POST" language="sw-TZ" input="speech" hints="sikiliza,tuma,msaada,kurudia"><Say>To learn what is new in your community say sikiliza. To record a message that people in your community can hear, say tuma. To learn more about this service say msaada. To hear these options again say kurudia.</Say></Gather><Say>We didn't receive any input. Hrrmm.</Say></Response>`;
      assert.equal(expected, result);
    });

  });
    

  describe('gather intro_0', function() {
    it('handles error case', () => {
      //Arrange
      const gatherResult: GatherResult = {
        speechResult:'the',
        confidence: 40.23,
      };

      //Act
      const result = TwilioRouter.gatherNextMessage(Block.intro_0, gatherResult);

      //Assert
      const expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Sorry, something went wrong</Say></Response>';
      assert.equal(expected, result);
    });

    it('handles a success case', () => {
      //Arrange
      const gatherResult: GatherResult = {
        speechResult:'sikiliza',
        confidence: 40.23,
      };

      //Act
      const result = TwilioRouter.gatherNextMessage(Block.intro_0, gatherResult);


      //Assert
      const expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Redirect method="POST">../listen_0</Redirect></Response>';
      assert.equal(expected, result);
    });
  });
});