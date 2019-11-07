import { getBotId, pathToBlock, getUserMobile, saftelyGetPageParamsOrDefaults, saftelyGetDynamicParamsOrEmpty, logTwilioResponse } from "../utils"
// import GenericApi from "../apis/GenericApi";
import { CallContext, DigitResult } from "../types_rn/TwilioTypes";
import BotConfigModel from "../models/BotConfigModel";
import { log } from "../utils/Log";
import { LogType } from "../types_rn/LogTypes";
import TwilioRouter from "../apis/TwilioRouter";
import { unsafeUnwrap } from "../types_rn/AppProviderTypes";
import User from "../models/User";
import { TwilioApi } from "../apis/TwilioApi";

// const firebaseApi = new GenericApi();
const twilioApi = new TwilioApi()

export default class TwimlHandler {

  public static async postRecognitionResults(req: any, res: any) {
    throw new Error('Not Implemented')
  }

  public static async getResponses(req: any, res: any) {
    throw new Error('Not Implemented')
  }

  public static async postFeedback(req: any, res: any) {
    throw new Error('Not Implemented')
  }

  public static async postTriggerCall(req: any, res: any) {
    //TODO: validate params

    //TODO: write test for startCall
    const callSid = unsafeUnwrap(await twilioApi.startCall(req.body.botId, req.body.mobile, req.body.url))
    res.json(callSid)
  }

  public static async postRecordingCallback(req: any, res: any) {
    throw new Error('Not Implemented')
  }

  public static async postGather(req: any, res: any) {
    const botId = getBotId(req.params.botId);
    const blockName = pathToBlock(req.path);
    const mobile = getUserMobile(req.body);

    const user = unsafeUnwrap(await User.getOrCreateUserForMobile(mobile, botId))
    const pageParams = saftelyGetPageParamsOrDefaults(req.query);
    const dynamicParams = saftelyGetDynamicParamsOrEmpty(req.query);
    
    /* Configure the version using a versionOverride query param */
    let version: string = user.version
    if (pageParams.versionOverride) {
      version = pageParams.versionOverride
    }

    const botConfig = unsafeUnwrap(await BotConfigModel.getBotConfigForBotIdAndVersionId(botId, version))

    const ctx: CallContext = {
      callSid: req.body.CallSid,
      mobile,
      toMobile: req.body.To,
      userId: user.id,
      dynamicParams,
      ...pageParams,
      enableDemoMessages: false, //TODO: make remote config for this
    };

    log({
      type: LogType.BLOCK,
      botId,
      callSid: ctx.callSid,
      blockId: blockName,
      mobile: ctx.mobile,
      pageParams,
    });

    const gatherResult: DigitResult = {
      digits: req.body.Digits,
    }
    const result = await TwilioRouter.gatherNextMessage(ctx, botConfig, blockName, gatherResult);
    logTwilioResponse(result);

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(result);
  }

  public static async postBot(req: any, res: any) {
    const botId = getBotId(req.params.botId);
    const blockName = pathToBlock(req.path);
    const mobile = getUserMobile(req.body);

    //TODO: Verify botId and blockName exist?
    const user = unsafeUnwrap(await User.getOrCreateUserForMobile(mobile, botId))

    const pageParams = saftelyGetPageParamsOrDefaults(req.query);
    const dynamicParams = saftelyGetDynamicParamsOrEmpty(req.query);

    /* Configure the version using a versionOverride query param */
    let version: string = user.version
    if (pageParams.versionOverride) {
      version = pageParams.versionOverride
    }

    const botConfig = unsafeUnwrap(await BotConfigModel.getBotConfigForBotIdAndVersionId(botId, version))

    const ctx: CallContext = {
      callSid: req.body.CallSid,
      mobile,
      toMobile: req.body.To,
      userId: user.id,
      versionOverride: req.query.versionOverride || null,
      dynamicParams,
      ...pageParams,
      enableDemoMessages: false, //TODO: make remote config for this
    };

    log({
      type: LogType.BLOCK,
      botId,
      callSid: ctx.callSid,
      blockId: blockName,
      mobile: ctx.mobile,
      pageParams,
    });

    const result = await TwilioRouter.nextMessage(ctx, botConfig, blockName);
    logTwilioResponse(result);

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(result);
  }
}