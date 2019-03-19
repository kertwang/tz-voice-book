"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserApi {
    constructor(fb, user) {
        // this.fb = fb;
        this.user = user;
    }
    static async fromMobileNumber(fb, botId, mobile) {
        const user = await fb.getUserFromMobile(mobile, botId);
        const api = new UserApi(fb, user);
        return api;
    }
    getUser() {
        return this.user;
    }
}
exports.default = UserApi;
