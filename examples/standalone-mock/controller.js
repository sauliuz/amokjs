// example controller
var amok = require('./node_modules/amok/amok.js');

// example directory setup
amok.setResponsesDirectory('new/responses');

exports.get = function(req, res) {
	// let amok handle mock responses
	amok.respond(req,res);
};

exports.post = function(req, res) {
	// let amok handle mock responses
	amok.respond(req,res);
};