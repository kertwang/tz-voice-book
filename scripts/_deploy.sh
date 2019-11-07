#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source ${DIR}/../env/.compiled
source ${DIR}/../config/colors.sh
source ${DIR}/../config/version

if [ "${stage}" == "local" ]; then
  logErr 'Tried to run `_deploy.sh`, but stage is local. Change your stage and try again'
  exit 1
fi

logStep "Deploying... ${stage}"

# heroku container:push web
# heroku container:release web

logStep "Updating Environment Variables... ${stage}"
ENVIRONMENT=$(cat ${DIR}/../env/.compiled | grep 'export' | grep -v 'DATABASE_URL' | grep -v 'HEROKU_APP_NAME' | sed "s/^[^ ]* //")

heroku config:set ${ENVIRONMENT}
