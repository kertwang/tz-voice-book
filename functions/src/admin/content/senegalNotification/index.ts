import sg_text_formal_blocks from './sg_text_formal_blocks';
import sg_text_formal_flows from './sg_text_formal_flows';
import sg_text_formal_messages from './sg_text_formal_messages';
import { BotConfig, BotId } from '../../../types_rn/TwilioTypes';


const sg_text_formal: BotConfig = {
  botId: BotId.senegalNotification,
  blocks: sg_text_formal_blocks,
  flows: sg_text_formal_flows,
  messages: sg_text_formal_messages,
};

// const sg_text_informal: BotConfig = {
//   botId: BotId.senegalNotification,
//   blocks: en_au_blocks,
//   flows: en_au_flows,
//   messages: en_au_messages,
// };

const configs = {
  sg_text_formal,
  // sg_text_informal,
}

export default configs;