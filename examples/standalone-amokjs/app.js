// since v2.x amokjs includes all the dependencies like expressjs. 
// you only need require the amokjs package
const amokjs = require('amokjs');
const port = process.env.PORT || 3000;

// by default amokjs will start the service on port 3000
// you can set the custom port number
amokjs.setPort(port);

// since v2.x amokjs allows plugins
// for example:
// amokjs.use(amokjs-local);

// start mock service
amokjs.start();