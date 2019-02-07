import { RungweGenericMessageMap } from "../../../types_rn/TwilioTypes";
import { generateText } from "../../utils";

/* the deploy script will automatically fill in the urls for us */

//TODO: how do we allow the entrypoint to have runtime variables?
const en_text: RungweGenericMessageMap = {
  'entrypoint': [
    generateText('Hi, this message is from the Rungwe Smallholders Tea Growers Association(RSTGA).Thank you for depositing'),
    //TODO: maybe we can have a generate number function which pieces together numbers?
    //RW-TODO: Maybe this needs to be a placeholder?
    generateText('100'),
    generateText('kg of green leaf at'),
    generateText('LOCATION.'),
  ],
  //This must be empty
  'end': [

  ]
}

export default en_text;