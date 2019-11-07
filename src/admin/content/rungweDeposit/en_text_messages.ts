import { RungweGenericMessageMap, MessageType } from "../../../types_rn/TwilioTypes";
import { generateText } from "../../utils";

/* the deploy script will automatically fill in the urls for us */

//TODO: how do we allow the entrypoint to have runtime variables?
const en_text: RungweGenericMessageMap = {
  'entrypoint': [
    //hi
    generateText('Hi, this message is from the Rungwe Smallholders Tea Growers Association(RSTGA).Thank you for depositing'),
    {
      type: MessageType.DYNAMIC_SAY,
      func: (params: string[]) => {
        return [{
          type: MessageType.SAY,
          text: params[0],
          language: 'en-US'
        }];
      }
    },
    //green_leaf
    generateText('kg of green leaf at'),
    generateText('LOCATION.'),
  ],
  //This must be empty
  'end': []
}

export default en_text;