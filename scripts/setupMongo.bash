#!/bin/bash
(set -o igncr) 2>/dev/null && set -o igncr; # For Cygwin on Windows compaibility

curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1404-3.6.2.tgz

mkdir db

tar -zxf *.tgz -C db --strip-components=1

mkdir db/db

rm *.tgz