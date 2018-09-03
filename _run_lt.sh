#!/usr/bin/env bash

lt --subdomain lwilld3 --port 5000


#eg: curl -X POST  https://lwilld.localtunnel.me/tz-phone-book/us-central1/message

# for when lt doesn't work for some reason
# ngrok http -hostname=dev.example.com 5000