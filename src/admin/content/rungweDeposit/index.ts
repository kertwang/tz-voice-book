import blocks from './blocks';
import flows from './flows';
import en_text_messages from './en_text_messages';
import en_audio_messages from './en_audio_messages';
import tz_audio_messages from './tz_audio_messages';


import { BotConfig, BotId } from '../../../types_rn/TwilioTypes';


const en_text: BotConfig = {
  botId: BotId.rungweDeposit,
  messages: en_text_messages,
  blocks,
  flows,
  versionId: 'en_text',
};

const en_audio: BotConfig = {
  botId: BotId.rungweDeposit,
  messages: en_audio_messages,
  blocks,
  flows,
  versionId: 'en_audio',
}

const tz_audio: BotConfig = {
  botId: BotId.rungweDeposit,
  blocks,
  flows,
  messages: tz_audio_messages,
  versionId: 'tz_audio',
}

const configs = {
  en_text,
  en_audio,
  tz_audio,
}

export default configs;