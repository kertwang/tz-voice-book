import { BlockType, BlockMap, AnyBlockMap, SenegalNotificationBlockMap } from "../../../types_rn/TwilioTypes";


const TwilioBlocks: SenegalNotificationBlockMap = {
  'entrypoint': { type: BlockType.DEFAULT }, 
  'notification_0': {type: BlockType.DEFAULT},
}

export default TwilioBlocks;