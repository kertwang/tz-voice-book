import blocks from './blocks';
import flows from './flows';
import en_text_formal_messages from './en_text_messages';
import ks_audio_messages from './ks_audio_messages';


import { BotConfig, BotId } from '../../../types_rn/TwilioTypes';

const en_text: BotConfig = {
  botId: BotId.rungweIntro,
  blocks,
  flows,
  messages: en_text_formal_messages,
};

const ks_audio: BotConfig = {
  botId: BotId.rungweIntro,
  blocks,
  flows,
  messages: ks_audio_messages,
}

const configs = {
  en_text,
}

export default configs;