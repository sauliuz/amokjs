/* jslint node: true */
'use strict';

// main amokjs file
// includes all the amokjs funcionality and dependencies
const express = require('express');
const morgan = require('morgan');

// initialize
var build_amokjs = function() {

	var amokjs = new Amokjs();
	return amokjs;
};

// functional object
function Amokjs () {
	this.port = null;
	this.responseDirectory = null;
	this.currentPlugin = "amokjs-local";
};

Amokjs.prototype.use = function(plugin_name) {
	this.currentPlugin = plugin_name || "amokjs-local";
};

Amokjs.prototype.setPort = function(mock_port) {
	this.port = mock_port || 3000;
};

// starts the express app
Amokjs.prototype.start = function(mock_port) {
	
	// amokjs will use the default amokjs-local plugin
	// or any external plugin if its referenced.
	// you can create external plugins for amokjs 
	if (this.currentPlugin == "amokjs-local") {
		this.currentPlugin = require("./amokjs-local");
	} else {
		this.currentPlugin = require(currentPlugin);
	}

	// setup Express
	var app = express();

	app.use(morgan('dev'));

	// define supported routes
	// GET, POST
	app.post('/:resource', this.currentPlugin.post);
	app.get('/:resource', this.currentPlugin.get);

	app.post('/', this.currentPlugin.post);
	app.get('/', this.currentPlugin.post);

	// for everything else
	// catch all route, to catch all not supported requests and bounce back
	app.all("*", (req,res) => {
		// Headers
		res.set({
			'Content-Type': 'application/json',
		});
		res.status(404);
		var errorMsg='{"error":"request type is not supported"}';
		res.send(errorMsg);
	});

	
	// if port is not set, use default 3000
	if (this.port) {
		app.listen(this.port);
		console.log('starting mock service on port '+ this.port);

	} else {
		app.listen(3000);
		console.log('starting mock service on port 3000');
	}
};


// public
module.exports = build_amokjs();