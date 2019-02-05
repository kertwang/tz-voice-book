import { BlockType, RungweGenericBlockMap } from "../../../types_rn/TwilioTypes";


const TwilioBlocks: RungweGenericBlockMap = {
  'entrypoint': { type: BlockType.DEFAULT },
  'stop': { type: BlockType.DEFAULT },
  'stop_confirm': { type: BlockType.END },
  'end': { type: BlockType.END },
}

export default TwilioBlocks;