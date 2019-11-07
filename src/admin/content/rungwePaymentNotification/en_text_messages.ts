import { RungweGenericMessageMap } from "../../../types_rn/TwilioTypes";
import { generateText } from "../../utils";

/* the deploy script will automatically fill in the urls for us */

//TODO: how do we allow the entrypoint to have runtime variables?
const en_text: RungweGenericMessageMap = {
  //TODO: Handle specify if farmer has debits etc.
  'entrypoint': [
    generateText(' Your payment is now available. This month you will receive a payment of '),
    //TODO: maybe we can have a generate number function which pieces together numbers?
    generateText('100'),
    generateText('schillings for the'),
    generateText('10'),
    generateText('kilograms of tea that you sold. You can collect your payment at'),
    generateText('LOCATION.'),
    //TODO: Runtime variable, does the farmer have debits?
    generateText('This includes a deduction of zzz for the fertilizer.'),

  ],
  //This must be empty
  'end': [

  ]
}

export default en_text;