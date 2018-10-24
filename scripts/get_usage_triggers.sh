#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "$DIR"/../env/env.production.sh
source "$DIR"/../env/.env.production.sh


curl -G https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Usage/Triggers.json \
    -d "TriggerBy=price" \
    -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN"