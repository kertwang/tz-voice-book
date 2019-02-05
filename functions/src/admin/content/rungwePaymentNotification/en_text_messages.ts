import { RungweGenericMessageMap } from "../../../types_rn/TwilioTypes";
import { generateText } from "../../utils";

/* the deploy script will automatically fill in the urls for us */
const en_text: RungweGenericMessageMap = {
  'entrypoint': [
    generateText('Hi, good news! '),
  ]
}

export default en_text;