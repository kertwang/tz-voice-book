import express from 'express';
/**
 * Firebase admin middleware
 * taken from: https://github.com/firebase/functions-samples/blob/master/authorized-https-endpoint/functions/index.js
 *
 * Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
 * The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
 * `Authorization: Bearer <Firebase ID Token>`.
 * when decoded successfully, the ID Token content will be added as `req.user`.
 */
export default function FirebaseAuth(req: express.Request, res: express.Response, next: () => void): void;
