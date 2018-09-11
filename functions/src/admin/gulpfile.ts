import * as gulp from 'gulp';

import fs from '../apis/Firestore';

import en_us_flows from './content/en_us_flows';
import en_us_blocks from './content/en_us_blocks';
import en_us_messages from './content/en_us_messages';
import FirebaseApi from '../apis/FirebaseApi';
import { BotId, VersionId } from '../types_rn/TwilioTypes';


const fbApi = new FirebaseApi(fs);

gulp.task('deploy_config', async () => {
  console.log("deploying conversation config for /twiml");

  await fbApi.deployConfigForBotAndVersion(BotId.voicebook, VersionId.en_us, {
    messages: en_us_messages,
    blocks: en_us_blocks,
    flows: en_us_flows,
  });

  console.log("deployed config.");

});
