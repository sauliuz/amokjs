/**
 * Module dependencies.
 */
var express = require('express');
var mock = require('./routes/mockController');
var http = require('http');
var bodyParser = require('body-parser');

var app = express();

// Introducing req.rawBody
// in order to deal with incoming xml /soap / json
// http://stackoverflow.com/questions/9920208/expressjs-raw-body
app.use(function(req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
        data += chunk;
    });
    req.on('end', function() {
        req.rawBody = data;
        next();
    });
});

/***** Supported routes ******/
// mock only supports this type of request /{mock-resource-name}
// for example yourapi.com/soapmock
app.post('/:resource', mock.process);

// for everything else
// catch all route, to catch all not supported requests and bounce back
app.all("*", function(req,res){
    // Headers
    res.set({
        'Content-Type': 'application/json',
    });
    res.status(404);
    var errorMsg='{"error":"Not supported mock request"}';
	res.send(errorMsg);
});

// start node app
app.listen(3000);
