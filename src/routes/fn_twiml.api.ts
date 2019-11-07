import assert from 'assert'

import VBAdminClient, { PostBotRequest } from "../admin/VBAdminClient"
import { unsafeUnwrap } from '../types_rn/AppProviderTypes'


/* 
  Api tests test the end to end running of the api
  They assume that the api is already up and running somewhere
*/ 

describe('TwimlApi', () => {
  describe('POST /:botId/*', () => {
    it('gets the twiml response', async () => {
      // Arrange
      const postBotRequest: PostBotRequest = {
        botId: 'senegalMobileMoney',
        blockId: 'entrypoint',
        body: {
          From: '+1655111222',
          To: '+1655111222',
          Direction: 'outbound',
        },
        versionOverride: 'wl_audio'
      }
      //Example response
      const expected = `<?xml version="1.0" encoding="UTF-8"?><Response><Play>https://www.googleapis.com/download/storage/v1/b/tz-phone-book-dev.appspot.com/o/wl_audio%2FW1.mp3?alt=media&amp;token=1536715274666696</Play><Redirect method="POST">http://localhost:3000/twiml/senegalMobileMoney/entrypoint_option?versionOverride=wl_audio</Redirect></Response>`
    
      // Act
      const response = unsafeUnwrap(await VBAdminClient.postTwiml(postBotRequest))
      
      // Assert
      assert.deepStrictEqual(response, expected)
    })
  })

})