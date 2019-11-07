export default class TwimlHandler {
    static postRecognitionResults(req: any, res: any): Promise<void>;
    static getResponses(req: any, res: any): Promise<void>;
    static postFeedback(req: any, res: any): Promise<void>;
    static postTriggerCall(req: any, res: any): Promise<void>;
    static postRecordingCallback(req: any, res: any): Promise<void>;
    static postGather(req: any, res: any): Promise<void>;
    static postBot(req: any, res: any): Promise<void>;
}
