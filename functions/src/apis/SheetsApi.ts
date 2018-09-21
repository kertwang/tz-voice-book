


export type AuthCredentials {

}

export function authorize(credentials) {

}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * 
 * From: https://developers.google.com/sheets/api/quickstart/nodejs
 * 
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  
console.log('Authorize this app by visiting this url:', authUrl);
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
});
rl.question('Enter the code from that page here: ', (code) => {
rl.close();
oAuth2Client.getToken(code, (err, token) => {
if (err) return console.error('Error while trying to retrieve access token', err);
oAuth2Client.setCredentials(token);
// Store the token to disk for later program executions
fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) console.error(err);
    console.log('Token stored to', TOKEN_PATH);
});
callback(oAuth2Client);
});
});
}
