// dependencies
var express = require('express');
var bodyParser = require('body-parser');
var controller = require('./controller');

var app = express();

// define supported routes
app.post('/:resource', controller.post);
app.get('/:resource', controller.get);

app.post('/', controller.post);
app.get('/', controller.get);

// for everything else
// catch all route, to catch all not supported requests and bounce back
app.all("*", function(req,res){
    // Headers
    res.set({
        'Content-Type': 'application/json',
    });
    res.status(404);
    var errorMsg='{"error":"request type is not supported"}';
	res.send(errorMsg);
});

// start node app
app.listen(3000);
