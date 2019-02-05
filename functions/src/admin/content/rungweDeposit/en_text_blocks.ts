import { BlockType, RungweGenericBlockMap } from "../../../types_rn/TwilioTypes";


const TwilioBlocks: RungweGenericBlockMap = {
  'entrypoint': { type: BlockType.DEFAULT },
  'end': { type: BlockType.END },
}

export default TwilioBlocks;