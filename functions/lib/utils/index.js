"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioTypes_1 = require("../types_rn/TwilioTypes");
const format = require("xml-formatter");
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
function getBotId(maybeBotId) {
    const botId = TwilioTypes_1.BotId[maybeBotId];
    if (!botId) {
        throw new Error(`Could not find botId for ${maybeBotId}`);
    }
    return botId;
}
exports.getBotId = getBotId;
function getDefaultVersionForBot(botId) {
    switch (botId) {
        case TwilioTypes_1.BotId.voicebook: {
            return TwilioTypes_1.VersionId.tz_audio;
        }
        case TwilioTypes_1.BotId.senegalNotification: {
            //TODO: Change this.
            return TwilioTypes_1.VersionId.en_text;
        }
        case TwilioTypes_1.BotId.senegalMobileMoney: {
            //TODO: Change this.
            return TwilioTypes_1.VersionId.en_text;
        }
        //TODO: Add new bots here
        case TwilioTypes_1.BotId.rungweDeposit:
        case TwilioTypes_1.BotId.rungweIntro:
        case TwilioTypes_1.BotId.rungwePaymentDate:
        case TwilioTypes_1.BotId.rungwePaymentNotification: {
            return TwilioTypes_1.VersionId.en_text;
        }
        default: {
            // throw new Error(`No Default version specified for botId: ${botId}`);
            console.log(`WARN: getDefaultVersionForBot(), No Default version specified for botId: ${botId}. Returning en_text`);
            return TwilioTypes_1.VersionId.en_text;
        }
    }
}
exports.getDefaultVersionForBot = getDefaultVersionForBot;
function pathToBlock(path) {
    const sanitized = path.replace(/\/$/, "");
    const key = sanitized.substr(sanitized.lastIndexOf("/") + 1);
    const blockId = TwilioTypes_1.BlockId[key];
    if (!blockId) {
        throw new Error(`Could not find blockId from path: ${path}`);
    }
    return blockId;
}
exports.pathToBlock = pathToBlock;
function logGatherBlock(block, result) {
    if (process.env.VERBOSE_LOG !== 'true') {
        return;
    }
    console.log(`GATHER ${block}: '${result.speechResult}' @ ${result.confidence}%`);
}
exports.logGatherBlock = logGatherBlock;
function logTwilioResponse(xmlString) {
    //TODO: make a cloud function config
    // if (process.env.LOG_TWILIO_RESPONSE !== 'true') {
    //   return;
    // }
    console.log(`TWILIO Response: \n ${format(xmlString)}`);
}
exports.logTwilioResponse = logTwilioResponse;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;
exports.generateUrl = (urlPrefix, path, firebaseToken) => {
    //eg: https://www.googleapis.com/download/storage/v1/b/tz-phone-book.appspot.com/o/tz_audio%2F015a_Voicebook_Swahili.mp3?alt=media&token=1536715274666696
    return `${urlPrefix}${encodeURIComponent(path)}?alt=media&token=${firebaseToken}`;
};
/**
 * Use this to inject pagination where we don't have it set up
 * This is really less than ideal, and we need to find a better way.
 */
exports.saftelyGetPageParamsOrDefaults = (params) => {
    const page = params.page ? parseInt(params.page) : 0;
    let pageSize = params.pageSize ? parseInt(params.pageSize) : 1;
    let maxMessages = params.maxMessages ? parseInt(params.maxMessages) : 10;
    let versionOverride = params.versionOverride ? (params.versionOverride) : null;
    //Also handle shitty twilio url encoded params :(
    if (params['amp;pageSize']) {
        pageSize = parseInt(params['amp;pageSize']);
    }
    if (params['amp;maxMessages']) {
        maxMessages = parseInt(params['amp;maxMessages']);
    }
    //TODO: we need to test this...
    if (params['amp;versionOverride']) {
        versionOverride = params['amp;versionOverride'];
    }
    return {
        page,
        pageSize,
        maxMessages,
        versionOverride,
    };
};
/**
 * saftelyGetDynamicParamsOrEmpty
 *
 * Get the params from the request and format them.
 * Returns an empty array if no params are found
 *
 * @param params the raw params from the request object
 */
exports.saftelyGetDynamicParamsOrEmpty = (params) => {
    let safeParams = [];
    const rawParams = params.dynamicParams;
    if (!rawParams) {
        return safeParams;
    }
    //TD: TODO: this is a security risk!
    try {
        const parsed = JSON.parse(rawParams);
        if (typeof parsed === 'object' && Array.isArray(parsed)) {
            safeParams = parsed;
        }
    }
    catch (err) {
        throw {
            status: 400,
            message: "Couldn't parse the dynamicParams. Ensure it is a valid JSON Array."
        };
    }
    return safeParams;
};
var NextUrlType;
(function (NextUrlType) {
    NextUrlType["PaginatedUrl"] = "PaginatedUrl";
    NextUrlType["DefaultUrl"] = "DefaultUrl";
    NextUrlType["RecordingCallbackUrl"] = "RecordingCallbackUrl";
    NextUrlType["GatherUrl"] = "GatherUrl";
    NextUrlType["PaginatedGatherUrl"] = "PaginatedGatherUrl";
})(NextUrlType = exports.NextUrlType || (exports.NextUrlType = {}));
/**
 * Make a magical paginated url
 */
