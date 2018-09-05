"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserApi {
    static fromMobileNumber(fb, number) {
        const api = new UserApi();
        api.mobile = number;
        api.fb = fb;
        return api;
    }
    getUser() {
        return this.fb.getUserFromMobile(this.mobile)
            .then(user => {
            return user;
        });
    }
}
exports.default = UserApi;
//# sourceMappingURL=UserApi.js.map