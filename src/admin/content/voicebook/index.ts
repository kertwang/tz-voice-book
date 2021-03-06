import en_us_flows from './en_us_flows';
import en_us_blocks from './en_us_blocks';
import en_us_messages from './en_us_messages';
import en_au_flows from './en_au_flows';
import en_au_blocks from './en_au_blocks';
import en_au_messages from './en_au_messages';
import tz_audio_flows from './tz_audio_flows';
import tz_audio_blocks from './tz_audio_blocks';
import tz_audio_messages from './tz_audio_messages';
import { BotConfig, BotId } from '../../../types_rn/TwilioTypes';


const en_us: BotConfig = {
  botId: BotId.voicebook,
  blocks: en_us_blocks,
  flows: en_us_flows,
  messages: en_us_messages,
  versionId: 'en_us',
}

const en_au: BotConfig = {
  botId: BotId.voicebook,
  blocks: en_au_blocks,
  flows: en_au_flows,
  messages: en_au_messages,
  versionId: 'en_au',
}

const tz_audio: BotConfig = {
  botId: BotId.voicebook,
  blocks: tz_audio_blocks,
  flows: tz_audio_flows,
  messages: tz_audio_messages,
  versionId: 'tz_audio',
}

const configs = {
  en_us,
  en_au,
  tz_audio,
}

export default configs;