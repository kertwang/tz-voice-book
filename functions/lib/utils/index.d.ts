import { BlockId, GatherResult, PageParams, BotId, VersionId } from "../types_rn/TwilioTypes";
export declare function getBotId(maybeBotId: string): BotId;
export declare function getDefaultVersionForBot(botId: BotId): VersionId;
export declare function pathToBlock(path: string): BlockId;
export declare function logGatherBlock(block: any, result: GatherResult): void;
export declare function logTwilioResponse(xmlString: string): void;
export declare function sleep(ms: any): Promise<{}>;
export declare const generateUrl: (urlPrefix: string, path: string, firebaseToken: string) => string;
/**
 * Use this to inject pagination where we don't have it set up
 * This is really less than ideal, and we need to find a better way.
 */
export declare const saftelyGetPageParamsOrDefaults: (params: any) => PageParams;
/**
 * Get the user's mobile from the twilio request object
 *
 * Throws if the necessary params aren't found
 */
export declare const getUserMobile: (body: any) => string;
/**
 * saftelyGetDynamicParamsOrEmpty
 *
 * Get the params from the request and format them.
 * Returns an empty array if no params are found
 *
 * @param params the raw params from the request object
 */
export declare const saftelyGetDynamicParamsOrEmpty: (params: any) => string[];
export declare enum NextUrlType {
    PaginatedUrl = "PaginatedUrl",
    DefaultUrl = "DefaultUrl",
    RecordingCallbackUrl = "RecordingCallbackUrl",
    GatherUrl = "GatherUrl",
    PaginatedGatherUrl = "PaginatedGatherUrl"
}
export declare type NextUrlBuilder = PaginatedUrlBuilder | DefaultUrlBuilder | RecordingCallbackUrlBuilder | GatherUrlBuilder | PaginatedGatherUrlBuilder;
export declare type PaginatedUrlBuilder = {
    type: NextUrlType.PaginatedUrl;
    baseUrl: string;
    botId: BotId;
    blockName: BlockId;
    nextPageNo: number;
    pageSize: number;
    maxMessages: number;
    versionOverride: VersionId | null;
};
export declare type DefaultUrlBuilder = {
    type: NextUrlType.DefaultUrl;
    baseUrl: string;
    botId: BotId;
    blockName: BlockId;
    versionOverride: VersionId | null;
};
export declare type RecordingCallbackUrlBuilder = {
    type: NextUrlType.RecordingCallbackUrl;
    baseUrl: string;
    botId: BotId;
    recordingCallback: string;
};
export declare type GatherUrlBuilder = {
    type: NextUrlType.GatherUrl;
    baseUrl: string;
    botId: BotId;
    blockName: BlockId;
    versionOverride: VersionId | null;
};
export declare type PaginatedGatherUrlBuilder = {
    type: NextUrlType.PaginatedGatherUrl;
    baseUrl: string;
    botId: BotId;
    blockName: BlockId;
    nextPageNo: number;
    pageSize: number;
    maxMessages: number;
    versionOverride: VersionId | null;
};
export declare function buildRedirectUrl(builder: NextUrlBuilder): string;
export declare function getBoolean(value: any): boolean;
export declare function buildExpectedToken(username: string, password: string): string;
/**
 * Format a mobile string to an international number
 *
 * If the number starts with a '+', the formatter will figure out
 * the country code, and will return the international format of the number.
 *
 * If the number is international, but doesn't start with a '+'
 * (for example 16501111234 instead of +16501111234), the country will default
 * to the given country.
 *
 */
export declare function formatMobile(unformatted: string, country: string): string;
/**
 * functionReplacer
 *
 * Serialize a function as a JSON String
 */
export declare const functionReplacer: (name: any, val: any) => any;
/**
 * functionReviver
 *
 * Deserialize a function from JSON String to actual function
 */
export declare const functionReviver: (name: any, val: any) => any;
