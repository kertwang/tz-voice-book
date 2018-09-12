import { MessageType, MessageMap } from "../../types_rn/TwilioTypes";

const urlPrefix = 'https://www.googleapis.com/download/storage/v1/b/tz-phone-book.appspot.com/o/';
const firebaseToken = '1536715274666696'; //This isn't too precious, our files are public anyway

const generateUrl = (path: string) => {
  //eg: https://www.googleapis.com/download/storage/v1/b/tz-phone-book.appspot.com/o/tz_audio%2F015a_Voicebook_Swahili.mp3?alt=media&token=1536715274666696
  return `${urlPrefix}${encodeURIComponent(path)}?alt=media&token=${firebaseToken}`;
} 

/* the deploy script will automatically fill in the urls for us */
const en_text: MessageMap = {
  'entrypoint': [
    { type: MessageType.SAY, text: "Hello, and welcome to voicebook", language: 'en-US' },
  ],
  'intro_0': [
    { type: MessageType.PLAY, url: generateUrl('tz_audio/001a_Voicebook_Swahili_v2.mp3') },
    { type: MessageType.PLAY, url: generateUrl('tz_audio/001b_Voicebook_Swahili_v2.mp3') },
    { type: MessageType.PLAY, url: generateUrl('tz_audio/001c_Voicebook_Swahili_v2.mp3') },
    { type: MessageType.PLAY, url: generateUrl('tz_audio/001d_Voicebook_Swahili_v2.mp3') },
  ],
  'info_0': [
    { type: MessageType.PLAY, url: generateUrl('tz_audio/030_Voicebook_Swahili.mp3')},
  ],
  'error_0': [
    { type: MessageType.PLAY, url: generateUrl('tz_audio/051_Voicebook_Swahili.mp3') },
  ],
  'listen_0': [
    // 020_Voicebook_Swahili.mp3 
    //or
    // 020_Voicebook_Swahili_020.mp3 ?
    { type: MessageType.PLAY, url: generateUrl('tz_audio/020_Voicebook_Swahili.mp3') },

    
    //TODO: Don't have these!
    // { type: MessageType.SAY, language: 'en_AU', text: 'Message 1: Hi this is NAME. Please be aware that you can visit my store located at LOCATION. If you buy 4 tomatoes, the 5th one is free.' },
    // { type: MessageType.SAY, language: 'en_AU', text: 'Message 2: Hi this is NAME. The next community meeting will be held in five days on Wednesday, at 13:00.' },
    // { type: MessageType.SAY, language: 'en_AU', text: 'Message 3: Hi this is a message from ORGANIZATION. We want to inform you that we are expecting WEATHER this week. Please be advised and take precautions. If you have a question, you can ask a local representative.' },
  ],
  'listen_end': [
    { type: MessageType.PLAY, url: generateUrl('tz_audio/021_Voicebook_Swahili_v2.mp3') },
    { type: MessageType.PLAY, url: generateUrl('tz_audio/021a_Voicebook_Swahili_v2.mp3') },
  ],
  'listen_end_error': [
    { type: MessageType.PLAY, url: generateUrl('tz_audio/051_Voicebook_Swahili.mp3') },
  ],
  'listen_feedback': [
    { type: MessageType.PLAY, url: generateUrl('tz_audio/060_Voicebook_Swahili.mp3') },
  ],
  'listen_feedback_complete': [
    //No audio yet!
    { type: MessageType.SAY, text: 'Thanks! Your feedback has been recorded.', language: 'en-US' },
  ],
  'record_0': [
    //Need to find elsewhere!
    { type: MessageType.PLAY, url: generateUrl('tz_audio/012a_Voicebook_Swahili.mp3') },
    { type: MessageType.PLAY, url: generateUrl('tz_audio/012b_Voicebook_Swahili.mp3') },
  ],
  'record_playback': [
    { type: MessageType.PLAY, url: generateUrl('tz_audio/013a_Voicebook_Swahili.mp3') },
  ],
  'record_post_or_delete': [
    //'To post your message, say tuma.To cancel and start over, say anza tena'
    { type: MessageType.PLAY, url: generateUrl('tz_audio/013b_Voicebook_Swahili_v2') },
  ],
  'record_post_or_delete_error': [
    //tz_audio%2F051_Voicebook_Swahili.mp3?generation=1536715288239686&alt=media
    { type: MessageType.PLAY, url: generateUrl('tz_audio/051_Voicebook_Swahili.mp3') },
  ],
  'record_save': [
    //TODO: download audio?
    //'Thanks! Your message will be posted'
    { type: MessageType.PLAY, url: generateUrl('tz_audio/014_Voicebook_Swahili.mp3') },
  ],
  'record_delete': [
    //'Your message was erased and will not be posted.'
    { type: MessageType.PLAY, url: generateUrl('tz_audio/015a_Voicebook_Swahili.mp3') },
  ],

}

export default en_text;