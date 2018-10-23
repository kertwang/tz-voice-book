import * as gulp from 'gulp';

import firestore, { storage } from '../apis/Firestore';
import * as fs from 'async-file';
import FirebaseApi from '../apis/FirebaseApi';
import { BotId, VersionId } from '../types_rn/TwilioTypes';



/* import your bot configs here */
import voicebook from './content/voicebook/index';
import senegalNotification from './content/senegalNotification/index';



const fbApi = new FirebaseApi(firestore);

gulp.task('deploy_config', async () => {
  console.log("deploying conversation config for /twiml");

  /* Voicebook Bots */
  await fbApi.deployConfigForBotAndVersion(BotId.voicebook, VersionId.en_us, voicebook.en_us);
  await fbApi.deployConfigForBotAndVersion(BotId.voicebook, VersionId.en_au, voicebook.en_au);
  await fbApi.deployConfigForBotAndVersion(BotId.voicebook, VersionId.tz_audio, voicebook.tz_audio);

  /* Senegal Notifiction Bots */
  await fbApi.deployConfigForBotAndVersion(BotId.senegalNotification, VersionId.sg_text_formal, senegalNotification.sg_text_formal);
  await fbApi.deployConfigForBotAndVersion(BotId.senegalNotification, VersionId.sg_text_informal, senegalNotification.sg_text_informal);
  // await fbApi.deployConfigForBotAndVersion(BotId.senegalNotification, VersionId.fr_sg, { messages: sg_not_fr_sg_messages, blocks: sg_not_fr_sg_blocks, flows: sg_not_fr_sg_flows });
  // await fbApi.deployConfigForBotAndVersion(BotId.senegalNotification, VersionId.sg_audio_formal, { messages: sg_not_audio_formal_messages, blocks: sg_not_audio_formal_blocks, flows: sg_not_audio_formal_flows });
  // await fbApi.deployConfigForBotAndVersion(BotId.senegalNotification, VersionId.sg_audio_informal, { messages: sg_not_audio_informal_messages, blocks: sg_not_sg_audio_informal_blocks, flows: sg_not_sg_audio_informal_flows });

  /* TODO: Senegal MM 101 Bots */


  console.log("deployed config.");
});

gulp.task('deploy_audio', async () => {
  //Iterate through each /version/filename in ./content/audio, and upload
  const versionDirs = await fs.readdir('./content/audio/');
  const audioFiles: string[][] = await Promise.all(versionDirs.map(dir => {
    return fs.readdir(`../../../audio_processing/audio/${dir}/`)
      .then(childs => childs.map(child => `${dir}/${child}`))
  }));
  const flatAudioFiles: string[] = [];
  audioFiles.forEach(fileList => fileList.forEach(file => flatAudioFiles.push(file)));
  
  console.log("Use the following long links to refer to your files");
  //TODO: make this process nicer
  await Promise.all(flatAudioFiles.map(file => {
    return storage.upload(`./content/audio/${file}`, {
      destination: file,
      public: true,
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: '1536715274666696'
        }
      }
    })
    //Get the public url:
    .then(([thing1, thing2]) => {
      //TODO: fix this crazyness
      console.log(`  ${file} => ${thing2.mediaLink.replace('https://www.googleapis.com/download/storage/v1/b/tz-phone-book.appspot.com/o/', '')}`);
    })
  }));
});