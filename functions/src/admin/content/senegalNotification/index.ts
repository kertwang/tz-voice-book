import en_au_flows from './en_au_flows';
import en_au_blocks from './en_au_blocks';
import en_au_messages from './en_au_messages';
import { BotConfig, BotId } from '../../../types_rn/TwilioTypes';


const sg_text_formal: BotConfig = {
  botId: BotId.senegalNotification,
  blocks: en_au_blocks,
  flows: en_au_flows,
  messages: en_au_messages,
};

const sg_text_informal: BotConfig = {
  botId: BotId.senegalNotification,
  blocks: en_au_blocks,
  flows: en_au_flows,
  messages: en_au_messages,
};

const configs = {
  sg_text_formal,
  sg_text_informal,
}

export default configs;