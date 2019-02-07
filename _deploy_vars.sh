#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source /tmp/tz_env
firebase use "$stage"


# ENVIRONMENT=`cat "$DIR"/.environment`
# firebase use "$ENVIRONMENT"

# source "$DIR/env/env.$ENVIRONMENT.sh" #public
# source "$DIR/env/.env.$ENVIRONMENT.sh" #private

# set the firebase env variables
firebase functions:config:set \
  config.twilio_account_sid="$TWILIO_ACCOUNT_SID" \
  config.twilio_auth_token="$TWILIO_AUTH_TOKEN" \
  config.twilio_outbound_number="$TWILIO_OUTBOUND_NUMBER" \
  config.temporary_insecure_auth_key="$TEMPORARY_INSECURE_AUTH_KEY" \
  config.base_url="$BASE_URL" \
  config.service_account_key_file_name="$serviceAccountKeyFileName" \
  config.database_url="$databaseUrl" \
  config.storage_bucket="$storageBucket" \
  config.informal_notification_url="$informal_notification_url" \
  config.formal_notification_url="$formal_notification_url" \
  config.mm_101_url="$mm_101_url" \
  config.should_log="$should_log" \
  config.should_display_english_test_call="$should_display_english_test_call" \
  config.test_call_url="$test_call_url" \
  config.relay_default_country_code="$relay_default_country_code" \
  config.url_prefix="$urlPrefix" \
  config.firebase_token="$firebaseToken" 


## Get any remote firebase config
firebase functions:config:get > "$DIR"/functions/.runtimeconfig.json