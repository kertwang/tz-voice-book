

#Put public env vars here

export stage="production"
export HEROKU_APP_NAME='vb-server-production'

export VERBOSE_LOG=true
export LOG_TWILIO_RESPONSE=true
export LT_SUBDOMAIN="lwilld3"
export serviceAccountKeyFileName=".serviceAccountKey.json"
export databaseUrl="https://tz-phone-book.firebaseio.com"
export storageBucket=tz-phone-book.appspot.com

# export BASE_URL="https://$LT_SUBDOMAIN.localtunnel.me/tz-phone-book/us-central1"

# Public
export BASE_URL="https://us-central1-tz-phone-book.cloudfunctions.net"
export relay_default_country_code="AU"

# Urls for DialogFlow
export formal_notification_url="https://us-central1-tz-phone-book.cloudfunctions.net/twiml/senegalNotification/entrypoint?versionOverride=wl_audio"
export informal_notification_url="https://us-central1-tz-phone-book.cloudfunctions.net/twiml/senegalNotification/entrypoint?versionOverride=wl_audio"
export mm_101_url="https://us-central1-tz-phone-book.cloudfunctions.net/twiml/senegalMobileMoney/entrypoint?versionOverride=wl_audio"
export should_display_english_test_call="false"
export test_call_url=""
export urlPrefix="https://www.googleapis.com/download/storage/v1/b/tz-phone-book.appspot.com/o/"
export firebaseToken="1536715274666696"

export should_log='false'