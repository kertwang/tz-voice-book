import { User, Recording } from "./UserApi";
import { sleep } from "../utils";
import { MessageMap, BlockMap, FlowMap, BotId, VersionId, BotConfig } from "../types_rn/TwilioTypes";

const botId = 'voicebook'; //This is temporary, todo: change this later on.

export default class FirebaseApi {
  fs: any;

  constructor(fs: any) {
    this.fs = fs;
  }

  public getUser(userId: string): Promise<User> {
    return this.fs.collection('bot').doc(botId).collection('users').doc(userId).get()
      .then((doc: any) => doc.data());
  }

  public createUserForMobile(mobile: string): Promise<User> {
    const user = {
      mobile,
      //This is the version that new users will use by default.
      version: VersionId.en_us, //This is the only one for now
    };
    //TODO: should we add the id in here?
    return this.fs.collection('bot').doc(botId).collection('users').add(user);
  }

  /**
   * Get the user from their mobile number. 
   * If we don't already have a user for this number, lazy create one
   */
  public getUserFromMobile(mobile: string): Promise<User> {
    return this.fs.collection('bot').doc(botId).collection('users').where('mobile', '==', mobile).limit(1).get()
    .then((sn: any) => {
      const users: User[] = [];
      sn.forEach((doc: any)=> {
        const data = doc.data();
        data.id = doc.id;
        users.push(data);
      });

      return users
    })
    .then((users: User[]) => {
      if (users.length !== 0) {
        return users[0];
      }

      return this.createUserForMobile(mobile);
    });
  }

  public getMessages(limit: number): Promise<any> {
    return this.fs.collection('bot').doc(botId).collection('messages').orderBy('createdAt', 'desc').limit(limit).get()
    .then(sn => {
      const messages: any = [];
      sn.forEach(doc => {
        //Get each document, put in the id
        const data = doc.data();
        data.id = doc.id;
        messages.push(data);
      });

      return messages;
    });
  }

  /**
   * Save a feedback recording
   */
  public async saveFeedbackRecording(recording: Recording): Promise<string> {
    return this.fs.collection('bot').doc(botId).collection('feedback').add(recording)
      .then(ref => ref.id)
      .catch(err => {
        console.log("Error in savePendingRecording", err);
        return Promise.reject(err);
      });
  }

  /**
   * Save a reading to the pending collection
   * 
   * Returns the id of the pending reading
   */
  public async savePendingRecording(recording: Recording): Promise<string> {
    return this.fs.collection('bot').doc(botId).collection('pendingRecordings').add(recording)
    .then(ref => ref.id)
    .catch(err => {
      console.log("Error in savePendingRecording", err);
      return Promise.reject(err);
    });
  }

  /**
   * Get all pending recordings for a given callSid, newest first
   */
  public async getPendingRecordings(callSid: string, limit: number): Promise<Recording[]> {
    return this.fs.collection('bot').doc(botId).collection('pendingRecordings').where('callSid', '==', callSid).limit(limit).get()
    .then((sn: any) => {
      const recordings: Recording[] = [];
      sn.forEach(doc => {
        //Get each document, put in the id
        const data = doc.data();
        data.id = doc.id;
        recordings.push(data);
      });

      return recordings;
    });
  }

  /**
   * call getPendingRecordings with a number of retries.
   * This is because the callback to save the pending recording sometimes takes
   * too long, and causes the call to die
   */
  public async getPendingRecordingsWithRetries(callSid: string, limit: number, retries: number, timeoutMs: number = 10): Promise<Recording[]> {
    const result = await this.getPendingRecordings(callSid, limit);
    // console.log("retries, ", retries, "sleeping for:", timeoutMs);

    if (result.length > 0) {
      return result;
    }

    if (retries === 0) {
      console.log('Out of retries. Returning a bad result.');
      return result;
    }

    await sleep(timeoutMs);
    return this.getPendingRecordingsWithRetries(callSid, limit, retries - 1, timeoutMs * 2);
  }

  public async deletePendingRecordingsForCall(callSid: string): Promise<any> {
    //TODO: implement this
    return Promise.resolve(true);
  }

  /**
   * Publish a recording for everyone else to listen to.
   * Returns the id of the recording
   */
  public postRecording(recording: Recording): Promise<string> {
    return this.fs.collection('bot').doc(botId).collection('recordings').add(recording)
    .then(ref => ref.id);
  }

  /**
   * Get the block content for the given call id and user.
   * 
   * This will be stored in firebase, parsed, and filled into the context object
   */
  public async getBotConfig(callSid: string, userId: string): Promise<BotConfig> {
    //TODO: implement configurable stuff.

    const version = await this.getVerionForUser(userId);

    return this.fs.collection('bot').doc(botId).collection('version').doc(version).get()
    .then(doc => doc.data());
  }

  public async getVerionForUser( userId: string): Promise<VersionId> {
    const user = await this.getUser(userId);
    if (user.version) {

      //TODO: should also make sure the version code is correct
      return user.version;
    } 
    //TODO: default to tz_audio version!
    return Promise.resolve(VersionId.en_us);
  }

  //
  // Admin Functions
  // ----------------------------

  public async deployConfigForBotAndVersion(new_botId: BotId, versionId: VersionId, config: BotConfig) {
    console.log(`Saving config to bot/${new_botId}/version/${versionId}/`);
    return this.fs.collection('bot').doc(new_botId).collection('version').doc(versionId).set(config);
  }
}
