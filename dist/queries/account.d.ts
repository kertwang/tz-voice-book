interface AccountModel {
    username: string;
    access_token: string;
}
declare function getAllAccounts(): Promise<any[]>;
declare function getAccountForUser(username: string): Promise<AccountModel | undefined>;
export { AccountModel, getAllAccounts, getAccountForUser };
