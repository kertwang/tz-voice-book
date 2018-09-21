#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

environment="development"

if [ "$1" == "production" ]; then 
  echo 'Deploying to production environment'
  environment="production"
  firebase use production
else
  firebase use development
fi

source "$DIR/env/env."$environment".sh" || exit 1 #public
source "$DIR/env/.env."$environment".sh" || exit 1 #private

# set the firebase env variables
firebase functions:config:set \
  config.twilio_account_sid="$TWILIO_ACCOUNT_SID" \
  config.twilio_auth_token="$TWILIO_AUTH_TOKEN" \
  config.base_url="$BASE_URL"\
  config.service_account_name="$SERVICE_ACCOUNT_NAME"\
  config.admin_sheet_id="$ADMIN_SHEET_ID"



firebase deploy --only functions