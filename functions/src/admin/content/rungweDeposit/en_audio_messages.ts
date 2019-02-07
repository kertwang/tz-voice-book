import { RungweGenericMessageMap, MessageType, PlayMessage } from "../../../types_rn/TwilioTypes";
import { generateText, generatePlay } from "../../utils";
import { generateUrl } from "../../../utils";

/* the deploy script will automatically fill in the urls for us */

//TODO: how do we allow the entrypoint to have runtime variables?
//params[0] => weight of leaf - must be an integer
//params[1] => location name

const en_text: RungweGenericMessageMap = {
  'entrypoint': [
    //rungweDeposit/en/hi
    generatePlay('rungwe_deposit_en', 'hi'),
    //generic_numbers/en/*
    {
      type: MessageType.DYNAMIC_PLAY,
      func: (params: string[]) => {
        const weightSplit = params[0].split('');
        //TODO: handle commas, bad characters etc.
        return weightSplit.map(n => generatePlay('generic_numbers_en', n));
      }
    },
    //rungweDeposit/en/green_leaf
    generatePlay('rungwe_deposit_en', 'green_leaf'),
    //generic_locations/en/*
    {
      type: MessageType.DYNAMIC_PLAY,
      func: (params: string[]) => {
        const locationName = params[1];
        return [generatePlay('generic_locations_en', locationName)];
      }
    },
  ],
  //This must be empty
  'end': []
}

export default en_text;