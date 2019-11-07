import  {describe} from 'mocha';
import assert from 'assert';
import { formatMobile, PaginatedUrlBuilder, NextUrlType, buildRedirectUrl, DefaultUrlBuilder, RecordingCallbackUrlBuilder, GatherUrlBuilder, PaginatedGatherUrlBuilder, logTwilioResponse, pathToBlock, } from '.';
import { BotId, BlockId, VersionId } from '../types_rn/TwilioTypes';

const baseUrl = "https://us-central1-tz-phone-book-dev.cloudfunctions.net";

describe('Utils Tests', function() {

  describe('pathToBlock', () => {
    it('gets the path to a block', () => {
      // Arrange
      const input = `${baseUrl}/twiml/voicebook/listen_0`
      
      // Act
      const result = pathToBlock(input)
      
      // Assert
      assert.equal(result, 'listen_0')
    })
  })
  
  describe('logTwilioResponse', function() {
    it('prints the xml string correctly', () => {
      const input = `<div><h1>Hello world</h1></div>`
      logTwilioResponse(input);
    });
  });

  describe("buildRedirectUrl()", function () {
    it('builds a paginated redirect url', () => {
      //Arrange
      const builder: PaginatedUrlBuilder = {
        type: NextUrlType.PaginatedUrl,
        baseUrl,
        botId: BotId.voicebook,
        blockName: BlockId.listen_0,
        nextPageNo: 0,
        pageSize: 1,
        maxMessages: 3,
        versionOverride: null,
      };
      const expected = `${baseUrl}/twiml/voicebook/listen_0?page=0&pageSize=1&maxMessages=3`

      //Act
      const result = buildRedirectUrl(builder);

      //Assert
      assert.strictEqual(result, expected);
    });

    it('builds a paginated redirect url with version override', () => {
      //Arrange
      const builder: PaginatedUrlBuilder = {
        type: NextUrlType.PaginatedUrl,
        baseUrl,
        botId: BotId.voicebook,
        blockName: BlockId.listen_0,
        nextPageNo: 0,
        pageSize: 1,
        maxMessages: 3,
        versionOverride: VersionId.en_au,
      };
      const expected = `${baseUrl}/twiml/voicebook/listen_0?page=0&pageSize=1&maxMessages=3&versionOverride=en_au`;

      //Act
      const result = buildRedirectUrl(builder);

      //Assert
      assert.strictEqual(result, expected);
    });


    it('builds the default url', () => {
      //Arrange
      const builder: DefaultUrlBuilder = {
        type: NextUrlType.DefaultUrl,
        baseUrl,
        botId: BotId.voicebook,
        blockName: BlockId.listen_0,
        versionOverride: null,
      };
      const expected = `${baseUrl}/twiml/voicebook/listen_0`;

      //Act
      const result = buildRedirectUrl(builder);

      //Assert
      assert.strictEqual(result, expected);
    });

    it('builds the default url with version override', () => {
      //Arrange
      const builder: DefaultUrlBuilder = {
        type: NextUrlType.DefaultUrl,
        baseUrl,
        botId: BotId.voicebook,
        blockName: BlockId.listen_0,
        versionOverride: VersionId.en_au,
      };
      const expected = `${baseUrl}/twiml/voicebook/listen_0?versionOverride=en_au`;

      //Act
      const result = buildRedirectUrl(builder);

      //Assert
      assert.strictEqual(result, expected);
    });

    it('builds the recording callback url', () => {
      //Arrange
      const builder: RecordingCallbackUrlBuilder = {
        type: NextUrlType.RecordingCallbackUrl,
        baseUrl,
        botId: BotId.voicebook,
        recordingCallback: "/twiml/voicebook/recordingCallback/message",
      };
      const expected = `${baseUrl}/twiml/voicebook/recordingCallback/message`;

      //Act
      const result = buildRedirectUrl(builder);

      //Assert
      assert.strictEqual(result, expected);
    });


    it('builds the gather url', () => {
      //Arrange
      const builder: GatherUrlBuilder = {
        type: NextUrlType.GatherUrl,
        baseUrl,
        botId: BotId.voicebook,
        blockName: BlockId.listen_0,
        versionOverride: null,
      };
      const expected = `${baseUrl}/twiml/voicebook/gather/listen_0`;

      //Act
      const result = buildRedirectUrl(builder);

      //Assert
      assert.strictEqual(result, expected);
    });

    it('builds the gather url with version override', () => {
      //Arrange
      const builder: GatherUrlBuilder = {
        type: NextUrlType.GatherUrl,
        baseUrl,
        botId: BotId.voicebook,
        blockName: BlockId.listen_0,
        versionOverride: VersionId.en_au,
      };
      const expected = `${baseUrl}/twiml/voicebook/gather/listen_0?versionOverride=en_au`;

      //Act
      const result = buildRedirectUrl(builder);

      //Assert
      assert.strictEqual(result, expected);
    });

    it('builds the paginated gather url', () => {
      //Arrange
      const builder: PaginatedGatherUrlBuilder = {
        type: NextUrlType.PaginatedGatherUrl,
        baseUrl,
        botId: BotId.voicebook,
        blockName: BlockId.listen_0,
        nextPageNo: 0,
        pageSize: 1,
        maxMessages: 3,
        versionOverride: null,
      };
      const expected = `${baseUrl}/twiml/voicebook/gather/listen_0?page=0&pageSize=1&maxMessages=3`;

      //Act
      const result = buildRedirectUrl(builder);

      //Assert
      assert.strictEqual(result, expected);
    });

    it('builds the paginated gather url with version override', () => {
      //Arrange
      const builder: PaginatedGatherUrlBuilder = {
        type: NextUrlType.PaginatedGatherUrl,
        baseUrl,
        botId: BotId.voicebook,
        blockName: BlockId.listen_0,
        nextPageNo: 0,
        pageSize: 1,
        maxMessages: 3,
        versionOverride: VersionId.en_au,
      };
      const expected = `${baseUrl}/twiml/voicebook/gather/listen_0?page=0&pageSize=1&maxMessages=3&versionOverride=en_au`;

      //Act
      const result = buildRedirectUrl(builder);

      //Assert
      assert.strictEqual(result, expected);
    });
  });
  
  describe('formatMobile()', function() {
    it('Doesn\'t format an existing international number', () => {
      //Arrange
      const unformatted = "+639566512295";
      const country = "TZ";

      //Act
      const formatted = formatMobile(unformatted, country);

      //Assert
      assert.strictEqual(unformatted, formatted);
    });

    it('Formats a local number correctly', () => {
      //Arrange
      const unformatted = "9566512295";
      const country = "TZ";

      //Act
      const formatted = formatMobile(unformatted, country);

      //Assert
      assert.strictEqual('+2559566512295', formatted);
    });
    
    it('Formats an international number without + correctly', () => {
      //Arrange
      const unformatted = "16501111234";
      const country = "TZ";

      //Act
      const formatted = formatMobile(unformatted, country);

      //Assert
      assert.strictEqual('+25516501111234', formatted);
    });

  });
});