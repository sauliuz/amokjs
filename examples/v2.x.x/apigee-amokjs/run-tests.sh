# cucumber shoud run from within tests directory
cd tests
# making sure node_modules are present
npm install
# run tests
./node_modules/cucumber/bin/cucumber-js integration
