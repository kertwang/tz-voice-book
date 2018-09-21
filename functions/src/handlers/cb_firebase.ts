import { functions } from '../apis/Firestore';


export const feedback = functions.firestore.document('bot/{:botId}/feedback/')
  .onWrite((change, context) => {
    // ... Your code here
  });


/**
 * posted a new pending recording
 * /bot/{:botId}/pendingRecordings
 * 
 * published the recording
 * /bot/{:botId}/recordings
 * 
 * new uer
 * /bot/{:botId}/users
 */