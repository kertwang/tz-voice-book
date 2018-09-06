import { User, Recording } from "./UserApi";
import fs from './Firestore';



export default class FirebaseApi {
  fs: any;

  constructor() {

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
   * get all of the pending recordings for the user
   * Deprecated: This won't work as we expect
   */
  public dep_getPendingRecordingsForUser(userId: string, limit: number): Promise<Recording[]> {
    return this.fs.collection('users').doc(userId)
      .collection('pendingReadings').orderBy('createdAt', 'desc')
      .limit(limit)
      .get()
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
   * Save a reading to the pending collection
   * 
   * Returns the id of the pending reading
   */
  public async savePendingRecording(recording: Recording): Promise<string> {
    return this.fs.collection('pendingRecordings').add(recording)
    .then(ref => ref.id);
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
   * Save a recording to the user's pending reading collection
   * returns an id to refer to the reading later on
   * 
   * Deprecated: This won't work as we expect. Pending readings don't have a mobile number attached
   */
  public async dep_savePendingRecording(userId: string, recording: Recording): Promise<string> {
    return this.fs.collection('users').doc(userId).collection('pendingReadings').add(recording)
    .then(ref => ref.id)
  }

  /**
   * Get a reading from a user's pendingRecording collection
   */
  public dep_getPendingRecording(userId: string, pendingId: string): Promise<Recording> {
    //No need to deserialize just yet, no methods on the Recording type...
    return this.fs.collection('users').doc(userId).collection('pendingReadings').doc(pendingId).get();
  }

  /**
   * Publish a recording for everyone else to listen to.
   * Returns the id of the recording
   */
  public postRecording(recording: Recording): Promise<string> {
    return this.fs.collection('recordings').add(recording)
    .then(ref => ref.id);
  }
}