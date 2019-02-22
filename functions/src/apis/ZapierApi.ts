
import * as request from 'request-promise-native';
import { optOutWebookUrl } from '../utils/Env';

export default class ZapierApi {

  /**
   * optOut
   * 
   * Send a request to zapier to opt out 
   * Works only for Rungwe atm
   * 
   * 
   */
  public static optOut(mobile: string): Promise<void> {

    const options = {
      url: optOutWebookUrl,
      body: {
        mobile,
      },
      json: true,
    };

    return request(options)
    .then((response: any) => console.log(response))
    .catch((err: Error) => {
      console.warn(`ZapierApi.optOut error: ${err.message}`);
    });
  }


}