import db from "../service/db";
import { SomeResult, makeError, makeSuccess, unsafeUnwrap } from "../types_rn/AppProviderTypes";
import { knexSnakeCaseMappers } from 'objection'


const table = 'vb_user'
const mappers = knexSnakeCaseMappers()

// A block is a represenation of a single component of an IVR message

/* remember: this is in the `model` domain, not application domain */
export interface IUser {
  mobile: string
  name: string
  versionId: string,

  id?: string
  createdAt?: Date,
  updatedAt?: Date
}

async function getAll(): Promise<SomeResult<Array<IUser>>> {
  return db<IUser>(table)
    .select('*')
    .then(r => makeSuccess(r))
    .catch(err => makeError<Array<IUser>>(err))
}

async function getForId(id: string): Promise<SomeResult<IUser>> {
  return db<IUser>(table)
    .where({
      id
    })
    .select('*')
    .then(users => {
      if (users.length === 0) {
        throw new Error(`Could not find user for id: ${id}`)
      }

      //We can assume there won't be more than 1 bot thanks to the database
      return makeSuccess(users[0])
    })
    .catch(err => makeError<IUser>(err))
}

async function _getForMobileList(mobile: string): Promise<Array<IUser>> {
  return db<IUser>(table)
    .where({
      mobile
    })
    .select('*')
}

async function getForMobile(mobile: string): Promise<SomeResult<IUser>> {
  return _getForMobileList(mobile)
    .then(users => {
      if (users.length === 0) {
        throw new Error(`Could not find user for mobile: ${mobile}`)
      }

      //We can assume there won't be more than 1 bot thanks to the database
      return makeSuccess(users[0])
    })
    .catch(err => makeError<IUser>(err))
}

async function getOrCreateForMobile(mobile: string, defaults: {name: string, versionId: string}): Promise<SomeResult<IUser>> {
  // return _getForMobileList(mobile)
  // .then(result => {
  //   if (result.length > 0) {
  //     return makeSuccess(result[0])
  //   }

  //   //Fallback to create

  // })
  // .catch(err => makeError(err))
  try {
    const users = await _getForMobileList(mobile)
    if (users.length > 0) {
      return makeSuccess(users[0])
    }

    const defaultUser: IUser = {
      mobile,
      ...defaults
    }
    const createdUsers = unsafeUnwrap(await createUsers([defaultUser], false))
    const user = createdUsers[0]

    return makeSuccess(user)
  } catch (err) {
    return makeError(err)
  }
}

async function createUsers(users: Array<IUser>, upsert: boolean): Promise<SomeResult<Array<IUser>>> {
  if (!upsert) {
    return db(table)
      .insert(users)
      .returning('*')
      .then((createdIds: Array<IUser>) => makeSuccess<Array<IUser>>(createdIds))
      .catch(err => makeError<Array<IUser>>(err))
  } 

  const insert = db(table)
    .insert(users)
    .toString()

  const query = `
   ${insert}
    ON CONFLICT ("mobile") DO UPDATE
    SET 
      mobile = excluded.mobile, 
      name = excluded.name
    RETURNING *
  `

  return db.raw(query)
    .then((result: any) => {
      const processedRows: Array<IUser> = mappers.postProcessResponse(result.rows)
      return makeSuccess<Array<IUser>>(processedRows)
    })
    .catch(err => makeError<Array<IUser>>(err))
}


async function deleteUser(id: string) {
  return db(table)
    .where({ id })
    .delete()
}

/* FOR TESTING ONLY */
async function _truncate() {
  return db.raw('TRUNCATE TABLE vb_user')
}

export default {
  getAll,
  getForId,
  getForMobile,
  getOrCreateForMobile,
  createUsers,
  deleteUser,
  _truncate,
}