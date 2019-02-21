import { RungweGenericMessageMap, MessageType, PlayMessage } from "../../../types_rn/TwilioTypes";
import { generateText, generatePlay } from "../../utils";
import { generateUrl } from "../../../utils";

/* the deploy script will automatically fill in the urls for us */
const en_text: RungweGenericMessageMap = {
  'entrypoint': [
    //'rungwe_deposit_ks/hi'
    generatePlay('rungwe_deposit_ks', 'hi'),
  ],
  'stop': [
    //'rungwe_deposit_ks/stop'
    generatePlay('rungwe_deposit_ks', 'stop'),
  ],
  'stop_confirm': [
    //'rungwe_deposit_ks/stop_confirm'
    generatePlay('rungwe_deposit_ks', 'stop_confirm'),
  ],
  //This must be empty
  'end': [

  ]
}

export default en_text;