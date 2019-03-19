"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = __importStar(require("gulp"));
const Firestore_1 = __importStar(require("../apis/Firestore"));
const fs = __importStar(require("async-file"));
const FirebaseApi_1 = __importDefault(require("../apis/FirebaseApi"));
const TwilioTypes_1 = require("../types_rn/TwilioTypes");
/* import your bot configs here */
const index_1 = __importDefault(require("./content/voicebook/index"));
const index_2 = __importDefault(require("./content/senegalNotification/index"));
const index_3 = __importDefault(require("./content/senegalMobileMoney/index"));
const index_4 = __importDefault(require("./content/rungweIntro/index"));
const index_5 = __importDefault(require("./content/rungweDeposit/index"));
const index_6 = __importDefault(require("./content/rungwePaymentDate/index"));
const index_7 = __importDefault(require("./content/rungwePaymentNotification/index"));
const fbApi = new FirebaseApi_1.default(Firestore_1.default);
gulp.task('deploy_config', async () => {
    console.log("deploying conversation config for /twiml");
    //TODO: how can we make this auto discover files?
    /* Voicebook Bots */
    await fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.voicebook, TwilioTypes_1.VersionId.en_us, index_1.default.en_us);
    await fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.voicebook, TwilioTypes_1.VersionId.en_au, index_1.default.en_au);
    await fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.voicebook, TwilioTypes_1.VersionId.tz_audio, index_1.default.tz_audio);
    /* Senegal Notifiction Bot */
    await fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalNotification, TwilioTypes_1.VersionId.en_text, index_2.default.en_text);
    await fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalNotification, TwilioTypes_1.VersionId.fr_audio, index_2.default.fr_audio);
    await fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalNotification, TwilioTypes_1.VersionId.wl_audio, index_2.default.wl_audio);
    /* Senegal Mobile Money 101 Bot */
    await fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalMobileMoney, TwilioTypes_1.VersionId.en_text, index_3.default.en_text);
    await fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalMobileMoney, TwilioTypes_1.VersionId.fr_audio, index_3.default.fr_audio);
    await fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalMobileMoney, TwilioTypes_1.VersionId.wl_audio, index_3.default.wl_audio);
    /* Rungwe Intro Bot */
    await fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.rungweIntro, TwilioTypes_1.VersionId.en_text, index_4.default.en_text);
    await fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.rungweIntro, TwilioTypes_1.VersionId.tz_audio, index_4.default.tz_audio);
    /* Rungwe Deposit Bot */
    await fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.rungweDeposit, TwilioTypes_1.VersionId.en_text, index_5.default.en_text);
    await fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.rungweDeposit, TwilioTypes_1.VersionId.en_audio, index_5.default.en_audio);
    await fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.rungweDeposit, TwilioTypes_1.VersionId.tz_audio, index_5.default.tz_audio);
    /* Rungwe PaymentDate Bot */
    await fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.rungwePaymentDate, TwilioTypes_1.VersionId.en_text, index_6.default.en_text);
    /* Rungwe PaymentNotification Bot */
    await fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.rungwePaymentNotification, TwilioTypes_1.VersionId.en_text, index_7.default.en_text);
    console.log("deployed config.");
});
gulp.task('deploy_audio', async () => {
    const audioDir = `../../../audio_processing/audio_new/`;
    //Iterate through each /version/filename in ./content/audio, and upload
    const versionDirs = await fs.readdir(audioDir);
    const audioFiles = await Promise.all(versionDirs.map(dir => {
        return fs.readdir(`${audioDir}${dir}/`)
            .then(childs => childs.map(child => `${dir}/${child}`));
    }));
    const flatAudioFiles = [];
    audioFiles.forEach(fileList => fileList.forEach(file => flatAudioFiles.push(file)));
    //TODO: make this process nicer
    await Promise.all(flatAudioFiles.map(file => {
        return Firestore_1.storage.upload(`${audioDir}${file}`, {
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
        });
    }));
});
