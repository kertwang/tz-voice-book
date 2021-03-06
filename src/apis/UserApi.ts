import FirebaseApi from "./FirebaseApi";
import { VersionId, BotId } from '../types_rn/TwilioTypes';

/**
 * UserApi is the api we use to keep a track of users based
 * on their phone number and interactions
 */

export type User = {
  mobile: string,
  name: string,
  id: string,
  version: VersionId,
}

export type Recording = {
  url: string,
  createdAt: string,
  callSid: string,
}

export default class UserApi {
  // private fb: FirebaseApi;
  private user: User;

  constructor(fb: FirebaseApi, user: User) {
    // this.fb = fb;
    this.user = user;
  }


  public static async fromMobileNumber(fb: FirebaseApi, botId: BotId, mobile: string): Promise<UserApi> {
    const user = await fb.getUserFromMobile(mobile, botId);
    const api = new UserApi(fb, user);  

    return api;
  }

  public getUser(): User {
    return this.user;
  } 

  // /**
  //  * Save a recording to the user's pending recordings list
  //  */
  // public savePendingRecording(url: string): Promise<any> {
  //   const recording: Recording = {
  //     mobile: this.user.mobile,
  //     userId: this.user.id,
  //     url,
  //     createdAt: moment().toISOString(),
  //   }

  //   return this.fb.savePendingRecording(this.user.id, recording);
  // }


  // /**
  //  * Get the pending recordings from the user, newest first
  //  */
  // public async getPendingRecordings(limit: number): Promise<Recording[]> {
  //   const recordings: Recording[] = await this.fb.getPendingRecordingsForUser(this.user.id, 5);
  //   return recordings;
  // }


  // /**
  //  * Publish a recording from ther user's pending list, and remove it
  //  */
  // public async publishRecordingFromPendingList(pendingId: string): Promise<any> {
  //   const recording: Recording = await this.fb.getPendingRecording(this.user.id, pendingId);
  //   const recordingId: string = await this.fb.postRecording(recording);

  //   return recordingId;
  // }

}