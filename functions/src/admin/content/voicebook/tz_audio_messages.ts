import { MessageType, MessageMap } from "../../types_rn/TwilioTypes";
import { generateUrl } from "../../utils";

const urlPrefix = 'https://www.googleapis.com/download/storage/v1/b/tz-phone-book.appspot.com/o/';
const firebaseToken = '1536715274666696'; //This isn't too precious, our files are public anyway

/* the deploy script will automatically fill in the urls for us */
const en_text: MessageMap = {
  'entrypoint': [
    //"Hello, and welcome to voicebook"
    // { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/000_Voicebook_Swahili.mp3', firebaseToken) },

    //Hello and welcome to ___. Imagine if you could listen to announcements from your village leaders simply by calling a phone number, and that you could even leave messages of your own for everyone in your community to hear. ____ is a free service that lets you do that.
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/100a_Voicebook_Swahili_v2.1.mp3', firebaseToken) },
    //Using ___, you can listen to and share messages about topics such as the date of the next community meeting, agricultural news, goods or produce for sale and many additional topics.
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/100b_Voicebook_Swahili_v2.1.mp3', firebaseToken) },


    //Option B - not using atm
    //Hello and welcome to ___. This is a free service that allows you to listen to important messages from your village leaders simply by calling a phone number and also allows you to communicate important messages of your own that you would like everyone in your community to know.
    // { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/101a_Voicebook_Swahili_v2.1.mp3', firebaseToken) },
    //Using ___, you can listen to and share messages about topics such as the date of the next community meeting, agricultural news, goods or produce for sale and many additional topics.
    // { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/101b_Voicebook_Swahili_v2.1.mp3', firebaseToken) },
  ],
  'intro_0': [
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/001a_Voicebook_Swahili_v2.mp3', firebaseToken) },
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/001b_Voicebook_Swahili_v2.mp3', firebaseToken) },
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/001c_Voicebook_Swahili_v2.mp3', firebaseToken) },
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/001d_Voicebook_Swahili_v2.mp3', firebaseToken) },
  ],
  'info_0': [
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/030_Voicebook_Swahili.mp3', firebaseToken)},
  ],
  'error_0': [
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/051_Voicebook_Swahili.mp3', firebaseToken) },
  ],
  'listen_0': [
    // 020_Voicebook_Swahili.mp3 
    //or
    // 020_Voicebook_Swahili_020.mp3 ?
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/020_Voicebook_Swahili_020.mp3', firebaseToken) },
  ],
  'listen_playback': [
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/041_Voicebook_Swahili.mp3', firebaseToken) },
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/042_Voicebook_Swahili.mp3', firebaseToken) },
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/043_Voicebook_Swahili.mp3', firebaseToken) },
  ],
  'listen_end': [
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/021_Voicebook_Swahili_v2.mp3', firebaseToken) },
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/021a_Voicebook_Swahili_v2.mp3', firebaseToken) },
  ],
  'listen_end_error': [
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/051_Voicebook_Swahili.mp3', firebaseToken) },
  ],
  'listen_feedback': [
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/060_Voicebook_Swahili.mp3', firebaseToken) },
  ],
  'listen_feedback_complete': [
    //No audio yet!
    // { type: MessageType.SAY, text: 'Thanks! Your feedback has been recorded.', language: 'en-US' },
  ],
  'record_0': [
    //Need to find elsewhere!
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/012a_Voicebook_Swahili.mp3', firebaseToken) },
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/012b_Voicebook_Swahili.mp3', firebaseToken) },
  ],
  'record_playback': [
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/013a_Voicebook_Swahili.mp3', firebaseToken) },
  ],
  'record_post_or_delete': [
    //'To post your message, say tuma.To cancel and start over, say anza tena'
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/013b_Voicebook_Swahili_v2.mp3', firebaseToken) },
  ],
  'record_post_or_delete_error': [
    //tz_audio%2F051_Voicebook_Swahili.mp3?generation=1536715288239686&alt=media
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/051_Voicebook_Swahili.mp3', firebaseToken) },
  ],
  'record_save': [
    //TODO: download audio?
    //'Thanks! Your message will be posted'
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/014_Voicebook_Swahili.mp3', firebaseToken) },
  ],
  'record_delete': [
    //'Your message was erased and will not be posted.'
    { type: MessageType.PLAY, url: generateUrl(urlPrefix, 'tz_audio/015a_Voicebook_Swahili.mp3', firebaseToken) },
  ],

}

export default en_text;