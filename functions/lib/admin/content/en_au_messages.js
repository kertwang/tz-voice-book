"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwilioTypes_1 = require("../../types_rn/TwilioTypes");
const generateText = (text) => {
    return {
        type: TwilioTypes_1.MessageType.SAY,
        text,
        language: 'en-AU'
    };
};
/* the deploy script will automatically fill in the urls for us */
const en_text = {
    'entrypoint': [
        generateText('Hello and welcome to voicebook.'),
    ],
    'intro_0': [
        //'tz_audio/001a_Voicebook_Swahili_v2.mp3'
        //'tz_audio/001b_Voicebook_Swahili_v2.mp3'
        //'tz_audio/001c_Voicebook_Swahili_v2.mp3'
        //'tz_audio/001d_Voicebook_Swahili_v2.mp3'
        generateText('To learn what is new in your community press 1 on your phone keypad'),
        generateText('To record a message that people in your community can hear, press 2 on your phone keypad'),
        generateText('To learn more about this service, press 3 on your phone keypad'),
        generateText('To hear these options again, press 4 on your phone keypad'),
    ],
    'info_0': [
        //'tz_audio/030_Voicebook_Swahili.mp3'
        generateText('This is a free service for people in Tanzania to stay connected with their community. Messages are free to post and free to listen to.'),
    ],
    'error_0': [
        //'tz_audio/051_Voicebook_Swahili.mp3'
        generateText('I didn\'t quite get that. Please try again.'),
    ],
    'listen_0': [
        //'tz_audio/020_Voicebook_Swahili.mp3'
        //'tz_audio/041_Voicebook_Swahili.mp3'
        //'tz_audio/042_Voicebook_Swahili.mp3'
        //'tz_audio/043_Voicebook_Swahili.mp3'
        generateText('Here are messages posted to VOICEBOOK in your COMMUNITY. You can press 1 on your phone keypad at any time to skip a message. You can press 2 at any time to play a message again. Or, you can hang up at any time.'),
    ],
    'listen_playback': [
        //It will play these messages first, then the other messages
        generateText('Hi this is NAME. Please be aware that you can visit my store located at LOCATION. If you buy 4 tomatoes, the 5th one is free.'),
        generateText('Hi this is NAME. The next community meeting will be held in five days on Wednesday, at 13:00.'),
        generateText('Hi this is a message from ORGANIZATION. We want to inform you that we are expecting WEATHER this week. Please be advised and take precautions. If you have a question, you can ask a local representative.')
    ],
    'listen_end': [
        //'tz_audio/021_Voicebook_Swahili_v2.mp3'
        generateText('There are no other recent messages for your community. You can hang up now. Or, to leave a message press 1 on your phone keypad. To tell us how we can improve this service press 2 on your phone keypad.'),
    ],
    'listen_end_error': [
        //'tz_audio/021a_Voicebook_Swahili_v2.mp3'
        generateText('You can hang up now. Or, to leave a message press 1 on your phone keypad. To tell us how we can improve this service, press 2 on your phone keypad.'),
    ],
    'listen_feedback': [
        //'tz_audio/060_Voicebook_Swahili.mp3'
        generateText('We do our best to serve you. If you have any feedback for us, please leave us a message. If you would like us to return your call, please let us know what number to reach you.'),
    ],
    'listen_feedback_complete': [
        //No audio yet!
        generateText('Thanks! Your feedback has been recorded.'),
    ],
    'record_0': [
        //'tz_audio/012a_Voicebook_Swahili.mp3'
        generateText("Your message will be heard by people who call this number FOR ONE WEEK, so say things that you want other people in your community to hear. This is a great way to let people know about news, business, and social events."),
        //'tz_audio/012b_Voicebook_Swahili.mp3'
        generateText("To record a short message for COMMUNITY, start speaking after you hear a beep.When you are finished, stop talking or press any number on your phone. You will have the opportunity to review your message before we post it."),
    ],
    'record_playback': [
        //'tz_audio/013a_Voicebook_Swahili.mp3'
        generateText("Here is your message."),
    ],
    'record_post_or_delete': [
        //'tz_audio/013b_Voicebook_Swahili_v2.mp3'
        generateText('To post your message, press 1 on your phone keypad'),
    ],
    'record_post_or_delete_error': [
        //'tz_audio/051_Voicebook_Swahili.mp3'
        generateText('I didn\'t quite get that.Please try again.'),
    ],
    'record_save': [
        //'tz_audio/014_Voicebook_Swahili.mp3'
        generateText('Thank you, your message will be posted soon. Goodbye'),
    ],
    'record_delete': [
        //'tz_audio/015a_Voicebook_Swahili.mp3'
        generateText('Your message was erased.'),
    ],
};
exports.default = en_text;
//# sourceMappingURL=en_au_messages.js.map