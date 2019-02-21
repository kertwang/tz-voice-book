import * as gulp from 'gulp';

import firestore, { storage } from '../apis/Firestore';
import * as fs from 'async-file';
import FirebaseApi from '../apis/FirebaseApi';
import { BotId, VersionId } from '../types_rn/TwilioTypes';



/* import your bot configs here */
import voicebook from './content/voicebook/index';
import senegalNotification from './content/senegalNotification/index';
import senegalMobileMoney from './content/senegalMobileMoney/index';
import rungweIntro from './content/rungweIntro/index';
import rungweDeposit from './content/rungweDeposit/index';
import rungwePaymentDate from './content/rungwePaymentDate/index';
import rungwePaymentNotification from './content/rungwePaymentNotification/index';



const fbApi = new FirebaseApi(firestore);

gulp.task('deploy_config', async () => {
  console.log("deploying conversation config for /twiml");

  //TODO: how can we make this auto discover files?

  /* Voicebook Bots */
  await fbApi.deployConfigForBotAndVersion(BotId.voicebook, VersionId.en_us, voicebook.en_us);
  await fbApi.deployConfigForBotAndVersion(BotId.voicebook, VersionId.en_au, voicebook.en_au);
  await fbApi.deployConfigForBotAndVersion(BotId.voicebook, VersionId.tz_audio, voicebook.tz_audio);

  /* Senegal Notifiction Bot */
  await fbApi.deployConfigForBotAndVersion(BotId.senegalNotification, VersionId.en_text, senegalNotification.en_text);
  await fbApi.deployConfigForBotAndVersion(BotId.senegalNotification, VersionId.fr_audio, senegalNotification.fr_audio);
  await fbApi.deployConfigForBotAndVersion(BotId.senegalNotification, VersionId.wl_audio, senegalNotification.wl_audio);

  /* Senegal Mobile Money 101 Bot */
  await fbApi.deployConfigForBotAndVersion(BotId.senegalMobileMoney, VersionId.en_text, senegalMobileMoney.en_text);
  await fbApi.deployConfigForBotAndVersion(BotId.senegalMobileMoney, VersionId.fr_audio, senegalMobileMoney.fr_audio);
  await fbApi.deployConfigForBotAndVersion(BotId.senegalMobileMoney, VersionId.wl_audio, senegalMobileMoney.wl_audio);

  /* Rungwe Intro Bot */
  await fbApi.deployConfigForBotAndVersion(BotId.rungweIntro, VersionId.en_text, rungweIntro.en_text);
  await fbApi.deployConfigForBotAndVersion(BotId.rungweIntro, VersionId.tz_audio, rungweIntro.tz_audio);

  /* Rungwe Deposit Bot */
  await fbApi.deployConfigForBotAndVersion(BotId.rungweDeposit, VersionId.en_text, rungweDeposit.en_text);
  await fbApi.deployConfigForBotAndVersion(BotId.rungweDeposit, VersionId.en_audio, rungweDeposit.en_audio);
  await fbApi.deployConfigForBotAndVersion(BotId.rungweDeposit, VersionId.tz_audio, rungweDeposit.tz_audio);

  /* Rungwe PaymentDate Bot */
  await fbApi.deployConfigForBotAndVersion(BotId.rungwePaymentDate, VersionId.en_text, rungwePaymentDate.en_text);

  /* Rungwe PaymentNotification Bot */
  await fbApi.deployConfigForBotAndVersion(BotId.rungwePaymentNotification, VersionId.en_text, rungwePaymentNotification.en_text);

  

  console.log("deployed config.");
});

gulp.task('deploy_audio', async () => {
  const audioDir = `../../../audio_processing/audio_new/`;
  //Iterate through each /version/filename in ./content/audio, and upload
  const versionDirs = await fs.readdir(audioDir);
  const audioFiles: string[][] = await Promise.all(versionDirs.map(dir => {
    return fs.readdir(`${audioDir}${dir}/`)
      .then(childs => childs.map(child => `${dir}/${child}`))
  }));
  const flatAudioFiles: string[] = [];
  audioFiles.forEach(fileList => fileList.forEach(file => flatAudioFiles.push(file)));
  
  //TODO: make this process nicer
  await Promise.all(flatAudioFiles.map(file => {
    return storage.upload(`${audioDir}${file}`, {
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
      console.log(`   Uploaded: ${file}`);
    })
    .catch(err => {
      console.log("Error uploading file:", err);
    })
  }));
});