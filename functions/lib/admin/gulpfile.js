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
const en_us_flows_1 = require("./content/en_us_flows");
const en_us_blocks_1 = require("./content/en_us_blocks");
const en_us_messages_1 = require("./content/en_us_messages");
const FirebaseApi_1 = require("../apis/FirebaseApi");
const TwilioTypes_1 = require("../types_rn/TwilioTypes");
const fbApi = new FirebaseApi_1.default(Firestore_1.default);
gulp.task('deploy_config', () => __awaiter(this, void 0, void 0, function* () {
    console.log("deploying conversation config for /twiml");
    yield fbApi.deployConfigForBotAndVersion(TwilioTypes_1.BotId.voicebook, TwilioTypes_1.VersionId.en_us, {
        messages: en_us_messages_1.default,
        blocks: en_us_blocks_1.default,
        flows: en_us_flows_1.default,
    });
    console.log("deployed config.");
}));
//# sourceMappingURL=gulpfile.js.map