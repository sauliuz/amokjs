rm -rf ./npm
mkdir ./npm

cp ./amokjs.js ./npm/amokjs.js
cp ./amokjs-local.js ./npm/amokjs-local.js
cp ./package.json ./npm/package.json
cp ../LICENSE ./npm/LICENSE
cp ./README.md ./npm/README.md

cd ./npm
npm publish 

rm -rf ../npm