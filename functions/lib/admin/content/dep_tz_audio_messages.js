"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioTypes_1 = require("../../types_rn/TwilioTypes");
const urlPrefix = 'https://www.googleapis.com/download/storage/v1/b/tz-phone-book.appspot.com/o/';
/* Define each translation/variaton here */
/* TODO: we will move these to firebase datastore eventually */
const en_text = {
    'entrypoint': [
        { type: TwilioTypes_1.MessageType.SAY, text: "Hello, and welcome to voicebook", language: 'en-US' },
    ],
    'intro_0': [
        { type: TwilioTypes_1.MessageType.PLAY, url: `${urlPrefix}tz_audio%2F001a_Voicebook_Swahili_v2.mp3?generation=1536715274666696&alt=media` },
        { type: TwilioTypes_1.MessageType.PLAY, url: `${urlPrefix}tz_audio%2F001b_Voicebook_Swahili_v2.mp3?generation=1536715278211718&alt=media` },
        { type: TwilioTypes_1.MessageType.PLAY, url: `${urlPrefix}tz_audio%2F001c_Voicebook_Swahili_v2.mp3?generation=1536715274598815&alt=media` },
        { type: TwilioTypes_1.MessageType.PLAY, url: `${urlPrefix}tz_audio%2F001d_Voicebook_Swahili_v2.mp3?generation=1536715278187429&alt=media` },
    ],
    'info_0': [
        { type: TwilioTypes_1.MessageType.PLAY, url: `${urlPrefix}tz_audio%2F030_Voicebook_Swahili.mp3?generation=1536715285243602&alt=media` },
    ],
    'error_0': [
        //tz_audio%2F051_Voicebook_Swahili.mp3?generation=1536715288239686&alt=media
        { type: TwilioTypes_1.MessageType.SAY, text: 'Sorry, I didn\'t catch that. Please try again.', language: 'en-US' },
    ],
    'listen_0': [
        //tz_audio%2F020_Voicebook_Swahili.mp3?generation=1536715286262177&alt=media or
        //tz_audio%2F020_Voicebook_Swahili_020.mp3?generation=1536715286693691&alt=media
        { type: TwilioTypes_1.MessageType.SAY, language: 'en_AU', text: 'Here are messages posted to VOICEBOOK in your COMMUNITY. You can say ujumbe ujao at any time to skip a message. You can say kurudia at any time, to play a message again. Or, you can hang up at any time.' },
        //Don't have these!
        { type: TwilioTypes_1.MessageType.SAY, language: 'en_AU', text: 'Message 1: Hi this is NAME. Please be aware that you can visit my store located at LOCATION. If you buy 4 tomatoes, the 5th one is free.' },
        { type: TwilioTypes_1.MessageType.SAY, language: 'en_AU', text: 'Message 2: Hi this is NAME. The next community meeting will be held in five days on Wednesday, at 13:00.' },
        { type: TwilioTypes_1.MessageType.SAY, language: 'en_AU', text: 'Message 3: Hi this is a message from ORGANIZATION. We want to inform you that we are expecting WEATHER this week. Please be advised and take precautions. If you have a question, you can ask a local representative.' },
    ],
    'listen_end': [
        //tz_audio%2F021_Voicebook_Swahili_v2.mp3?generation=1536715284353961&alt=media
        { type: TwilioTypes_1.MessageType.SAY, language: 'en-US', text: 'There are no other recent messages for your community.' },
        //tz_audio%2F021a_Voicebook_Swahili_v2.mp3?generation=1536715281181684&alt=media
        { type: TwilioTypes_1.MessageType.SAY, language: 'en-US', text: 'You can hang up now. Or, to leave a message say sikiliza. To tell us how we can improve this service say, maoni.' },
    ],
    'listen_end_error': [
        //tz_audio%2F051_Voicebook_Swahili.mp3?generation=1536715288239686&alt=media
        { type: TwilioTypes_1.MessageType.SAY, text: 'Sorry, I didn\'t catch that. Please try again.', language: 'en-US' },
    ],
    'listen_feedback': [
        //tz_audio%2F060_Voicebook_Swahili.mp3?generation=1536715285906854&alt=media
        { type: TwilioTypes_1.MessageType.SAY, text: 'We do our best to serve you.If you have any feedback for us, please leave us a message.If you would like us to return your call, please let us know what number to reach you.', language: 'en-US' },
    ],
    'listen_feedback_complete': [
        //No audio yet!
        { type: TwilioTypes_1.MessageType.SAY, text: 'Thanks! Your feedback has been recorded.', language: 'en-US' },
    ],
    'record_0': [
        //Need to find elsewhere!
        { type: TwilioTypes_1.MessageType.SAY, text: 'Your message will be heard by people who call this number FOR ONE WEEK, so say things that you want other people in your community to hear. This is a great way to let people know about news, business, and social events.', language: 'en-US' },
        { type: TwilioTypes_1.MessageType.SAY, text: 'To record a short message for COMMUNITY, start speaking after you hear a beep. When you are finished, stop talking or press any number on your phone. You will have the opportunity to review your message before we post it.', language: 'en-US' },
    ],
    'record_playback': [
        //tz_audio%2F013a_Voicebook_Swahili.mp3?generation=1536715274250347&alt=media
        { type: TwilioTypes_1.MessageType.SAY, text: 'TODO: Playback message', language: 'en-US' },
    ],
    'record_post_or_delete': [
        //tz_audio%2F013b_Voicebook_Swahili_v2.mp3?generation=1536715275793264&alt=media
        { type: TwilioTypes_1.MessageType.SAY, text: 'To post your message, say tuma.To cancel and start over, say anza tena', language: 'en-US' },
    ],
    'record_post_or_delete_error': [
        //tz_audio%2F051_Voicebook_Swahili.mp3?generation=1536715288239686&alt=media
        { type: TwilioTypes_1.MessageType.SAY, text: 'Sorry, I didn\'t catch that. Please try again.', language: 'en-US' },
    ],
    'record_save': [
        //TODO: download audio?
        { type: TwilioTypes_1.MessageType.SAY, text: 'Thanks! Your message will be posted.', language: 'en-US' },
    ],
    'record_delete': [
        //tz_audio%2F015a_Voicebook_Swahili.mp3?generation=1536715277987652&alt=media
        { type: TwilioTypes_1.MessageType.SAY, text: 'Your message was erased and will not be posted.', language: 'en-US' },
    ],
};
exports.default = en_text;
//# sourceMappingURL=dep_tz_audio_messages.js.map