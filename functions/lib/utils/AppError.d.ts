export default class AppError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string);
}
