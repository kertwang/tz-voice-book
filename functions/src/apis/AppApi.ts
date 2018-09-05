import * as moment from 'moment';
import FirebaseApi from "./FirebaseApi";
import { fstat } from 'fs';

/**
 * UserApi is the api we use to keep a track of users based
 * on their phone number and interactions
 */


export type User = {
  mobile: string,
  name: string,
  id: string,
}

export type Recording = {
  mobile: string,
  userId: string,
  url: string,
  createdAt: string,
}


export default class AppApi {
  private fb: FirebaseApi;
  private user: User;


  public static async fromMobileNumber(fb: FirebaseApi, mobile: string): Promise<AppApi> {
    const api = new AppApi();  
    api.fb = fb;
    //Set up the user api from the mobile number
    api.user = await fb.getUserFromMobile(mobile);

    return api;
  }

  public getUser(): User {
    return this.user;
  } 

  /**
   * Save a recording to the user's pending recordings list
   */
  public savePendingRecording(url: string): Promise<any> {
    const recording: Recording = {
      mobile: this.user.mobile,
      userId: this.user.id,
      url,
      createdAt: moment().toISOString(),
    }

    return this.fb.savePendingRecording(this.user.id, recording);
  }

  /**
   * Publish a recording from ther user's pending list, and remove it
   */
  public async publishRecordingFromPendingList(pendingId: string): Promise<any> {
    const recording: Recording = await this.fb.getPendingRecording(this.user.id, pendingId);
    const recordingId: string = await this.fb.postRecording(recording);

    return recordingId;
  }

}