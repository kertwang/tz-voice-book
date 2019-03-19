import { User, Recording } from "./UserApi";
import { sleep, getDefaultVersionForBot, functionReplacer, functionReviver } from "../utils";
import { BotId, VersionId, BotConfig, PlayMessage, MessageType } from "../types_rn/TwilioTypes";
import { DFUser } from "../handlers/fn_dialogflow";
import { SomeResult, ResultType, makeError, makeSuccess } from "../types_rn/AppProviderTypes";
import { isNullOrUndefined } from "util";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { QuerySnapshot, DocumentReference } from "@google-cloud/firestore";




export type RelayUser = {
  callCount: number,
  countryCode: string,
}

export default class FirebaseApi {
  fs: any;

  constructor(fs: any) {
    this.fs = fs;
  }

  public getUser(userId: string, botId: string): Promise<User> {
    return this.fs.collection('bot').doc(botId).collection('users').doc(userId).get()
      .then((doc: any) => doc.data());
  }

  public createUserForMobile(mobile: string, botId: BotId): Promise<User> {
    const user = {
      mobile,
      //This is the version that new users will use by default.
      version: getDefaultVersionForBot(botId),
    };
    //TODO: should we add the id in here?
    return this.fs.collection('bot').doc(botId).collection('users').add(user);
  }

