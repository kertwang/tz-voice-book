import * as gulp from 'gulp';

import firestore, { storage } from '../apis/Firestore';
import * as fs from 'async-file';

import en_us_flows from './content/en_us_flows';
import en_us_blocks from './content/en_us_blocks';
import en_us_messages from './content/en_us_messages';
import en_au_flows from './content/en_au_flows';
import en_au_blocks from './content/en_au_blocks';
import en_au_messages from './content/en_au_messages';

import FirebaseApi from '../apis/FirebaseApi';
import { BotId, VersionId } from '../types_rn/TwilioTypes';
import { version } from 'punycode';


const fbApi = new FirebaseApi(firestore);

gulp.task('deploy_config', async () => {
  console.log("deploying conversation config for /twiml");

  await fbApi.deployConfigForBotAndVersion(BotId.voicebook, VersionId.en_us, {messages: en_us_messages,blocks: en_us_blocks,flows: en_us_flows,});
  await fbApi.deployConfigForBotAndVersion(BotId.voicebook, VersionId.en_au, {messages: en_au_messages,blocks: en_au_blocks,flows: en_au_flows,});

  console.log("deployed config.");
});

gulp.task('deploy_audio', async () => {
  //Iterate through each /version/filename in ./content/audio, and upload
  const versionDirs = await fs.readdir('./content/audio/');
  const audioFiles: string[][] = await Promise.all(versionDirs.map(dir => {
    return fs.readdir(`./content/audio/${dir}/`)
      .then(childs => childs.map(child => `${dir}/${child}`))
  }));
  const flatAudioFiles: string[] = [];
  audioFiles.forEach(fileList => fileList.forEach(file => flatAudioFiles.push(file)));
  
  await Promise.all(flatAudioFiles.map(file => {
    return storage.upload(`./content/audio/${file}`, {
      destination: file,
      public: true,
    });
  }));

});
