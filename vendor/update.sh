#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

function dl() {
    echo "downloading $1 from jsdelivr $2"
    local url="https://cdn.jsdelivr.net/npm/$2"
    curl --no-progress-meter $url > $1
}

cd $SCRIPT_DIR

cd markdown-it
dl markdown-it.js  markdown-it@13.0.0/dist/markdown-it.js
cd ..

cd observablehq
dl runtime.js     @observablehq/runtime@4.18.7/dist/runtime.js
dl inspector.css  @observablehq/inspector@3.2.4/dist/inspector.css
cd ..

cd vega
dl vega.js       vega@5.22.1/build/vega.js
dl vega-lite.js  vega-lite@5.2.0/build/vega-lite.js
dl vega-embed.js vega-embed@6.20.8/build/vega-embed.js
cd ..
