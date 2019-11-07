#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source ${DIR}/../env/.compiled
source ${DIR}/../config/colors.sh
source ${DIR}/../config/version

if [ ${stage} == "local" ]; then
  logErr "stage is local. cannot set the DATABASE_URL."
  exit 1
fi

# Perl doesn't like @ chars, so we need to escape them out
RAW_DATABASE_URL=$(heroku config:get DATABASE_URL)
REPLACE="\@ec2"
NEW_DATABASE_URL="${RAW_DATABASE_URL/\@ec2/$REPLACE}"  

if [ ${NEW_DATABASE_URL} == "" ]; then
  logErr "Error getting the database url."
  exit 1
fi

perl -pi -e s,DATABASE_URL=.*$,DATABASE_URL=${NEW_DATABASE_URL},g ${DIR}/../env/.env.${stage}.sh

logNote "Updated DATABASE_URL: ${NEW_DATABASE_URL}"