#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "$DIR"/../env/env.production.sh
source "$DIR"/../env/.env.production.sh


curl -XPOST https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Usage/Triggers.json \
    -d "CallbackUrl=https://hooks.zapier.com/hooks/catch/3799775/eo4i6g/" \
    -d "UsageCategory=totalprice" \
    -d "FriendlyName=test_trigger" \
    -d "TriggerBy=price" \
    -d "TriggerValue=0.7000" \
    -d "Recurring=daily" \
    -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN"



