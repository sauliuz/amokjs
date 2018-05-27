
// since v2.x amokjs includes all the dependencies
// like express. you only need the amokjs package itself
var amokjs = require('amokjs');

// by default amokjs will start the service on port 3000
// you can set the custom port like in the example below
amokjs.setPort('3030');

// since v2.x amokjs allows plugins
// amokjs.use(amokjs-local);

// start mock service
amokjs.start();
