import { SomeResult } from "../types_rn/AppProviderTypes";
export interface IUser {
    mobile: string;
    name: string;
    versionId: string;
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
declare function getAll(): Promise<SomeResult<Array<IUser>>>;
declare function getForId(id: string): Promise<SomeResult<IUser>>;
declare function getForMobile(mobile: string): Promise<SomeResult<IUser>>;
declare function getOrCreateForMobile(mobile: string, defaults: {
    name: string;
    versionId: string;
}): Promise<SomeResult<IUser>>;
declare function createUsers(users: Array<IUser>, upsert: boolean): Promise<SomeResult<Array<IUser>>>;
declare function deleteUser(id: string): Promise<number>;
declare function _truncate(): Promise<any[]>;
declare const _default: {
    getAll: typeof getAll;
    getForId: typeof getForId;
    getForMobile: typeof getForMobile;
    getOrCreateForMobile: typeof getOrCreateForMobile;
    createUsers: typeof createUsers;
    deleteUser: typeof deleteUser;
    _truncate: typeof _truncate;
};
export default _default;
