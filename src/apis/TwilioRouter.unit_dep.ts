import assert from 'assert';
import TwilioRouter from './TwilioRouter';

import {describe} from 'mocha';
import { CallContext, DigitResult, BlockId } from '../types_rn/TwilioTypes';
//@ts-ignore
import format from 'xml-formatter';

import configs  from '../admin/content/voicebook/index';
const botConfig = configs.en_us;

const cleanXML = (xml: string): string => {
  return xml.replace(/<Play>(.*?)<\/Play>/g, "<Play></Play>");
}

const ctx: CallContext = {
  callSid: '12345',
  mobile: '+61410233233',
  toMobile: '+61410233233',
  userId: 'user_12345',
  versionOverride: null,
  dynamicParams: [],
  page: 1,
  pageSize: 1,
  maxMessages: 3,
  enableDemoMessages: false,
};

describe('TwilioRouter', function() {

  describe('/entrypoint', () => {
    it('gets the default next message', async () => {
      //Arrange
      //Act 
      const result = await TwilioRouter.nextMessage(ctx, botConfig, BlockId.entrypoint);

      //Assert
      const expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Say language="en-US">Hello, and welcome to voicebook</Say><Redirect method="POST">https://us-central1-tz-phone-book.cloudfunctions.net/twiml/voicebook/intro_0</Redirect></Response>'
      assert.strictEqual(result, expected);
    });
  });


  describe.skip('/intro_0', () => {
    it('gets the default next message', async () => {
      //Arrange
      //Act 
      const result = await TwilioRouter.nextMessage(ctx, botConfig, BlockId.intro_0);

      //Assert
      const expected = `<?xml version="1.0" encoding="UTF-8"?><Response><Gather action="./gather/intro_0" method="POST" language="sw-TZ" input="speech" hints="sikiliza,tuma,msaada,kurudia"><Say>To learn what is new in your community say sikiliza. To record a message that people in your community can hear, say tuma. To learn more about this service say msaada. To hear these options again say kurudia.</Say></Gather><Say>We didn't receive any input. Hrrmm.</Say></Response>`;

      assert.strictEqual(format(result), format(expected));
    });

  });
    

  describe('Handles User Input', function() {
    this.timeout(5000);

    it('handles error case', async () => {
      //Arrange
      const gatherResult: DigitResult = {
        digits: '10',
      };

      //Act
      const result = await TwilioRouter.gatherNextMessage(ctx, botConfig, BlockId.intro_0, gatherResult);

      //Assert
      //If no digit match, default to first option
      const expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Redirect method="POST">https://us-central1-tz-phone-book.cloudfunctions.net/twiml/voicebook/listen_0</Redirect></Response>';
      assert.strictEqual(expected, result);
    });

    it('handles a success case', async () => {
      //Arrange
      const gatherResult: DigitResult = {
        digits: '1',
      };

      //Act
      const result = await TwilioRouter.gatherNextMessage(ctx, botConfig, BlockId.intro_0, gatherResult);


      //Assert
      const expected = '<?xml version="1.0" encoding="UTF-8"?><Response><Redirect method="POST">https://us-central1-tz-phone-book.cloudfunctions.net/twiml/voicebook/listen_0</Redirect></Response>';
      assert.strictEqual(expected, result);
    });
    
    it('gets the listen_playback block', async () => {
      //Arrange  
      const expected = cleanXML(`<?xml version="1.0" encoding="UTF-8"?><Response><Gather action="https://us-central1-tz-phone-book.cloudfunctions.net/twiml/voicebook/gather/listen_playback?page=1&amp;pageSize=1&amp;maxMessages=3" method="POST" input="dtmf" numDigits="1"><Play>123123asdafas</Play></Gather><Redirect method="POST">https://us-central1-tz-phone-book.cloudfunctions.net/twiml/voicebook/listen_end?page=2&amp;pageSize=1&amp;maxMessages=3</Redirect></Response>`);

      //Act
      const result = await TwilioRouter.nextMessage(ctx, botConfig, BlockId.listen_playback);

      //Assert
      assert.strictEqual(format(cleanXML(result)), format(expected));
    });

    it('skips a message correctly', async () => {
      //Arrange  
      const expected = `<?xml version="1.0" encoding="UTF-8"?><Response><Redirect method="POST">https://us-central1-tz-phone-book.cloudfunctions.net/twiml/voicebook/listen_playback?page=2&amp;pageSize=1&amp;maxMessages=3</Redirect></Response>`;

      //Act
      const result = await TwilioRouter.gatherNextMessage(ctx, botConfig, BlockId.listen_playback, { digits: "1"});

      //Assert
      assert.strictEqual(format(result), format(expected));
    });

    it('repeats a message correctly', async () => {
      //Arrange  
      const expected = `<?xml version="1.0" encoding="UTF-8"?><Response><Redirect method="POST">https://us-central1-tz-phone-book.cloudfunctions.net/twiml/voicebook/listen_playback?page=1&amp;pageSize=1&amp;maxMessages=3</Redirect></Response>`;

      //Act
      const result = await TwilioRouter.gatherNextMessage(ctx, botConfig, BlockId.listen_playback, { digits: "2"});

      //Assert
      assert.strictEqual(format(result), format(expected));
    });

  });
});