rm -rf ./npm
mkdir ./npm

cp ./amok.js ./npm/amok.js
cp ./package.json ./npm/package.json
cp ../LICENSE ./npm/LICENSE
cp ./README.md ./npm/README.md

cd ./npm
npm publish 

rm -rf ../npm