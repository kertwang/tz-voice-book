import { SomeResult, ResultType, makeSuccess } from "../types_rn/AppProviderTypes";
import { User } from "../apis/UserApi";
import UserQuotes from '../queries/user';
import Bot from "./Bot";
import { VersionId } from "../types_rn/TwilioTypes";
import { as, exists } from "../utils";


async function getOrCreateUserForMobile(mobile: string, botId: string): Promise<SomeResult<User>> {
  const botResult = await Bot.getBotForId(botId)
  if (botResult.type === ResultType.ERROR) {
    return botResult
  }
  const bot = botResult.result;

  const userResult = await UserQuotes.getOrCreateForMobile(mobile, { name: 'unknown', versionId: bot.defaultVersionId })
  if (userResult.type === ResultType.ERROR) {
    return userResult
  }

  const iuser = userResult.result;
  const user: User = {
    id: exists<string>(iuser.id),
    mobile: iuser.mobile,
    name: iuser.name,
    version: as<string, VersionId>(iuser.versionId),
  }

  return makeSuccess(user);
}

export default {
  getOrCreateUserForMobile
}