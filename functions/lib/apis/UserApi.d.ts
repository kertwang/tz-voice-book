import FirebaseApi from "./FirebaseApi";
import { VersionId, BotId } from '../types_rn/TwilioTypes';
/**
 * UserApi is the api we use to keep a track of users based
 * on their phone number and interactions
 */
export declare type User = {
    mobile: string;
    name: string;
    id: string;
    version: VersionId;
};
export declare type Recording = {
    url: string;
    createdAt: string;
    callSid: string;
};
export default class UserApi {
    private fb;
    private user;
    static fromMobileNumber(fb: FirebaseApi, botId: BotId, mobile: string): Promise<UserApi>;
    getUser(): User;
}
