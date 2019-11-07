import { SomeResult } from "../types_rn/AppProviderTypes";
import { User } from "../apis/UserApi";
declare function getOrCreateUserForMobile(mobile: string, botId: string): Promise<SomeResult<User>>;
declare const _default: {
    getOrCreateUserForMobile: typeof getOrCreateUserForMobile;
};
export default _default;
