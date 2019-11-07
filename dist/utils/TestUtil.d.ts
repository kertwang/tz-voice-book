export default class TestUtil {
    static createDemoContent(): Promise<void>;
    /**
     * @description Truncate all of the tables. USE ONLY IN TEST
     */
    static _truncateAll(): Promise<void>;
}
