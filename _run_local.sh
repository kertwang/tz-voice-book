#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

#make sure we are using nvm, which will set node v6.11
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

# nvm use v6.11.5


## start the local firebase server
node --version
cd "$DIR"/ow_firebase/functions/
export NODE_ENV=local
yarn watch &
firebase serve --only functions