"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp = require("gulp");
const Firestore_1 = require("../apis/Firestore");
const fs = require("async-file");
const FirebaseApi_1 = require("../apis/FirebaseApi");
const TwilioTypes_1 = require("../types_rn/TwilioTypes");
const index_1 = require("./content/rungweDeposit/index");
const fbApi = new FirebaseApi_1.default(Firestore_1.default);
gulp.task('deploy_config', () => __awaiter(this, void 0, void 0, function* () {
    console.log("deploying conversation config for /twiml");
    //TODO: how can we make this auto discover files?
    /* Voicebook Bots */
    // await fbApi.deployConfigForBotAndVersion(BotId.voicebook, VersionId.en_us, voicebook.en_us);
    // await fbApi.deployConfigForBotAndVersion(BotId.voicebook, VersionId.en_au, voicebook.en_au);
    // await fbApi.deployConfigForBotAndVersion(BotId.voicebook, VersionId.tz_audio, voicebook.tz_audio);
    /* Senegal Notifiction Bot */
    // await fbApi.deployConfigForBotAndVersion(BotId.senegalNotification, VersionId.en_text, senegalNotification.en_text);
    // await fbApi.deployConfigForBotAndVersion(BotId.senegalNotification, VersionId.fr_audio, senegalNotification.fr_audio);
    // await fbApi.deployConfigForBotAndVersion(BotId.senegalNotification, VersionId.wl_audio, senegalNotification.wl_audio);
    /* Senegal Mobile Money 101 Bot */
    // await fbApi.deployConfigForBotAndVersion(BotId.senegalMobileMoney, VersionId.en_text, senegalMobileMoney.en_text);
    // await fbApi.deployConfigForBotAndVersion(BotId.senegalMobileMoney, VersionId.fr_audio, senegalMobileMoney.fr_audio);
    // await fbApi.deployConfigForBotAndVersion(BotId.senegalMobileMoney, VersionId.wl_audio, senegalMobileMoney.wl_audio);
    /* Rungwe Intro Bot */
    // await fbApi.deployConfigForBotAndVersion(BotId.rungweIntro, VersionId.en_text, rungweIntro.en_text);
    /* Rungwe Deposit Bot */
    yield fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.rungweDeposit, TwilioTypes_1.VersionId.en_text, index_1.default.en_text);
    /* Rungwe PaymentDate Bot */
    // await fbApi.deployConfigForBotAndVersion(BotId.rungwePaymentDate, VersionId.en_text, rungwePaymentDate.en_text);
    /* Rungwe PaymentNotification Bot */
    // await fbApi.deployConfigForBotAndVersion(BotId.rungwePaymentNotification, VersionId.en_text, rungwePaymentNotification.en_text);
    console.log("deployed config.");
}));
gulp.task('deploy_audio', () => __awaiter(this, void 0, void 0, function* () {
    const audioDir = `../../../audio_processing/audio/`;
    //Iterate through each /version/filename in ./content/audio, and upload
    const versionDirs = yield fs.readdir(audioDir);
    const audioFiles = yield Promise.all(versionDirs.map(dir => {
        return fs.readdir(`${audioDir}${dir}/`)
            .then(childs => childs.map(child => `${dir}/${child}`));
    }));
    const flatAudioFiles = [];
    audioFiles.forEach(fileList => fileList.forEach(file => flatAudioFiles.push(file)));
    //TODO: make this process nicer
    yield Promise.all(flatAudioFiles.map(file => {
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
}));
//# sourceMappingURL=gulpfile.js.map