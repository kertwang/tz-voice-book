import { RungweGenericMessageMap } from "../../../types_rn/TwilioTypes";
import { generateText } from "../../utils";

/* the deploy script will automatically fill in the urls for us */
const en_text: RungweGenericMessageMap = {
  'entrypoint': [
    generateText('Hi, this message is from the Rungwe Smallholders Tea Growers Association(RSTGA).This is a new service for our farmers.We will notify you from this number by phone call and text to let you know when your monthly payment is available.'),
  ],
  'stop': [
    generateText('These messages are free. If you would like to stop receiving voice and text messages from RSTGA, press 3 on your phone keypad. If you would like to continue receiving messages, you do not have to do anything and you may hang up at any time. '),
  ],
  'stop_confirm': [
    generateText('Ok. You will no longer receive messages from RSTGA.'),
  ],
}

export default en_text;