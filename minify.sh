#!/bin/sh

export PATH=$PATH:$(npm bin -g)
terser src/SpicyBase.js --compress --mangle --output dist/SpicyBase.min.js
terser src/SpicyCam.js --compress --mangle --output dist/SpicyCam.min.js
terser src/SpicyCast.js --compress --mangle --output dist/SpicyCast.min.js
