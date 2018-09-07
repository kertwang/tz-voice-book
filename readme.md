# Phone Book

A demo application for an IVR based social network.



## Client Side API:

1. user calls in, selects option 1
2. says message, presses hash/timeout
3. twilio saves as voicemail
4. Calls http request, saves voicemail url to firebase cloudstore



## Running Locally:


```bash
curl -X POST  https://lwilld.localtunnel.me/tz-phone-book/us-central1/message
```


curl -X POST \
  https://us-central1-tz-phone-book.cloudfunctions.net/message/1 \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 2f45420c-65f8-4c37-9fbd-d89e7e17ca59' \
  -d '{
  "audioUrl": "string",
  "phone": "string"
}'


----
## FB Api:

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



## Configuring twilio url:

Example url for ngrok:
`http://4e27e9ad.ngrok.io/tz-phone-book/us-central1/benchmark/entrypoint`


## Ffmpeg is awesome!
```bash
ffmpeg benchmark_test_3.mp3 -i benchmark_test_3.m4a -codec:a libmp3lame -qscale:a 1
```