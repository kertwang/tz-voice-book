import assert from 'assert'

import UserQueries from './user'
import { unsafeUnwrap } from '../types_rn/AppProviderTypes'

describe('user queries', () => {
  describe('createUsers', () => {
    afterEach(async () => {
      await UserQueries._truncate()
    })

    it('returns the created users when upsert = false', async () => {
      // Arrange
      const user = {
        mobile: '+61555555666',
        name: 'Bobby Bobberton',
        versionId: 'en_au'
      }

      // Act
      const result = unsafeUnwrap(await UserQueries.createUsers([user], false))[0]
      
      // Assert
      delete result.id;
      delete result.createdAt;
      delete result.updatedAt;

      assert.deepStrictEqual(result, user)
    })

    it('returns the created users when upsert = true', async () => {
      // Arrange
      const user = {
        mobile: '+61555555666',
        name: 'Bobby Bobberton',
        versionId: 'en_au'
      }

      // Act
      const result = unsafeUnwrap(await UserQueries.createUsers([user], true))[0]
      
      // Assert
      delete result.id;
      delete result.createdAt;
      delete result.updatedAt;

      assert.deepStrictEqual(result, user)
    })
  })
})