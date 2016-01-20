// example controller
var amok = require('amokjs');

// example for http amok mode
// amok.setMode('http');
// amok.setExternalUrl('http://httpbin.org');

// example directory setup
// amok.setResponsesDirectory('new/responses');

exports.get = function(req, res) {
	// let amok handle mock responses
	amok.respond(req,res);
};

exports.post = function(req, res) {
	// let amok handle mock responses
	amok.respond(req,res);
};