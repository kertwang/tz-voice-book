import { RungweGenericMessageMap, MessageType } from "../../../types_rn/TwilioTypes";
import { generateText } from "../../utils";

/* the deploy script will automatically fill in the urls for us */

//TODO: how do we allow the entrypoint to have runtime variables?
const en_text: RungweGenericMessageMap = {
  'entrypoint': [
    generateText('Hi, this message is from the Rungwe Smallholders Tea Growers Association(RSTGA).Thank you for depositing'),
    //RW-TODO: How do we generate numbers on the fly???

    {
      type: MessageType.DYNAMIC_SAY,
      //RW-TODO: Maybe this needs to be an already serialized function?
      func: (params: string[]) => {
        return {
          type: MessageType.SAY,
          text: params[0], //for now, just say the first params
          language: 'en-US'
        }
      }
    },
    generateText('kg of green leaf at'),
    generateText('LOCATION.'),
  ],
  //This must be empty
  'end': [

  ]
}

export default en_text;