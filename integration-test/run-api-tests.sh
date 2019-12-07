#!/usr/bin/env bash
set -x

SCRIPTDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

APIURL=${APIURL:-http://localhost:3000}
USERNAME='ping40';
PASSWORD='nestjs';

newman run $SCRIPTDIR/Pis.postman_collection.json \
  --delay-request 10 \
  --global-var "APIURL=$APIURL" \
  --global-var "USERNAME=$USERNAME" \
  --global-var "PASSWORD=$PASSWORD"