  /**
   * Get the user from their mobile number. 
   * If we don't already have a user for this number, lazy create one
   */
  public getUserFromMobile(mobile: string, botId: BotId): Promise<User> {
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

      return this.createUserForMobile(mobile, botId);
    });
  }

  public getRecordings(limit: number, botId: string): Promise<PlayMessage[]> {
    return this.fs.collection('bot').doc(botId).collection('recordings').orderBy('createdAt', 'asc').limit(limit).get()
    .then((sn: QuerySnapshot) => {
      const messages: PlayMessage[] = [];
      sn.forEach(doc => {
        //Get each document, put in the id
        const data = doc.data();
        data.id = doc.id;
        messages.push({
          type: MessageType.PLAY,
          url: data.url, //no need to append .mp3 here.
        });
      });

      return messages;
    });
  }

  /**
   * Save a feedback recording
   */
  public async saveFeedbackRecording(recording: Recording, botId: string): Promise<string> {
    return this.fs.collection('bot').doc(botId).collection('feedback').add(recording)
    .then((ref: DocumentReference) => ref.id)
    .catch((err: Error) => {
      console.log("Error in savePendingRecording", err);
      return Promise.reject(err);
    });
  }

  /**
   * Save a reading to the pending collection
   * 
   * Returns the id of the pending reading
   */
  public async savePendingRecording(recording: Recording, botId: string): Promise<string> {
    return this.fs.collection('bot').doc(botId).collection('pendingRecordings').add(recording)
    .then((ref: DocumentReference) => ref.id)
    .catch((err: Error) => {
      console.log("Error in savePendingRecording", err);
      return Promise.reject(err);
    });
  }

  /**
   * Get all pending recordings for a given callSid, newest first
   */
  public async getPendingRecordings(callSid: string, limit: number, botId: string): Promise<Recording[]> {
    return this.fs.collection('bot').doc(botId).collection('pendingRecordings').where('callSid', '==', callSid).limit(limit).get()
    .then((sn: QuerySnapshot) => {
      const recordings: Recording[] = [];
      sn.forEach(doc => {
        //Get each document, put in the id
        //@ts-ignore 
        //TODO: fix deser
        const recording: Recording = {
          ...doc.data(),
        };
        recordings.push(recording);
      });

      return recordings;
    });
  }

  /**
   * call getPendingRecordings with a number of retries.
   * This is because the callback to save the pending recording sometimes takes
   * too long, and causes the call to die
   */
  public async getPendingRecordingsWithRetries(botId: string, callSid: string, limit: number, retries: number, timeoutMs: number = 10): Promise<Recording[]> {
    const result = await this.getPendingRecordings(callSid, limit, botId);

    if (result.length > 0) {
      return result;
    }

    if (retries === 0) {
      console.log('Out of retries.');
      console.warn(`No pendingRecording found for botId: ${botId}, callSid: ${callSid}`);
      return result;
    }

    await sleep(timeoutMs);
    return this.getPendingRecordingsWithRetries(botId, callSid, limit, retries - 1, timeoutMs * 2);
  }

  public async deletePendingRecordingsForCall(callSid: string): Promise<any> {
    //TODO: implement this
    return Promise.resolve(true);
  }

  /**
   * Publish a recording for everyone else to listen to.
   * Returns the id of the recording
   */
  public postRecording(recording: Recording, botId: string): Promise<string> {
    return this.fs.collection('bot').doc(botId).collection('recordings').add(recording)
    .then((ref: DocumentSnapshot) => ref.id);
  }

  /**
   * Get the block content for the given call id and user.
   * 
   * This will be stored in firebase, parsed, and filled into the context object
   */
  public async getBotConfig(userId: string, botId: BotId): Promise<BotConfig> {
    const version = await this.getVersionForUser(userId, botId);
    return this.getBotConfigForVersion(userId, botId, version);
  }

  /**
   * getBotConfigOverride
   * 
   * Get the bot config, but override the user's version. This is useful for testing
   * different versions when the user can't configure the version for themselves
   */
  public async getBotConfigOverride(userId: string, botId: BotId, versionOverride: VersionId): Promise<BotConfig> {
    const version = await this.getVersionForUser(userId, botId, versionOverride);
    return this.getBotConfigForVersion(userId, botId, version);
  }

  public async getBotConfigForVersion(userId: string, botId: BotId, version: VersionId): Promise<BotConfig> {
    return this.fs.collection('bot').doc(botId).collection('version').doc(version).get()
      .then((doc: DocumentSnapshot) => doc.data())
      .then((rawConfig: any) => {
        if (!rawConfig) {
          throw new Error(`Couldn't getBotConfig for version: ${version} and botId: ${botId}`);
        }

        //RW-TODO: inject a dynamic level of bot config here?
        //we need to deserialize the functions that we saved for dynamic requests
        const configString = JSON.stringify(rawConfig, null, 2);
        const config: BotConfig = JSON.parse(configString, functionReviver);

        // const anyMessage: AnyMessageType = config.messages.entrypoint[0];
        // if (anyMessage.type === MessageType.DYNAMIC_SAY) {
        //   console.log("message is", anyMessage);
        //   console.log("saying message,",  anyMessage.func(['HELLO WORLD']));
        // }
        // console.log("getBotConfigForVersion, Bot config is", );

        return config;
      })
      .catch((err: Error) => {
        console.warn(err.message);
        throw new Error(`Couldn't getBotConfig for version: ${version} and botId: ${botId}`);
      });
  }

  //RW-TODO: specify other params here that can be overriden?
  //This makes it backwards compatible with storing vars in the users object, or specifying them dynamically at runtime
  public async getVersionForUser(userId: string, botId: string, override?: VersionId): Promise<VersionId> {
    //@ts-ignore
    if (!isNullOrUndefined(override) && override !== "undefined") {
      return override;
    }

    const user = await this.getUser(userId, botId);
    if (user.version) {

      //TODO: should also make sure the version code is correct
      return user.version;
    } 

    const defaultVersion = VersionId.tz_audio;
    console.warn(`No version found for userId: ${userId}, botId: ${botId}. Defaulting to: ${defaultVersion}`)

    //TODO: default to tz_audio version!
    return Promise.resolve(defaultVersion);
  }

  //
  // Admin Functions
  // ----------------------------

  public async deployConfigForBotAndVersion(new_botId: BotId, versionId: VersionId, config: BotConfig) {
    console.log(`Saving config to bot/${new_botId}/version/${versionId}/`);
    //Serialize the functions in BotConfig so they can be saved in firebase
    const serialized: any = JSON.parse(JSON.stringify(config, functionReplacer, 2));
    return this.fs.collection('bot').doc(new_botId).collection('version').doc(versionId).set(serialized);
  }


  //
  // DialogFlow API
  // ----------------------------

  public getDFUser(botId: string, sessionId: string): Promise<SomeResult<DFUser>> {
    return this.fs.collection('df').doc(botId).collection('users').doc(sessionId).get()
      .then((doc: any) => doc.data())
      .then((user: DFUser) => {
        if (!user) {
          throw new Error(`No user found for sessionId: ${sessionId}`);
        }

        return { type: ResultType.SUCCESS, result: user }
      })
      .catch((err: Error) => {
        return { type: ResultType.ERROR, message: err.message}
      });
  }

  public saveDFUser(botId: string, sessionId: string, user: DFUser): Promise<SomeResult<void>> {
    return this.fs.collection('df').doc(botId).collection('users').doc(sessionId).set(user)
    .then(() => ({ type: ResultType.SUCCESS, result: null }))
    .catch((err: Error) => ({ type: ResultType.ERROR, message: err.message }))
  }

  public saveResponse(botId: string, intent: string, response: string): Promise<SomeResult<void>> {
    return this.fs.collection('df').doc(botId).collection(intent).add({response})
    .then(() => ({ type: ResultType.SUCCESS, result: null }))
    .catch((err: Error) => ({ type: ResultType.ERROR, message: err.message }))
  }

  public getResponses(botId: string, intent: string): Promise<SomeResult<string[]>> {
    return this.fs.collection('df').doc(botId).collection(intent).get()
    .then((sn: QuerySnapshot) => {
      console.log()
      const responses: string[] = [];
      sn.forEach(doc => {
        //Get each document, put in the id
        const response = doc.data().response;
        responses.push(response);
      });

      return {
        type: ResultType.SUCCESS,
        result: responses,
      };
    })
    .catch((err: Error) => {
      console.log("getResponses error: ", err);
      return {
        type: ResultType.ERROR,
        message: err,
      };
    })
  }


  //
  // VB Relay API
  //------------------------------

  public async getRelayUser(botId: string, userId: string): Promise<SomeResult<RelayUser>> {
    return this.fs.collection('relay').doc(botId).collection('user').doc(userId).get()
    .then((doc: FirebaseFirestore.DocumentSnapshot) => {
      const data = doc.data();
      if (!data) {
        return makeError(`No data found for userId: ${userId}`);
      }

      const user: RelayUser = {
        callCount: data.callCount,
        countryCode: data.countryCode,
      };
      return makeSuccess(user);
    })
    .catch((err: Error) => makeError(err.message));
  }
}
