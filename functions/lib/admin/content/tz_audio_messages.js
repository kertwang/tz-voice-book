"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioTypes_1 = require("../../types_rn/TwilioTypes");
const utils_1 = require("../../utils");
const urlPrefix = 'https://www.googleapis.com/download/storage/v1/b/tz-phone-book.appspot.com/o/';
const firebaseToken = '1536715274666696'; //This isn't too precious, our files are public anyway
/* the deploy script will automatically fill in the urls for us */
const en_text = {
    'entrypoint': [
        { type: TwilioTypes_1.MessageType.SAY, text: "Hello, and welcome to voicebook", language: 'en-US' },
    ],
    'intro_0': [
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/001a_Voicebook_Swahili_v2.mp3', firebaseToken) },
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/001b_Voicebook_Swahili_v2.mp3', firebaseToken) },
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/001c_Voicebook_Swahili_v2.mp3', firebaseToken) },
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/001d_Voicebook_Swahili_v2.mp3', firebaseToken) },
    ],
    'info_0': [
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/030_Voicebook_Swahili.mp3', firebaseToken) },
    ],
    'error_0': [
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/051_Voicebook_Swahili.mp3', firebaseToken) },
    ],
    'listen_0': [
        // 020_Voicebook_Swahili.mp3 
        //or
        // 020_Voicebook_Swahili_020.mp3 ?
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/020_Voicebook_Swahili.mp3', firebaseToken) },
    ],
    'listen_playback': [
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/041_Voicebook_Swahili.mp3', firebaseToken) },
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/042_Voicebook_Swahili.mp3', firebaseToken) },
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/043_Voicebook_Swahili.mp3', firebaseToken) },
    ],
    'listen_end': [
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/021_Voicebook_Swahili_v2.mp3', firebaseToken) },
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/021a_Voicebook_Swahili_v2.mp3', firebaseToken) },
    ],
    'listen_end_error': [
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/051_Voicebook_Swahili.mp3', firebaseToken) },
    ],
    'listen_feedback': [
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/060_Voicebook_Swahili.mp3', firebaseToken) },
    ],
    'listen_feedback_complete': [
        //No audio yet!
        { type: TwilioTypes_1.MessageType.SAY, text: 'Thanks! Your feedback has been recorded.', language: 'en-US' },
    ],
    'record_0': [
        //Need to find elsewhere!
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/012a_Voicebook_Swahili.mp3', firebaseToken) },
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/012b_Voicebook_Swahili.mp3', firebaseToken) },
    ],
    'record_playback': [
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/013a_Voicebook_Swahili.mp3', firebaseToken) },
    ],
    'record_post_or_delete': [
        //'To post your message, say tuma.To cancel and start over, say anza tena'
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/013b_Voicebook_Swahili_v2.mp3', firebaseToken) },
    ],
    'record_post_or_delete_error': [
        //tz_audio%2F051_Voicebook_Swahili.mp3?generation=1536715288239686&alt=media
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/051_Voicebook_Swahili.mp3', firebaseToken) },
    ],
    'record_save': [
        //TODO: download audio?
        //'Thanks! Your message will be posted'
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/014_Voicebook_Swahili.mp3', firebaseToken) },
    ],
    'record_delete': [
        //'Your message was erased and will not be posted.'
        { type: TwilioTypes_1.MessageType.PLAY, url: utils_1.generateUrl(urlPrefix, 'tz_audio/015a_Voicebook_Swahili.mp3', firebaseToken) },
    ],
};
exports.default = en_text;
//# sourceMappingURL=tz_audio_messages.js.map