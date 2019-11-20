#!/usr/bin/env bash
set -e
#Run from the current directory i.e. ./gen-docs.sh
if [ ! -e ./node_modules/.bin/jsdoc ]; then
  npm install
fi
./node_modules/.bin/jsdoc index.js
echo "Newly generated documents should be in ./out"
