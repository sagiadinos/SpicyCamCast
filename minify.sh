#!/bin/sh

export PATH=$PATH:$(npm bin -g) # required for macos
cat src/SpicyBase.js src/SpicyCam.js  src/SpicyCast.js > dist/SpicyCamCast1.js
sed 's/import {SpicyBase} from "\.\/SpicyBase\.js";//g' dist/SpicyCamCast1.js > dist/SpicyCamCast.js
unlink dist/SpicyCamCast1.js
terser dist/SpicyCamCast.js --compress --mangle --output dist/SpicyCamCast.min.js
unlink dist/SpicyCamCast.js
