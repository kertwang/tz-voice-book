import FirebaseApi, { RelayUser } from "./FirebaseApi";
import { SomeResult } from "../types_rn/AppProviderTypes";
import { PlayMessage } from "../types_rn/TwilioTypes";
export default class GenericApi extends FirebaseApi {
    constructor();
    getRelayUser(botId: string, userId: string): Promise<SomeResult<RelayUser>>;
    getRecordings(limit: number, botId: string): Promise<PlayMessage[]>;
}
