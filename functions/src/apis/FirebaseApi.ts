import { User, Recording } from "./UserApi";
import { sleep } from "../utils";


export default class FirebaseApi {
  fs: any;

  constructor(fs: any) {
    this.fs = fs;
  }

  public getUser(userId: string): Promise<User> {
    return this.fs.collection('users').doc(userId).get();
  }


  public createUserForMobile(mobile: string): Promise<User> {
    const user = {
      mobile,
    };
    //TODO: should we add the id in here?
    return this.fs.collection('users').add(user);
  }

  /**
   * Get the user from their mobile number. 
   * If we don't already have a user for this number, lazy create one
   */
  public getUserFromMobile(mobile: string): Promise<User> {
    return this.fs.collection('users').where('mobile', '==', mobile).limit(1).get()
    .then(sn => {
      const users: User[] = [];
      sn.forEach(doc => {
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
    return this.fs.collection('messages').orderBy('createdAt', 'desc').limit(limit).get()
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
   * Save a reading to the pending collection
   * 
   * Returns the id of the pending reading
   */
  public async savePendingRecording(recording: Recording): Promise<string> {
    return this.fs.collection('pendingRecordings').add(recording)
    .then(ref => ref.id)
    .catch(err => {
      console.log("Error in savePendingRecording", err);
      return Promise.reject(err);
    })
  }


  /**
   * Get all pending recordings for a given callSid, newest first
   */
  public async getPendingRecordings(callSid: string, limit: number): Promise<Recording[]> {
    return this.fs.collection('pendingRecordings').where('callSid', '==', callSid).limit(limit).get()
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
    return this.fs.collection('recordings').add(recording)
    .then(ref => ref.id);
  }

  /**
   * Get the block content for the given call id and user.
   * 
   * This will be stored in firebase, parsed, and filled into the context object
   */
  public getBlockContent(callSid: string, userId: string): any {
    //TODO: implement configurable stuff.

    const condition = this.getConditionForCallAndUserId(callSid, userId);

    return this.fs.collection('content').doc(condition).get()
    .then(doc => doc.data());
  }

  public getConditionForCallAndUserId(callSid: string, userId: string): string {
    //TODO: implement based on a bunch of settings.
    return 'default';
  }
}