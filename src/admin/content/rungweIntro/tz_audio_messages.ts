import { RungweGenericMessageMap } from "../../../types_rn/TwilioTypes";
import { generatePlay } from "../../utils";

/* the deploy script will automatically fill in the urls for us */
const en_text: RungweGenericMessageMap = {
  'entrypoint': [
    //'rungwe_deposit_tz/hi'
    generatePlay('rungwe_deposit_tz', 'intro'),
  ],
  'stop': [
    //'rungwe_deposit_tz/stop'
    generatePlay('rungwe_deposit_tz', 'stop'),
  ],
  'stop_confirm': [
    //'rungwe_deposit_tz/stop_confirm'
    generatePlay('rungwe_deposit_tz', 'stop_confirm'),
  ],
  //This must be empty
  'end': [

  ]
}

export default en_text;