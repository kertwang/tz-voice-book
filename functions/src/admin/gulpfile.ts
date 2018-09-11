import * as gulp from 'gulp';

import fs from '../apis/Firestore';

import en_us_flows from './content/en_us_flows';
import en_us_blocks from './content/en_us_blocks';
import en_us_messages from './content/en_us_messages';
import en_au_flows from './content/en_au_flows';
import en_au_blocks from './content/en_au_blocks';
import en_au_messages from './content/en_au_messages';

import FirebaseApi from '../apis/FirebaseApi';
import { BotId, VersionId } from '../types_rn/TwilioTypes';


const fbApi = new FirebaseApi(fs);

gulp.task('deploy_config', async () => {
  console.log("deploying conversation config for /twiml");

  await fbApi.deployConfigForBotAndVersion(BotId.voicebook, VersionId.en_us, {messages: en_us_messages,blocks: en_us_blocks,flows: en_us_flows,});
  await fbApi.deployConfigForBotAndVersion(BotId.voicebook, VersionId.en_au, {messages: en_au_messages,blocks: en_au_blocks,flows: en_au_flows,});


  console.log("deployed config.");

});
