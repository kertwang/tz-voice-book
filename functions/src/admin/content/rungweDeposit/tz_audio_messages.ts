import { RungweGenericMessageMap, MessageType, PlayMessage } from "../../../types_rn/TwilioTypes";
import { generatePlay } from "../../utils";

/* the deploy script will automatically fill in the urls for us */

//TODO: how do we allow the entrypoint to have runtime variables?
//params[0] => weight of leaf - must be an integer
//params[1] => location name


const en_text: RungweGenericMessageMap = {
  'entrypoint': [
    //rungweDeposit/en/hi
    generatePlay('rungwe_deposit_tz', 'hi'),
    //generic_numbers/en/*
    {
      type: MessageType.DYNAMIC_PLAY,
      //These must be self contained
      func: (params: string[], urlGenerator: (path: string) => string) => {
        const weightSplit = params[0].split('');
        return weightSplit.map(n => {
          const message: PlayMessage = {
            type: MessageType.PLAY, 
            url: urlGenerator(`generic_numbers_tz/${n}.mp3`),
          }
          return message;
        });
      }
    },
  ],
  //This must be empty
  'end': []
}

export default en_text;