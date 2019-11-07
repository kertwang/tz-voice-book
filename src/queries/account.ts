import db from '../service/db'

interface AccountModel {
  username: string,
  access_token: string
}

async function getAllAccounts() {
  return db('account')
    .select('*');
}

async function getAccountForUser(username: string): Promise<AccountModel | undefined> {
  return db<AccountModel>('account')
    .where({
      username,
    })
    .select('*')
    .first()
}

export {
  AccountModel,
  getAllAccounts,
  getAccountForUser
};