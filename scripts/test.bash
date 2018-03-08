#!/bin/bash
(set -o igncr) 2>/dev/null && set -o igncr; # For Cygwin on Windows compaibility

function cleanArtifacts {
    rm -rf db/
    rmdir db
    rm -rf rwTest
    rmdir rwTest
}

cleanArtifacts

./node_modules/.bin/tsc -p tsconfig.json
if [ $? != 0 ]; then
    exit 1
fi

./node_modules/.bin/jest
returnCode=$?

cleanArtifacts

exit $returnCode