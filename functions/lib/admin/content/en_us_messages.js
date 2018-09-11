"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioTypes_1 = require("../../types_rn/TwilioTypes");
/* Define each translation/variaton here */
/* TODO: we will move these to firebase datastore eventually */
const en_text = {
    'entrypoint': [
        { type: TwilioTypes_1.MessageType.SAY, text: "Hello, and welcome to voicebook", language: 'en-US' },
    ],
    'intro_0': [
        { type: TwilioTypes_1.MessageType.SAY, text: "To learn what is new in your community say sikiliza.", language: 'en-US' },
        { type: TwilioTypes_1.MessageType.SAY, text: "To record a message that people in your community can hear, say tuma.", language: 'en-US' },
        { type: TwilioTypes_1.MessageType.SAY, text: "To learn more about this service say msaada.", language: 'en-US' },
        { type: TwilioTypes_1.MessageType.SAY, text: "To hear these options again say kurudia.", language: 'en-US' },
    ],
    'info_0': [
        { type: TwilioTypes_1.MessageType.SAY, text: "This is a free service to share messages and news in your communtiy.", language: 'en-US' },
    ],
    'error_0': [
        { type: TwilioTypes_1.MessageType.SAY, text: 'Sorry, I didn\'t catch that. Please try again.', language: 'en-US' },
    ],
    'listen_0': [
        { type: TwilioTypes_1.MessageType.SAY, language: 'en_AU', text: 'Here are messages posted to VOICEBOOK in your COMMUNITY. You can say ujumbe ujao at any time to skip a message. You can say kurudia at any time, to play a message again. Or, you can hang up at any time.' },
        { type: TwilioTypes_1.MessageType.SAY, language: 'en_AU', text: 'Message 1: Hi this is NAME. Please be aware that you can visit my store located at LOCATION. If you buy 4 tomatoes, the 5th one is free.' },
        { type: TwilioTypes_1.MessageType.SAY, language: 'en_AU', text: 'Message 2: Hi this is NAME. The next community meeting will be held in five days on Wednesday, at 13:00.' },
        { type: TwilioTypes_1.MessageType.SAY, language: 'en_AU', text: 'Message 3: Hi this is a message from ORGANIZATION. We want to inform you that we are expecting WEATHER this week. Please be advised and take precautions. If you have a question, you can ask a local representative.' },
    ],
    'listen_end': [
        { type: TwilioTypes_1.MessageType.SAY, language: 'en-US', text: 'There are no other recent messages for your community.' },
        { type: TwilioTypes_1.MessageType.SAY, language: 'en-US', text: 'You can hang up now. Or, to leave a message say sikiliza. To tell us how we can improve this service say, maoni.' },
    ],
    'listen_end_error': [
        { type: TwilioTypes_1.MessageType.SAY, text: 'Sorry, I didn\'t catch that. Please try again.', language: 'en-US' },
    ],
    'listen_feedback': [
        { type: TwilioTypes_1.MessageType.SAY, text: 'We do our best to serve you.If you have any feedback for us, please leave us a message.If you would like us to return your call, please let us know what number to reach you.', language: 'en-US' },
    ],
    'listen_feedback_complete': [
        { type: TwilioTypes_1.MessageType.SAY, text: 'Thanks! Your feedback has been recorded.', language: 'en-US' },
    ],
    'record_0': [
        { type: TwilioTypes_1.MessageType.SAY, text: 'Your message will be heard by people who call this number FOR ONE WEEK, so say things that you want other people in your community to hear. This is a great way to let people know about news, business, and social events.', language: 'en-US' },
        { type: TwilioTypes_1.MessageType.SAY, text: 'To record a short message for COMMUNITY, start speaking after you hear a beep. When you are finished, stop talking or press any number on your phone. You will have the opportunity to review your message before we post it.', language: 'en-US' },
    ],
    'record_playback': [
        { type: TwilioTypes_1.MessageType.SAY, text: 'You said.', language: 'en-US' },
        { type: TwilioTypes_1.MessageType.SAY, text: 'TODO: Playback message', language: 'en-US' },
    ],
    'record_post_or_delete': [
        { type: TwilioTypes_1.MessageType.SAY, text: 'To post your message, say tuma.To cancel and start over, say anza tena', language: 'en-US' },
    ],
    'record_post_or_delete_error': [
        { type: TwilioTypes_1.MessageType.SAY, text: 'Sorry, I didn\'t catch that. Please try again.', language: 'en-US' },
    ],
    'record_save': [
        { type: TwilioTypes_1.MessageType.SAY, text: 'Thanks! Your message will be posted.', language: 'en-US' },
    ],
    'record_delete': [
        { type: TwilioTypes_1.MessageType.SAY, text: 'Your message was erased and will not be posted.', language: 'en-US' },
    ],
};
exports.default = en_text;
//# sourceMappingURL=en_us_messages.js.map