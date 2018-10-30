#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

#make sure we are using nvm, which will set node v6.11
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

source /tmp/tz_env

# ENVIRONMENT=`cat "$DIR"/.environment`
firebase use "$stage"


# ## set up envs
# source "$DIR/env/env.$ENVIRONMENT.sh" #public
# source "$DIR/env/.env.$ENVIRONMENT.sh" #private

## Get any remote firebase config
# firebase functions:config:get > "$DIR"/functions/.runtimeconfig.json


## start the local firebase server
node --version
cd "$DIR"/functions/
export NODE_ENV=local
yarn watch &
firebase serve --only functions