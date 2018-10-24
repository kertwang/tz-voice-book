----
Twilio Usage Trigger Setup
----

This guide is how we can make a usage trigger to alert us when our twilio spend is too large



```bash
cd scripts
./create_usage_trigger.sh
```

Here's a example of what Twilio sends to Zapier

```bash
curl -X POST \
  https://hooks.zapier.com/hooks/catch/3799775/eo4i6g/ \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: e5afdcb8-52ed-4164-8e6c-7e877c3781a9' \
  -H 'cache-control: no-cache' \
  -d '{
   "usage_record_uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Usage/Records.json?Category=sms", 
   "date_updated": "Sat, 13 Oct 2012 21:32:30 +0000", 
   "date_fired": null, 
   "friendly_name": "Trigger for sms at usage of 1000", 
   "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Usage/Triggers/UTc142bed7b38c4f8186ef41a309814fd2.json", 
   "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 
   "callback_method": "POST", 
   "trigger_by": "usage", 
   "sid": "UTc142bed7b38c4f8186ef41a309814fd2", 
   "current_value": "57", 
   "date_created": "Sat, 13 Oct 2012 21:32:30 +0000", 
   "callback_url": "http://www.example.com", 
   "recurring": null, 
   "usage_category": "sms", 
   "trigger_value": "1000.000000"
}'
```



triggers to delete:
UTa503b834b9bd4e81a67067e920c430e9
UTc0d2906d02f847eb819e1906e0706e4a
