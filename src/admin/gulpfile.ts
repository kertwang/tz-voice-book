import gulp from 'gulp';

// import fs from 'async-file';
import { BotConfig } from '../types_rn/TwilioTypes';
import {  unsafeUnwrap, makeSuccess } from '../types_rn/AppProviderTypes';
import * as Env from '../utils/Env';

/* import your bot configs here */
import voicebook from './content/voicebook/index';
import senegalNotification from './content/senegalNotification/index';
import senegalMobileMoney from './content/senegalMobileMoney/index';
import rungweIntro from './content/rungweIntro/index';
import rungweDeposit from './content/rungweDeposit/index';
import rungwePaymentDate from './content/rungwePaymentDate/index';
import rungwePaymentNotification from './content/rungwePaymentNotification/index';
import VBAdminClient, { TriggerCallRequest } from './VBAdminClient';


gulp.task('deploy_config', async () => {
  console.log("deploying conversation config for /twiml");
  const botConfig: Array<BotConfig> = [
    /* Voicebook Bots */
    voicebook.en_us,
    voicebook.en_au,
    voicebook.tz_audio,

    // /* Senegal Notifiction Bot */
    senegalNotification.en_text,
    senegalNotification.fr_audio,
    senegalNotification.wl_audio,

    // /* Senegal Mobile Money 101 Bot */
    senegalMobileMoney.en_text,
    senegalMobileMoney.fr_audio,
    senegalMobileMoney.wl_audio,

    // /* Rungwe Intro Bot */
    rungweIntro.en_text,
    rungweIntro.tz_audio,

    // /* Rungwe Deposit Bot */
    rungweDeposit.en_text,
    rungweDeposit.en_audio,
    rungweDeposit.tz_audio,

    // /* Rungwe PaymentDate Bot */
    rungwePaymentDate.en_text,

    /* Rungwe PaymentNotification Bot */
    rungwePaymentNotification.en_text,
    rungwePaymentNotification.tz_audio,
  ]

  await botConfig.reduce(async (acc: Promise<any>, curr: BotConfig) => {
    await curr
    return VBAdminClient.createContent(curr)
  }, Promise.resolve(makeSuccess(undefined)))

  console.log(`Deployed config for ${botConfig.length} bots.`);
});

// gulp.task('deploy_audio', async () => {
//   const audioDir = `../../../audio_processing/audio_new/`;
//   //Iterate through each /version/filename in ./content/audio, and upload
//   const versionDirs = await fs.readdir(audioDir);
//   const audioFiles: string[][] = await Promise.all(versionDirs.map(dir => {
//     return fs.readdir(`${audioDir}${dir}/`)
//       .then(childs => childs.map(child => `${dir}/${child}`))
//   }));
//   const flatAudioFiles: string[] = [];
//   audioFiles.forEach(fileList => fileList.forEach(file => flatAudioFiles.push(file)));
  
//   //TODO: make this process nicer
//   await Promise.all(flatAudioFiles.map(file => {
//     return storage.upload(`${audioDir}${file}`, {
//       destination: file,
//       public: true,
//       metadata: {
//         metadata: {
//           firebaseStorageDownloadTokens: '1536715274666696'
//         }
//       }
//     })
//     //Get the public url:
//     .then(([thing1, thing2]) => {
//       console.log(`   Uploaded: ${file}`);
//     })
//     .catch(err => {
//       console.log("Error uploading file:", err);
//     })
//   }));
// });


/**
 * A simple test of the call trigger
 * Assumes that the bot config already exists
 */
gulp.task('admin-trigger-test-call', async () => {
  const request: TriggerCallRequest = {
    mobile: Env.testMobile,
    url: `${Env.baseUrl}/twiml/senegalMobileMoney/entrypoint?versionOverride=wl_audio`,
    botId: "senegalNotification",
  } 

  unsafeUnwrap(await VBAdminClient.triggerCall(request))
})

/**
 * A simple test to make sure the server is alive
 * and config is valid
 */
gulp.task('admin-health-check', async () => {
  const response = unsafeUnwrap(await VBAdminClient.getHealth())
  console.log(response)
})

/**
 * Get the config for a bot id
 */
gulp.task('admin-get-config', async () => {
  const response = unsafeUnwrap(await VBAdminClient.getBotConfig('voicebook', 'en-US'))
  console.log(response)
})

