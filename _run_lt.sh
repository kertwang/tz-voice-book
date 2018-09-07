#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "$DIR"/env/env.sh

lt --subdomain "$LT_SUBDOMAIN" --port 5000


#eg: curl -X POST  https://lwilld.localtunnel.me/tz-phone-book/us-central1/message

# for when lt doesn't work for some reason
# ngrok http 5000