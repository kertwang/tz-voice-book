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
/* import your bot configs here */
const index_1 = require("./content/voicebook/index");
const index_2 = require("./content/senegalNotification/index");
const index_3 = require("./content/senegalMobileMoney/index");
const fbApi = new FirebaseApi_1.default(Firestore_1.default);
gulp.task('deploy_config', () => __awaiter(this, void 0, void 0, function* () {
    console.log("deploying conversation config for /twiml");
    /* Voicebook Bots */
    yield fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.voicebook, TwilioTypes_1.VersionId.en_us, index_1.default.en_us);
    yield fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.voicebook, TwilioTypes_1.VersionId.en_au, index_1.default.en_au);
    yield fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.voicebook, TwilioTypes_1.VersionId.tz_audio, index_1.default.tz_audio);
    /* Senegal Notifiction Bot */
    yield fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalNotification, TwilioTypes_1.VersionId.en_text, index_2.default.en_text);
    yield fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalNotification, TwilioTypes_1.VersionId.fr_audio, index_2.default.fr_audio);
    yield fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalNotification, TwilioTypes_1.VersionId.wl_audio, index_2.default.wl_audio);
    /* Senegal Mobile Money 101 Bot */
    yield fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalMobileMoney, TwilioTypes_1.VersionId.en_text, index_3.default.en_text);
    yield fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalMobileMoney, TwilioTypes_1.VersionId.fr_audio, index_3.default.fr_audio);
    yield fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalMobileMoney, TwilioTypes_1.VersionId.wl_audio, index_3.default.wl_audio);
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