const buildPaginatedUrl = (b) => {
    const url = `${b.baseUrl}/twiml/${b.botId}/${b.blockName}?page=${b.nextPageNo}\&pageSize=${b.pageSize}\&maxMessages=${b.maxMessages}`;
    if (!b.versionOverride) {
        return url;
    }
    return `${url}\&versionOverride=${b.versionOverride}`;
};
const buildVersionOverrideUrl = (b) => {
    if (!b.versionOverride) {
        return `${b.baseUrl}/twiml/${b.botId}/${b.blockName}`;
    }
    return `${b.baseUrl}/twiml/${b.botId}/${b.blockName}?versionOverride=${b.versionOverride}`;
};
const buildRecordingCallbackUrl = (b) => {
    return `${b.baseUrl}/twiml/${b.botId}/recordingCallback/${b.recordingCallback}`;
};
const buildGatherCallbackUrl = (b) => {
    //eg: `${baseUrl}/twiml/${config.botId}/gather/${blockName}`,
    return `${b.baseUrl}/twiml/${b.botId}/gather/${b.blockName}?versionOverride=${b.versionOverride}`;
};
const buildPaginatedGatherCallbackUrl = (b) => {
    //eg: `${baseUrl}/twiml/${config.botId}/gather/${blockName}`,
    const url = `${b.baseUrl}/twiml/${b.botId}/gather/${b.blockName}?page=${b.nextPageNo}\&pageSize=${b.pageSize}\&maxMessages=${b.maxMessages}`;
    if (!b.versionOverride) {
        return url;
    }
    return `${url}\&versionOverride=${b.versionOverride}`;
};
function buildRedirectUrl(builder) {
    console.log("buildingUrl", builder);
    switch (builder.type) {
        case NextUrlType.PaginatedUrl: return buildPaginatedUrl(builder);
        case NextUrlType.DefaultUrl: return buildVersionOverrideUrl(builder);
        case NextUrlType.RecordingCallbackUrl: return buildRecordingCallbackUrl(builder);
        case NextUrlType.GatherUrl: return buildGatherCallbackUrl(builder);
        case NextUrlType.PaginatedGatherUrl: return buildPaginatedGatherCallbackUrl(builder);
        default: {
            const _exhaustiveMatch = builder;
            throw new Error(`Non-exhausive match for path: ${_exhaustiveMatch}`);
        }
    }
}
exports.buildRedirectUrl = buildRedirectUrl;
function getBoolean(value) {
    switch (value) {
        case true:
        case "true":
        case 1:
        case "1":
        case "on":
        case "yes":
            return true;
        default:
            return false;
    }
}
exports.getBoolean = getBoolean;
function buildExpectedToken(username, password) {
    const encoded = Buffer.from(`${username}:${password}`).toString('base64');
    return `Basic ${encoded}`;
}
exports.buildExpectedToken = buildExpectedToken;
/**
 * Format a mobile string to an international number
 */
function formatMobile(unformatted, country) {
    const parsed = phoneUtil.parse(unformatted, country);
    return `+${parsed.getCountryCode()}${parsed.getNationalNumber()}`;
}
exports.formatMobile = formatMobile;
/**
 * functionReplacer
 *
 * Serialize a function as a JSON String
 */
exports.functionReplacer = (name, val) => {
    if (typeof val === 'function') {
        const entire = val.toString();
        const arg = entire.slice(entire.indexOf("(") + 1, entire.indexOf(")"));
        const body = entire
            .slice(entire.indexOf("{") + 1, entire.lastIndexOf("}"))
            //If we ever have another dynamic message type, this will break.
            .replace(/(type: .*.MessageType.SAY)/g, "type: 'SAY'")
            .replace(/(type: .*.MessageType.PLAY)/g, "type: 'PLAY'");
        return {
            type: 'function',
            arguments: arg,
            body,
        };
    }
    return val;
};
/**
 * functionReviver
 *
 * Deserialize a function from JSON String to actual function
 */
exports.functionReviver = (name, val) => {
    if (typeof val === 'object' && val.type === 'function') {
        console.log("Reviving function, ", val);
        return new Function(val.arguments, val.body);
    }
    return val;
};
//# sourceMappingURL=index.js.map