#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "$DIR/env/.env.sh"

# set the firebase env variables
firebase functions:config:set \
  config.twilio_account_sid=$TWILIO_ACCOUNT_SID \
  config.twilio_auth_token=$TWILIO_AUTH_TOKEN


firebase deploy --only functions