/* jslint node: true */
'use strict';

// main amok.js file
// includes all amok funcionality and dependencies

var fs = require('fs');
var casual = require('casual');
var moment = require('moment');
var request = require('request');

// initializer with default responses directory
var build_amok = function() {

	var amok = new Amok();
	return amok;
}

// Initialize with default mode and responses directory
function Amok (mock_resource_directory, mode) {
	this.mode = mode || 'local';
	this.resourceDir = mock_resource_directory || 'responses';
};

// Allow to set mode
Amok.prototype.setMode = function(mode) {
	this.mode = mode || 'local';
};

// Allow to set etternal Url
Amok.prototype.setExternalUrl = function(externalUrl) {
	this.externalUrl = externalUrl || null;
};

// Allow to set responses directory
Amok.prototype.setResponsesDirectory = function(mock_resource_directory) {
	this.resourceDir = mock_resource_directory || 'responses';
};

// Main amock funcionality
Amok.prototype.respond = function(req, res) {

	var self = this;

	var resourceName = req.params.resource || '';
	var resourceType = req.headers['x-mock-filename'] || '';
	var responseCode = req.headers['x-mock-response-code'] || 200;
	// TODO
	//var responseShouldBeCached = ((req.headers['x-mock-cache-response']) ? true : false);
	//var cacheKey = req.headers['x-mock-cache-key'];

	// response for local mode
	if (self.mode == 'local') {
		
		respondFromFile(res, resourceName + resourceType, responseCode, self.resourceDir);
	
	// response for http mode
	} else if (self.mode == 'http') {

		respondFromHttpLocation(res, resourceName + resourceType, responseCode, self.externalUrl);
	
	} else {

		// not supported mode. send error message
		res.set({
			'Content-Type': 'application/json',
		});
		res.status(500);
    	var errorMsg='{"error":"please set amok mode. current one is not supported"}';
		res.send(errorMsg);
	}
};

// Responding from http location
var respondFromHttpLocation = function(res, resourceFullPath, responseCode, externalUrl) {
	
	// validate that external url is set
	if (externalUrl) {
	
		request.get({
			url: externalUrl+'/'+resourceFullPath,
			followRedirect: false,
		},
		function(error, response) {
			
			if (error) {

				// troubles retrieving remote file
				res.set({
					'Content-Type': 'application/json',
				});
				res.status(500);
		    	var errorMsg='{"error":"cannot get remote file"}';
				res.send(errorMsg);
			
			} else if (response.statusCode == 200){

				var responsePayload = response.body;
				responsePayload = prepareResponsePayload(responsePayload);

				// return response
				res.status(responseCode);
				res.send(responsePayload);
				return;
			
			// response file exists but empty
			} else {
				res.status(response.statusCode);
				res.send('{"error":"remote response not 200"}');			
			}
		});
	
	} else {

		// external url is not specified
		res.set({
			'Content-Type': 'application/json',
		});
		res.status(500);
    	var errorMsg='{"error":"you are using amok http mode without externalUrl set"}';
		res.send(errorMsg);
	}
};

// Responding from local flat files
var respondFromFile = function(res, resourceFullName, responseCode, dirPath) {
	
	fs.readFile(process.cwd() + '/' + dirPath + '/' + resourceFullName, 'utf8', function (err, data) {
	    
		// no file or error reading file
	    if (err) {
			res.status(404);
			res.send('{"error":"Mock resource not found"}');
			return;
	    }

	    // response file exists
		if (data !== null){

			var responsePayload = data;
			responsePayload = prepareResponsePayload(responsePayload);

			// TODO - support transaction caching if running in Apigee.

			// // if clients wants to cache response. TTL = 1 week
			// if (responseShouldBeCached) {
			// 	var cache = apigee.getCache();
			// 	cache.put(''+randomCacheKey, ''+responseData, 604800);

			// 	// return cache key in the header
			// 	res.setHeader('x-mock-cache-key', ''+randomCacheKey);
			// }

			// return response
			res.status(responseCode);
			res.send(responsePayload);
			return;
		
		// response file exists but empty
		} else {
			res.send('{"error":"Empty mock response file!"}');			
		}
	});
};


// Template variable support and other response payload mediation
var prepareResponsePayload = function(responsePayload) {

	var date = moment().format('YYYY MM DD');
	var randomDate = casual.date('YYYY-MM-DD');
	var paymentData = JSON.stringify(casual.card_data);
	var longid = Math.floor(Math.random() * 20000000000) + 10000000000;
	var shortid = Math.floor(Math.random() * 20000) + 1000;
	var randomCacheKey = Math.floor(Math.random() * 20000000000) + 10000000000;

	// possible to optimise and not run replace few times?
	responsePayload = responsePayload.replace("@date@", date);
	responsePayload = responsePayload.replace("@randomDate@", randomDate);
	responsePayload = responsePayload.replace("@paymentData@", paymentData);
	responsePayload = responsePayload.replace("@longid@", longid);
	responsePayload = responsePayload.replace("@shortid@", shortid);

	return responsePayload;
};

module.exports = build_amok();
