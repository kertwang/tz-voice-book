import { User, Recording } from "./UserApi";
import { BotId, VersionId, BotConfig, PlayMessage } from "../types_rn/TwilioTypes";
import { DFUser } from "../routes/fn_dialogflow_dep";
import { SomeResult } from "../types_rn/AppProviderTypes";
export declare type RelayUser = {
    callCount: number;
    countryCode: string;
};
export default class FirebaseApi {
    fs: any;
    constructor(fs: any);
    getUser(userId: string, botId: string): Promise<User>;
    createUserForMobile(mobile: string, botId: BotId): Promise<User>;
    /**
     * Get the user from their mobile number.
     * If we don't already have a user for this number, lazy create one
     */
    getUserFromMobile(mobile: string, botId: BotId): Promise<User>;
    getRecordings(limit: number, botId: string): Promise<PlayMessage[]>;
    /**
     * Save a feedback recording
     */
    saveFeedbackRecording(recording: Recording, botId: string): Promise<string>;
    /**
     * Save a reading to the pending collection
     *
     * Returns the id of the pending reading
     */
    savePendingRecording(recording: Recording, botId: string): Promise<string>;
    /**
     * Get all pending recordings for a given callSid, newest first
     */
    getPendingRecordings(callSid: string, limit: number, botId: string): Promise<Recording[]>;
    /**
     * call getPendingRecordings with a number of retries.
     * This is because the callback to save the pending recording sometimes takes
     * too long, and causes the call to die
     */
    getPendingRecordingsWithRetries(botId: string, callSid: string, limit: number, retries: number, timeoutMs?: number): Promise<Recording[]>;
    deletePendingRecordingsForCall(callSid: string): Promise<any>;
    /**
     * Publish a recording for everyone else to listen to.
     * Returns the id of the recording
     */
    postRecording(recording: Recording, botId: string): Promise<string>;
    /**
     * Get the block content for the given call id and user.
     *
     * This will be stored in firebase, parsed, and filled into the context object
     */
    getBotConfig(userId: string, botId: BotId): Promise<BotConfig>;
    /**
     * getBotConfigOverride
     *
     * Get the bot config, but override the user's version. This is useful for testing
     * different versions when the user can't configure the version for themselves
     */
    getBotConfigOverride(userId: string, botId: BotId, versionOverride: VersionId): Promise<BotConfig>;
    getBotConfigForVersion(userId: string, botId: BotId, version: VersionId): Promise<BotConfig>;
    getVersionForUser(userId: string, botId: string, override?: VersionId): Promise<VersionId>;
    deployConfigForBotAndVersion(new_botId: BotId, versionId: VersionId, config: BotConfig): Promise<any>;
    getDFUser(botId: string, sessionId: string): Promise<SomeResult<DFUser>>;
    saveDFUser(botId: string, sessionId: string, user: DFUser): Promise<SomeResult<void>>;
    saveResponse(botId: string, intent: string, response: string): Promise<SomeResult<void>>;
    getResponses(botId: string, intent: string): Promise<SomeResult<string[]>>;
    getRelayUser(botId: string, userId: string): Promise<SomeResult<RelayUser>>;
}
