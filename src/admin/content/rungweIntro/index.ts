import blocks from './blocks';
import flows from './flows';
import en_text_formal_messages from './en_text_messages';
import tz_audio_messages from './tz_audio_messages';


import { BotConfig, BotId } from '../../../types_rn/TwilioTypes';

const en_text: BotConfig = {
  botId: BotId.rungweIntro,
  blocks,
  flows,
  versionId: 'en_text',
  messages: en_text_formal_messages,
};

const tz_audio: BotConfig = {
  botId: BotId.rungweIntro,
  blocks,
  flows,
  versionId: 'tz_audio',
  messages: tz_audio_messages,
}

const configs = {
  en_text,
  tz_audio,
}

export default configs;