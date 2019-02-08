import en_text_formal_blocks from './en_text_blocks';
import en_text_formal_flows from './en_text_flows';
import en_text_formal_messages from './en_text_messages';


import { BotConfig, BotId } from '../../../types_rn/TwilioTypes';


const en_text: BotConfig = {
  botId: BotId.rungwePaymentDate,
  blocks: en_text_formal_blocks,
  flows: en_text_formal_flows,
  messages: en_text_formal_messages,
};

const configs = {
  en_text,
}

export default configs;