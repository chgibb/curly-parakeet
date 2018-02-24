#!/bin/bash
(set -o igncr) 2>/dev/null && set -o igncr; # For Cygwin on Windows compaibility

function cleanTSArtifacts {
	for f in $(find src -name '*.ts'); 
	do
		artifact=$(echo $f | awk '{gsub("\\.ts",".js");print}')
		rm $artifact
	done

	for f in $(find src -name '*.tsx'); 
	do
		artifact=$(echo $f | awk '{gsub("\\.tsx",".js");print}')
		rm $artifact
	done

	for f in $(find __tests__ -name '*.ts'); 
	do
		artifact=$(echo $f | awk '{gsub("\\.ts",".js");print}')
		rm $artifact
	done
}

rm -rf dist
printf "Running TSC\n"
./node_modules/.bin/tsc -p tsconfig.json
if [ $? != 0 ]; then
    cleanTSArtifacts
    exit 1
fi

printf "Done\n"

mkdir dist
mkdir dist/vs
mkdir dist/img

printf "Bundling entry points\n"
for f in src/*.js
do
	
	destination=$(echo $f | awk '{gsub("src/","dist/");print}')

	if [[ "$f" != "src/server.js" ]]; then
    	./node_modules/.bin/browserify $f -o $destination
	fi

	if [[ "$f" == "src/server.js" ]]; then
    	./node_modules/.bin/browserify $f --node  -o $destination
	fi

    if [ $? != 0 ]; then
	    cleanTSArtifacts
		exit 1
	fi

done

for f in src/*.html
do
    destination=$(echo $f | awk '{gsub("src/","dist/");print}')
    cp $f $destination
done

printf "Copying images\n"

for f in img/*.png
do
    destination=$(echo $f | awk '{gsub("img/","dist/img/");print}')
    cp $f $destination
done

printf "Copying styles\n"

cp -R src/css dist/css

printf "Done\n"

cp -R node_modules/monaco-editor/dev/vs/** dist/vs

cleanTSArtifacts