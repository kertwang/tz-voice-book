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


### 2.0 `GET /recents`

Gets the 5 most recent messages, in descending date order

Request:
```js
```

Response:

```js
[
 {
   "id":"string",
   "createdAt": "string", //ISO Format date
   "audioUrl": "string", 
 } 
 //...
]
```

