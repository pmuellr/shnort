#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

function main() {
    dl vega.js       vega@5.22.1/build/vega.js
    dl vega-lite.js  vega-lite@5.2.0/build/vega-lite.js
    dl vega-embed.js vega-embed@6.20.8/build/vega-embed.js
}

function dl() {
    echo "downloading $1 from jsdelivr $2"
    local url="https://cdn.jsdelivr.net/npm/$2"
    curl --no-progress-meter $url > $SCRIPT_DIR/$1
}

main