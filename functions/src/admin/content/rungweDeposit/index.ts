import blocks from './blocks';
import flows from './flows';
import en_text_messages from './en_text_messages';
import en_audio_messages from './en_audio_messages';


import { BotConfig, BotId } from '../../../types_rn/TwilioTypes';


const en_text: BotConfig = {
  botId: BotId.rungweDeposit,
  messages: en_text_messages,
  blocks,
  flows,
};

const en_audio: BotConfig = {
  botId: BotId.rungweDeposit,
  messages: en_audio_messages,
  blocks,
  flows,
}

const configs = {
  en_text,
  en_audio,
}

export default configs;