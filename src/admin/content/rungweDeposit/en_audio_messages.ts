import { RungweGenericMessageMap, MessageType, PlayMessage } from "../../../types_rn/TwilioTypes";
import { generatePlay } from "../../utils";

/* the deploy script will automatically fill in the urls for us */

//TODO: how do we allow the entrypoint to have runtime variables?
//params[0] => weight of leaf - must be an integer
//params[1] => location name


const en_text: RungweGenericMessageMap = {
  'entrypoint': [
    //rungwe_deposit_en/hi
    generatePlay('rungwe_deposit_en', 'hi'),
    //generic_numbers/en/*
    {
      type: MessageType.DYNAMIC_PLAY,
      //These must be self contained
      func: (params: string[], urlGenerator: (path: string) => string) => {
        const weightSplit = params[0].split('');
        return weightSplit.map(n => {
          const message: PlayMessage = {
            type: MessageType.PLAY, 
            url: urlGenerator(`generic_numbers_en/${n}.mp3`),
          }
          return message;
        });
      }
    },
    //rungweDeposit/en/green_leaf
    generatePlay('rungwe_deposit_en', 'green_leaf'),
    //generic_locations/en/*
    {
      type: MessageType.DYNAMIC_PLAY,
      func: (params: string[], urlGenerator: (path: string) => string) => {
        const locationName = params[1];
        const message: PlayMessage = {
          type: MessageType.PLAY, 
          url: urlGenerator(`generic_locations_en/${locationName}.mp3`),
        }
        return [message];
      }
    },
  ],
  //This must be empty
  'end': []
}

export default en_text;