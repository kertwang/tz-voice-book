"use strict";
exports.__esModule = true;
var Firestore_1 = require("../apis/Firestore");
/**
 * Firebase admin middleware
 * taken from: https://github.com/firebase/functions-samples/blob/master/authorized-https-endpoint/functions/index.js
 *
 * Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
 * The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
 * `Authorization: Bearer <Firebase ID Token>`.
 * when decoded successfully, the ID Token content will be added as `req.user`.
 */
function FirebaseAuth(req, res, next) {
    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
        !(req.cookies && req.cookies.__session)) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.', 'Make sure you authorize your request by providing the following HTTP header:', 'Authorization: Bearer <Firebase ID Token>', 'or by passing a "__session" cookie.');
        res.status(403).send('Unauthorized');
        return;
    }
    var idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    }
    else if (req.cookies) {
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    }
    else {
        // No cookie
        res.status(403).send('Unauthorized');
        return;
    }
    Firestore_1.admin.auth().verifyIdToken(idToken).then(function (decodedIdToken) {
        //@ts-ignore
        req.user = decodedIdToken;
        next();
        return;
    })["catch"](function (error) {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
    });
}
exports["default"] = FirebaseAuth;
;
