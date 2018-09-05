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
const moment = require("moment");
class AppApi {
    static fromMobileNumber(fb, mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            const api = new AppApi();
            api.fb = fb;
            //Set up the user api from the mobile number
            api.user = yield fb.getUserFromMobile(mobile);
            return api;
        });
    }
    getUser() {
        return this.user;
    }
    /**
     * Save a recording to the user's pending recordings list
     */
    savePendingRecording(url) {
        const recording = {
            mobile: this.user.mobile,
            userId: this.user.id,
            url,
            createdAt: moment().toISOString(),
        };
        return this.fb.savePendingRecording(this.user.id, recording);
    }
    /**
     * Get the pending recordings from the user, newest first
     */
    getPendingRecordings(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const recordings = yield this.fb.getPendingRecordingsForUser(this.user.id, 5);
            return recordings;
        });
    }
    /**
     * Publish a recording from ther user's pending list, and remove it
     */
    publishRecordingFromPendingList(pendingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const recording = yield this.fb.getPendingRecording(this.user.id, pendingId);
            const recordingId = yield this.fb.postRecording(recording);
            return recordingId;
        });
    }
}
exports.default = AppApi;
//# sourceMappingURL=AppApi.js.map