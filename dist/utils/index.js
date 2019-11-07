"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var TwilioTypes_1 = require("../types_rn/TwilioTypes");
var Env = __importStar(require("../utils/Env"));
//@ts-ignore
var xml_formatter_1 = __importDefault(require("xml-formatter"));
var util_1 = require("util");
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
function getBotId(maybeBotId) {
    //TODO: should we verify the botId exists here?
    return maybeBotId;
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
            console.log("WARN: getDefaultVersionForBot(), No Default version specified for botId: " + botId + ". Returning en_text");
            return TwilioTypes_1.VersionId.en_text;
        }
    }
}
exports.getDefaultVersionForBot = getDefaultVersionForBot;
function pathToBlock(path) {
    var sanitized = path.replace(/\/$/, "");
    var key = sanitized.substr(sanitized.lastIndexOf("/") + 1);
    return key;
}
exports.pathToBlock = pathToBlock;
function logGatherBlock(block, result) {
    if (process.env.VERBOSE_LOG !== 'true') {
        return;
    }
    console.log("GATHER " + block + ": '" + result.speechResult + "' @ " + result.confidence + "%");
}
exports.logGatherBlock = logGatherBlock;
function logTwilioResponse(xmlString) {
    if (!Env.shouldLogTwilioResponse) {
        return;
    }
    console.log("TWILIO Response: \n " + xml_formatter_1["default"](xmlString));
}
exports.logTwilioResponse = logTwilioResponse;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
exports.generateUrl = function (urlPrefix, path, firebaseToken) {
    //eg: https://www.googleapis.com/download/storage/v1/b/tz-phone-book.appspot.com/o/tz_audio%2F015a_Voicebook_Swahili.mp3?alt=media&token=1536715274666696
    return "" + urlPrefix + encodeURIComponent(path) + "?alt=media&token=" + firebaseToken;
};
/**
 * Use this to inject pagination where we don't have it set up
 * This is really less than ideal, and we need to find a better way.
 */
exports.saftelyGetPageParamsOrDefaults = function (params) {
    var page = params.page ? parseInt(params.page) : 1;
    var pageSize = params.pageSize ? parseInt(params.pageSize) : 1;
    var maxMessages = params.maxMessages ? parseInt(params.maxMessages) : 3;
    var versionOverride = params.versionOverride;
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
        page: page,
        pageSize: pageSize,
        maxMessages: maxMessages,
        versionOverride: versionOverride
    };
};
/**
 * Get the user's mobile from the twilio request object
 *
 * Throws if the necessary params aren't found
 */
exports.getUserMobile = function (body) {
    //TODO: replace with Joi Validation
    var from = body.From;
    var to = body.To;
    var direction = body.Direction;
    if (!from || !to || !direction) {
        throw new Error("Invalid Twilio request body. from, to and direction is required");
    }
    if (direction === 'outbound-api') {
        return to;
    }
    return from;
};
/**
 * saftelyGetDynamicParamsOrEmpty
 *
 * Get the params from the request and format them.
 * Returns an empty array if no params are found
 *
 * @param params the raw params from the request object
 */
