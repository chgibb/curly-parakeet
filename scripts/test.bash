#!/bin/bash
(set -o igncr) 2>/dev/null && set -o igncr; # For Cygwin on Windows compaibility

function cleanArtifacts {
    rm -rf db
    rm -rf rwTest
}

./node_modules/.bin/tsc && ./node_modules/.bin/jest

returnCode=$?

cleanArtifacts

exit $returnCode