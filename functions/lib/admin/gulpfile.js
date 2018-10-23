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
const fbApi = new FirebaseApi_1.default(Firestore_1.default);
gulp.task('deploy_config', () => __awaiter(this, void 0, void 0, function* () {
    console.log("deploying conversation config for /twiml");
    /* Voicebook Bots */
    yield fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.voicebook, TwilioTypes_1.VersionId.en_us, index_1.default.en_us);
    yield fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.voicebook, TwilioTypes_1.VersionId.en_au, index_1.default.en_au);
    yield fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.voicebook, TwilioTypes_1.VersionId.tz_audio, index_1.default.tz_audio);
    /* Senegal Notifiction Bots */
    yield fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.senegalNotification, TwilioTypes_1.VersionId.en_au, index_2.default.en_au);
    // await fbApi.deployConfigForBotAndVersion(BotId.senegalNotification, VersionId.fr_sg, { messages: sg_not_fr_sg_messages, blocks: sg_not_fr_sg_blocks, flows: sg_not_fr_sg_flows });
    // await fbApi.deployConfigForBotAndVersion(BotId.senegalNotification, VersionId.sg_audio_formal, { messages: sg_not_audio_formal_messages, blocks: sg_not_audio_formal_blocks, flows: sg_not_audio_formal_flows });
    // await fbApi.deployConfigForBotAndVersion(BotId.senegalNotification, VersionId.sg_audio_informal, { messages: sg_not_audio_informal_messages, blocks: sg_not_sg_audio_informal_blocks, flows: sg_not_sg_audio_informal_flows });
    /* TODO: Senegal MM 101 Bots */
    console.log("deployed config.");
}));
gulp.task('deploy_audio', () => __awaiter(this, void 0, void 0, function* () {
    //Iterate through each /version/filename in ./content/audio, and upload
    const versionDirs = yield fs.readdir('./content/audio/');
    const audioFiles = yield Promise.all(versionDirs.map(dir => {
        return fs.readdir(`../../../audio_processing/audio/${dir}/`)
            .then(childs => childs.map(child => `${dir}/${child}`));
    }));
    const flatAudioFiles = [];
    audioFiles.forEach(fileList => fileList.forEach(file => flatAudioFiles.push(file)));
    console.log("Use the following long links to refer to your files");
    //TODO: make this process nicer
    yield Promise.all(flatAudioFiles.map(file => {
        return Firestore_1.storage.upload(`./content/audio/${file}`, {
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
        });
    }));
}));
//# sourceMappingURL=gulpfile.js.map