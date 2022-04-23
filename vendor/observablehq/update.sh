#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

curl https://cdn.jsdelivr.net/npm/@observablehq/runtime@4.18.7/dist/runtime.js \
    > $SCRIPT_DIR/runtime.js

curl https://cdn.jsdelivr.net/npm/@observablehq/inspector@3.2.4/dist/inspector.css \
    > $SCRIPT_DIR/inspector.css