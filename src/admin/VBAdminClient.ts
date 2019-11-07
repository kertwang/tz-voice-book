import request from 'request-promise-native'

import { BotConfig } from "../types_rn/TwilioTypes"
import { SomeResult, makeSuccess, makeError } from "../types_rn/AppProviderTypes"
import { baseUrl } from '../utils/Env';


export type TriggerCallRequest = {
  mobile: string,
  url: string,
  botId: string,
}

export type PostBotRequest = {
  botId: string,
  blockId: string,
  body: {
    From: string,
    To: string,
    Direction: string,
    Digits?: string,
  },
  versionOverride: string
}

export default class VBAdminClient {

  public static async createContent(botConfig: BotConfig): Promise<SomeResult<void>> {
    const options = {
      url: `${baseUrl}/admin/content/${botConfig.botId}`,
      method: 'POST',
      json: true,
      body: {
        ...botConfig
      }
    }

    return request(options)
      .then(() => makeSuccess(undefined))
      .catch((err) => makeError(err))
  }

  public static async getHealth(): Promise<SomeResult<any>> {
    const options = {
      url: `${baseUrl}/health`,
      method: 'GET',
      json: true,
    }

    return request(options)
      .then(response => makeSuccess(response))
      .catch((err) => makeError(err))
  }

  public static async triggerCall(req: TriggerCallRequest): Promise<SomeResult<void>> {
    const options = {
      url: `${baseUrl}/twiml/triggerCall`,
      method: 'POST',
      json: true,
      form: {
        ...req
      }
    }

    return request(options)
      .then(() => makeSuccess(undefined))
      .catch((err) => makeError(err))
  }

  public static async postTwiml(req: PostBotRequest): Promise<SomeResult<string>> {
    const options = {
      method: 'POST',
      // TODO: Parse out query params properly
      url: `${baseUrl}/twiml/${req.botId}/${req.blockId}?versionOverride=${req.versionOverride}`,
      json: true,
      //Mimic Twilio, which uses application/x-www-form-urlencoded
      form: req.body,
    }

    return request(options)
      .then(response => makeSuccess(response))
      .catch((err) => makeError(err))
  }

  public static async getBotConfig(botId: string, versionId: string): Promise<SomeResult<BotConfig>> {
    const options = {
      method: 'GET',
      url: `${baseUrl}/admin/content/${botId}/${versionId}`,
      json: true,
    }

    return request(options)
      .then(response => makeSuccess(response))
      .catch((err) => makeError(err))
  }

}