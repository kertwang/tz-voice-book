----
Analyse Logs
----


## Setup

1. Go to `console.cloud.google.com/logs`
2. Select your project - eg. `tz-phone-book` or `tz-phone-book-dev`
3. At the top, select `Create Export`. Give it a sync name and destination that is alphanumeric + underscores
4. Now all of your logs will be going to BiqQuery!



## Query Samples




__Simple Get__

```sql
SELECT * FROM `tz-phone-book.TZPhoneBook.cloudfunctions_googleapis_com_cloud_functions_20181023` LIMIT 1000
```

__Extract Block from JSON__

```sql
SELECT JSON_EXTRACT_SCALAR(textPayload, '$.type') FROM `tz-phone-book.TZPhoneBook.cloudfunctions_googleapis_com_cloud_functions_20181023` LIMIT 1000
```

__Get all JSON logs__

```sql
SELECT textPayload FROM `tz-phone-book.TZPhoneBook.*` WHERE textPayload LIKE '%"type"%' LIMIT 1000
```

__Get all BLOCK logs__
```sql
SELECT textPayload FROM `tz-phone-book.TZPhoneBook.*` WHERE textPayload LIKE '%"type":"BLOCK"%' LIMIT 1000
```

__Structured Block Logs__

>Example JSON:
```json
{"time":"2018-10-23T00:31:03.825Z","type":"BLOCK","blockId":"entrypoint","mobile":"+61410237238","pageParams":{"page":0,"pageSize":1,"maxMessages":10}} 
```

```sql
SELECT
  JSON_EXTRACT_SCALAR(textPayload, '$.type') as type,
  JSON_EXTRACT_SCALAR(textPayload, '$.time') as time,
  JSON_EXTRACT_SCALAR(textPayload, '$.blockId') as blockId,
  JSON_EXTRACT_SCALAR(textPayload, '$.mobile') as mobile,
  JSON_EXTRACT_SCALAR(textPayload, '$.pageParams.page') as page,
  JSON_EXTRACT_SCALAR(textPayload, '$.pageParams.pageSize') as pageSize,
  JSON_EXTRACT_SCALAR(textPayload, '$.pageParams.maxMessages') as maxMessages

FROM `tz-phone-book.TZPhoneBook.*` WHERE textPayload LIKE '%"type":"BLOCK"%' LIMIT 1000
```

