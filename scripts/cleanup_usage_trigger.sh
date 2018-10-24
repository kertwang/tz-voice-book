#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "$DIR"/../env/env.production.sh
source "$DIR"/../env/.env.production.sh

TRIGGER_ID="$1"

curl -XDELETE https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Usage/Triggers/$TRIGGER_ID.json \
    -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN"