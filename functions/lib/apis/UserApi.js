"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserApi {
    static async fromMobileNumber(fb, botId, mobile) {
        const api = new UserApi();
        api.fb = fb;
        //Set up the user api from the mobile number
        api.user = await fb.getUserFromMobile(mobile, botId);
        return api;
    }
    getUser() {
        return this.user;
    }
}
exports.default = UserApi;
