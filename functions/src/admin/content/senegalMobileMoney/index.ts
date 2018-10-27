import en_text_formal_blocks from './en_text_blocks';
import en_text_formal_flows from './en_text_flows';
import en_text_formal_messages from './en_text_messages';

import fr_audio_formal_blocks from './fr_audio_blocks';
import fr_audio_formal_flows from './fr_audio_flows';
import fr_audio_formal_messages from './fr_audio_messages';

import wl_audio_formal_blocks from './wl_audio_blocks';
import wl_audio_formal_flows from './wl_audio_flows';
import wl_audio_formal_messages from './wl_audio_messages';

import { BotConfig, BotId } from '../../../types_rn/TwilioTypes';


const en_text: BotConfig = {
  botId: BotId.senegalMobileMoney,
  blocks: en_text_formal_blocks,
  flows: en_text_formal_flows,
  messages: en_text_formal_messages,
};

const fr_audio: BotConfig = {
  botId: BotId.senegalMobileMoney,
  blocks: fr_audio_formal_blocks,
  flows: fr_audio_formal_flows,
  messages: fr_audio_formal_messages,
};

const wl_audio: BotConfig = {
  botId: BotId.senegalMobileMoney,
  blocks: wl_audio_formal_blocks,
  flows: wl_audio_formal_flows,
  messages: wl_audio_formal_messages,
};

const configs = {
  en_text,
  fr_audio,
  wl_audio
}

export default configs;