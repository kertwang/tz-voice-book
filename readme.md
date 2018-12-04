# VoiceBook

A demo application for an IVR based social network.

## Installation

Prerequisites:
- yarn `it's nicer than npm`
- firebase cli tools `npm install -g firebase-tools`
- localtunnel `npm install -g lt`
- gulp (for admin tools) `npm install -g gulp`

Steps:  
```bash
#Login to your firebase account
firebase login

#List your projects, and check for a the tz-phone-book project:
#If you can't see an entry called 'tz-phone-book', contact Lewis to get you access
firebase list


#Install node modules
cd functions 
yarn
```

## Running Locally:

```bash
#First, we run localtunnel to expose our local webserver publicly:
./_run_lt.sh

#then, in a separate terminal session, run:
./run_local.sh

#This runs the firebase functions in a firebase emulation mode.
```

[todo: talk about node version issues]
[todo: talk about base url stuff]


## Deployment

1. Start by ensuring you have the correct environment variables setup:

You need a `.env.sh` file in `./env`, which contains the following:
```bash
#Put private env vars here.
export TWILIO_ACCOUNT_SID='<insert_me>'
export TWILIO_AUTH_TOKEN='<insert_me>'

```

and the BASE_URL entry in `env.sh` should point to the firebase endpoint:
```bash
export BASE_URL="https://us-central1-tz-phone-book.cloudfunctions.net"
```

2. Run the deployment script.

```bash
./_deploy.sh
```
This script sets the environment variables we set up earlier, and then deploys the firebase functions



3. Now we just need to point our Twilio number to our deployment.   
Log into Twilio > Programmable Voice > Numbers > Manage Numbers > Select a Number >
Under 'Voice & Fax' > 'A Call Comes In', set to the entrypoint url for the firebase function  
eg:`https://us-central1-tz-phone-book.cloudfunctions.net/benchmark/entrypoint`

![deployment_number](./docs/deployment_number.png)


### Deploying Bot Content

The bot content is deployed separately from the above endpoints. This means we can dynamically change content without
having to perform an entire deployment

```bash
cd functions/src/admin
gulp deploy_config 
gulp deploy_audio
```

----
## Firebase Api: [DEPRECTATED]

### 1.0 `POST /message`

Creates a new message, and saves to cloud store

Request:
```js
{
  "audioUrl": "string",       //the url to the twilio recording
  "phone": "string"           //international format
}
```


Response:
```js
{
  "id":"string" //the id of the saved message in firestore
}
```

For example:

```bash
curl -X POST \
  http://localhost:5000/tz-phone-book/us-central1/message \
  -H 'Content-Type: application/json' \
  -d '{
  "audioUrl": "https://api.twilio.com/2010-04-01/Accounts/ACc628835716a7f404b36a44114e05719b/Recordings/RE33899fd6eaaf8506f41b3a586599253d.mp3",
  "phone":"12345"
}'
```


### 2.0 `GET /recents`

Gets the 5 most recent messages, in descending date order

Request:

params:

Response:

**note: the root json object must be a JSON dict in order for twilio to parse it correctly**

```js
{
  "messages":
  [
    {
      "id":"string",
      "createdAt": "string", //ISO Format date
      "audioUrl": "string", 
    } 
    //...
  ]
}
```



For example:

```bash
curl http://localhost:5000/tz-phone-book/us-central1/message \
  -H 'Content-Type: application/json'
```



http://localhost:5000/tz-phone-book/us-central1/message?stringFormat=true


## Development:

### Terms:

- __Block__: A block is a collection of commands which get converted to TwiML
- __Message__: A message is a 'say' or 'play' containing either text to be said, or a url pointing to an audio file to be played
- __Flow__: A flow describes the relationship between different blocks


## Configuring twilio url:

Example url for ngrok: `http://4e27e9ad.ngrok.io/tz-phone-book/us-central1/benchmark/entrypoint
`

Example request for localtunnel:
`curl -X POST "https://lwilld3.localtunnel.me/tz-phone-book/us-central1/twiml/entrypoint"`

Benchmark url for Firebase deployment `https://us-central1-tz-phone-book.cloudfunctions.net/twiml/entrypoint`


## Handy Snippets

### Convert audio with ffmpeg

```bash
ffmpeg benchmark_test_3.mp3 -i benchmark_test_3.m4a -codec:a libmp3lame -qscale:a 1
```


### Testing locally with curl:

```bash
curl -X POST \
  https://lwilld3.localtunnel.me/tz-phone-book/us-central1/twiml/intro_0 \
  -H 'Postman-Token: d1ec563e-975d-4860-bc54-a4cdf8c5a45c' \
  -d '{
	"From":"<redacted>"
}'
```


#### Trigger an outbound call using the api
``` bash
curl -X POST \
  'https://us-central1-tz-phone-book-dev.cloudfunctions.net/twiml/triggerCall?temporaryInsecureAuthKey=<redacted>' \
  -H 'Content-Type: application/json' \c
  -H 'cache-control: no-cache' \
  -d '{
	"mobile": "<redacted>",
	"url": "https://us-central1-tz-phone-book-dev.cloudfunctions.net/twiml/senegalNotification/entrypoint?versionOverride=en_au"
}'
```




```bash
NO_1=+61410237238
NO_2=+19783999202
NO_3=+17862179055
NO_4=+18322476664


URL="https://us-central1-tz-phone-book-dev.cloudfunctions.net/twiml/triggerCall?temporaryInsecureAuthKey=xP6mXwOpuJTYzs2Enxi"
CALL_URL=https://us-central1-tz-phone-book-dev.cloudfunctions.net/twiml/senegalNotification/entrypoint?versionOverride=en_au

curl -X POST $URL -H 'Content-Type: application/json' -d '{ "mobile": ""$NO_1"", "url": "$CALL_URL"}'

```



## Urls:

### DF Webhook url variants:
http://localhost:5000/tz-phone-book-dev/us-central1/dialogflow-dialogflowFirebaseFulfillment
https://lwilld3.localtunnel.me/tz-phone-book-dev/us-central1/dialogflow-dialogflowFirebaseFulfillment
https://us-central1-tz-phone-book-dev.cloudfunctions.net/dialogflow-dialogflowFirebaseFulfillment



### Get responses

https://lwilld3.localtunnel.me/tz-phone-book-dev/us-central1/twiml/uncdfBot/tripSummaryStruggleCapture/responses
https://lwilld3.localtunnel.me/tz-phone-book-dev/us-central1/twiml/uncdfBot/conclusionOneThingCapture/responses

https://us-central1-tz-phone-book-dev.cloudfunctions.net/twiml/uncdfBot/shareQuestionCapture/responses
https://us-central1-tz-phone-book-dev.cloudfunctions.net/twiml/uncdfBot/improveNotificationMessageCapture/responses
https://us-central1-tz-phone-book-dev.cloudfunctions.net//twiml/uncdfBot/tripSummaryStruggleCapture/responses
https://us-central1-tz-phone-book-dev.cloudfunctions.net/twiml/uncdfBot/conclusionOneThingCapture/responses


https://lwilld3.localtunnel.me/tz-phone-book-dev/us-central1/twiml/uncdfBot/responses
https://us-central1-tz-phone-book-dev.cloudfunctions.net/twiml/uncdfBot/responses


### Relay URL

https://lwilld3.localtunnel.me/tz-phone-book-dev/us-central1/admin/triggerCallFromRelay
https://us-central1-tz-phone-book-dev.cloudfunctions.net/admin/triggerCallFromRelay