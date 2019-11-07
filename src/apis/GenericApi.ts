import FirebaseApi, { RelayUser } from "./FirebaseApi";
import { SomeResult, makeError } from "../types_rn/AppProviderTypes";
import { PlayMessage } from "../types_rn/TwilioTypes";


//GenericApi is a temporary subclass to eventually replace FirebaseApi
export default class GenericApi extends FirebaseApi {

  constructor() {
    //Just a dummy!
    super(null)
  }

  public async getRelayUser(botId: string, userId: string): Promise<SomeResult<RelayUser>> {
    return makeError('Not implemented')
  }

  public async getRecordings(limit: number, botId: string): Promise<PlayMessage[]> {
    console.warn("getRecordings not implemented")
    return []
  }



}