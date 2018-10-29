#Put public env vars here

export VERBOSE_LOG=true
export LOG_TWILIO_RESPONSE=true
export LT_SUBDOMAIN="lwilld3"
export serviceAccountKeyFileName=".serviceAccountKey.development.json"
export databaseUrl="https://tz-phone-book-dev.firebaseio.com"
export storageBucket="tz-phone-book-dev.appspot.com"

# export BASE_URL="https://$LT_SUBDOMAIN.localtunnel.me/tz-phone-book/us-central1"

# Public
export BASE_URL="https://us-central1-tz-phone-book-dev.cloudfunctions.net"

# Urls for DialogFlow
export formal_notification_url="https://us-central1-tz-phone-book-dev.cloudfunctions.net/twiml/senegalNotification/entrypoint?versionOverride=sg_text_formal"
export informal_notification_url="https://us-central1-tz-phone-book-dev.cloudfunctions.net/twiml/senegalNotification/entrypoint?versionOverride=sg_text_informal"
export mm_101_url="https://us-central1-tz-phone-book-dev.cloudfunctions.net/twiml/mm101/entrypoint?versionOverride=sg_text"


export should_log='true'