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
const en_us_flows_1 = require("./content/en_us_flows");
const en_us_blocks_1 = require("./content/en_us_blocks");
const en_us_messages_1 = require("./content/en_us_messages");
const en_au_flows_1 = require("./content/en_au_flows");
const en_au_blocks_1 = require("./content/en_au_blocks");
const en_au_messages_1 = require("./content/en_au_messages");
const tz_audio_flows_1 = require("./content/tz_audio_flows");
const tz_audio_blocks_1 = require("./content/tz_audio_blocks");
const tz_audio_messages_1 = require("./content/tz_audio_messages");
const FirebaseApi_1 = require("../apis/FirebaseApi");
const TwilioTypes_1 = require("../types_rn/TwilioTypes");
const fbApi = new FirebaseApi_1.default(Firestore_1.default);
gulp.task('deploy_config', () => __awaiter(this, void 0, void 0, function* () {
    console.log("deploying conversation config for /twiml");
    yield fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.voicebook, TwilioTypes_1.VersionId.en_us, { messages: en_us_messages_1.default, blocks: en_us_blocks_1.default, flows: en_us_flows_1.default, });
    yield fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.voicebook, TwilioTypes_1.VersionId.en_au, { messages: en_au_messages_1.default, blocks: en_au_blocks_1.default, flows: en_au_flows_1.default, });
    yield fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.voicebook, TwilioTypes_1.VersionId.tz_audio, { messages: tz_audio_messages_1.default, blocks: tz_audio_blocks_1.default, flows: tz_audio_flows_1.default, });
    console.log("deployed config.");
}));
gulp.task('deploy_audio', () => __awaiter(this, void 0, void 0, function* () {
    //Iterate through each /version/filename in ./content/audio, and upload
    const versionDirs = yield fs.readdir('./content/audio/');
    const audioFiles = yield Promise.all(versionDirs.map(dir => {
        return fs.readdir(`./content/audio/${dir}/`)
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