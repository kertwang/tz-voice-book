#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "$DIR/env/env.sh" #public
source "$DIR/env/.env.sh" #private

# set the firebase env variables
firebase functions:config:set \
  config.twilio_account_sid="$TWILIO_ACCOUNT_SID" \
  config.twilio_auth_token="$TWILIO_AUTH_TOKEN" \
  config.twilio_outbound_number="$TWILIO_OUTBOUND_NUMBER" \
  config.temporary_insecure_auth_key="$TEMPORARY_INSECURE_AUTH_KEY" \
  config.base_url="$BASE_URL"


# firebase deploy --only functions