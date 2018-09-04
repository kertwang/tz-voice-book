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
      const expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Hello from your pals at Twilio! Have fun.</Say></Response>'
      assert.equal(expected, result);
    });
  });


  describe('/intro_0', () => {
    it('gets the default next message', () => {
      //Arrange
      //Act 
      const result = TwilioRouter.nextMessage(Block.intro_0);

      //Assert
      const expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Gather action="/gather/intro_0" method="POST"/><Say>To learn what is new in your community say SIKILIZA. To record a message that people in your community can hear, say TUMA. To learn more about this service say MSAADA. To hear these options again say KURUDIA.</Say></Response>'
      assert.equal(expected, result);
    });

  });
    

  describe('gather intro_0', function() {
    it.only('handles error case', () => {
      //Arrange
      const gatherResult: GatherResult = {
        speechResult:'the',
        confidence: 40.23,
      };

      //Act
      const result = TwilioRouter.gatherNextMessage(Block.intro_0, gatherResult);
      console.log(format(result));

      //Assert
      const expected = "123";
      assert.equal(expected, result);


    });
  });
});