exports.saftelyGetDynamicParamsOrEmpty = function (params) {
    var safeParams = [];
    var rawParams = params.dynamicParams;
    if (!rawParams) {
        return safeParams;
    }
    //TD: TODO: this is a security risk!
    try {
        var parsed = JSON.parse(rawParams);
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
var buildPaginatedUrl = function (b) {
    var url = b.baseUrl + "/twiml/" + b.botId + "/" + b.blockName + "?page=" + b.nextPageNo + "&pageSize=" + b.pageSize + "&maxMessages=" + b.maxMessages;
    if (!b.versionOverride) {
        return url;
    }
    return url + "&versionOverride=" + b.versionOverride;
};
var buildVersionOverrideUrl = function (b) {
    if (!b.versionOverride) {
        return b.baseUrl + "/twiml/" + b.botId + "/" + b.blockName;
    }
    return b.baseUrl + "/twiml/" + b.botId + "/" + b.blockName + "?versionOverride=" + b.versionOverride;
};
var buildRecordingCallbackUrl = function (b) {
    //eg. https://us-central1-tz-phone-book.cloudfunctions.net/twiml/voicebook/recordingCallback/message
    return "" + b.baseUrl + b.recordingCallback;
};
var buildGatherCallbackUrl = function (b) {
    //eg: `${baseUrl}/twiml/${config.botId}/gather/${blockName}`,
    var url = b.baseUrl + "/twiml/" + b.botId + "/gather/" + b.blockName;
    if (!util_1.isNullOrUndefined(b.versionOverride)) {
        url += "?versionOverride=" + b.versionOverride;
    }
    return url;
};
var buildPaginatedGatherCallbackUrl = function (b) {
    //eg: `${baseUrl}/twiml/${config.botId}/gather/${blockName}`,
    var url = b.baseUrl + "/twiml/" + b.botId + "/gather/" + b.blockName + "?page=" + b.nextPageNo + "&pageSize=" + b.pageSize + "&maxMessages=" + b.maxMessages;
    if (!b.versionOverride) {
        return url;
    }
    return url + "&versionOverride=" + b.versionOverride;
};
function buildRedirectUrl(builder) {
    switch (builder.type) {
        case NextUrlType.PaginatedUrl: return buildPaginatedUrl(builder);
        case NextUrlType.DefaultUrl: return buildVersionOverrideUrl(builder);
        case NextUrlType.RecordingCallbackUrl: return buildRecordingCallbackUrl(builder);
        case NextUrlType.GatherUrl: return buildGatherCallbackUrl(builder);
        case NextUrlType.PaginatedGatherUrl: return buildPaginatedGatherCallbackUrl(builder);
        default: {
            var _exhaustiveMatch = builder;
            throw new Error("Non-exhausive match for path: " + _exhaustiveMatch);
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
    var encoded = Buffer.from(username + ":" + password).toString('base64');
    return "Basic " + encoded;
}
exports.buildExpectedToken = buildExpectedToken;
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
function formatMobile(unformatted, country) {
    var parsed = phoneUtil.parse(unformatted, country);
    return "+" + parsed.getCountryCode() + parsed.getNationalNumber();
}
exports.formatMobile = formatMobile;
/**
 * functionReplacer
 *
 * Serialize a function as a JSON String
 */
exports.functionReplacer = function (name, val) {
    if (typeof val === 'function') {
        var entire = val.toString();
        var arg = entire.slice(entire.indexOf("(") + 1, entire.indexOf(")"));
        var body = entire
            .slice(entire.indexOf("{") + 1, entire.lastIndexOf("}"))
            //If we ever have another dynamic message type, this will break.
            .replace(/(type: .*.MessageType.SAY)/g, "type: 'SAY'")
            .replace(/(type: .*.MessageType.PLAY)/g, "type: 'PLAY'");
        return {
            type: 'function',
            arguments: arg,
            body: body
        };
    }
    return val;
};
/**
 * functionReviver
 *
 * Deserialize a function from JSON String to actual function
 */
exports.functionReviver = function (name, val) {
    if (typeof val === 'object' && val.type === 'function') {
        return new Function(val.arguments, val.body);
    }
    return val;
};
/* Array Utils */
exports.sum = function (a, b) { return a + b; };
exports.unique = function (array) {
    var obj = {};
    array.forEach(function (v) { return obj[v] = true; });
    return Object.keys(obj);
};
/* Dict Utils */
/**
 * @function getFieldsIfExist
 * @description Get an object with only the given fields
 *
 * @param
 * @param
 */
exports.getFieldsIfExist = function (input, fields) {
    var finalObj = {};
    fields.forEach(function (field) {
        var value = input[field];
        if (value) {
            finalObj[field] = value;
        }
        else {
            finalObj[field] = null;
        }
    });
    return finalObj;
};
//TODO: move to ts utils
function exists(thing) {
    if (!thing) {
        throw new Error("Expected " + thing + " to exist.");
    }
    return thing;
}
exports.exists = exists;
function as(genericBlockId) {
    // @ts-ignore
    return genericBlockId;
}
exports.as = as;
