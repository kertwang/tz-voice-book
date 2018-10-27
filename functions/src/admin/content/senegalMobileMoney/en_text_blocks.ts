import { BlockType, SenegalMobileMoneyBlockMap } from "../../../types_rn/TwilioTypes";


const TwilioBlocks: SenegalMobileMoneyBlockMap = {
  'entrypoint': { type: BlockType.DEFAULT }, 
  'notification_0': {type: BlockType.END},
}

export default TwilioBlocks;