/* jslint node: true */
'use strict';

var fs = require('fs');
var casual = require('casual');
var moment = require('moment');


function Amock(mock_resource_directory) {
	this.resourceDir = mock_resource_directory || 'responses';
}

// Allow to set responses directory
Amock.prototype.setResponsesDirectory = function(mock_resource_directory) {
	this.resourceDir = mock_resource_directory || 'responses';
};



// Main amock funcionality
Amock.prototype.respond = function(req, res) {

	var resourceName = req.params.resource || '';
	var resourceType = req.headers['x-mock-filename'] || '';
	var responseCode = req.headers['x-mock-response-code'] || 200;
	// TODO v1.0.2
	//var responseShouldBeCached = ((req.headers['x-mock-cache-response']) ? true : false);
	//var cacheKey = req.headers['x-mock-cache-key'];

	// respond from static file
	respondFromFile(res, resourceName + resourceType, responseCode, this.resourceDir);

};


var respondFromFile = function(res, resourceFullName, responseCode, dirPath) {
	fs.readFile(__dirname + '/' + dirPath + '/' + resourceFullName, 'utf8', function (err, data) {
	    
		// no file or error reading file
	    if (err) {
			res.status(404);
			res.send('{"error":"Mock resource not found"}');
			return;
	    }

	    // response file exists
		if (data !== null){

			// support for template variables
			var date = moment().format('YYYY MM DD');
			var randomDate = casual.date(format = 'YYYY-MM-DD');
			var paymentData = JSON.stringify(casual.card_data);
			var longid = Math.floor(Math.random() * 20000000000) + 10000000000;
			var shortid = Math.floor(Math.random() * 20000) + 1000;
			var randomCacheKey = Math.floor(Math.random() * 20000000000) + 10000000000;

			responseData = data;
			
			// possible to optimise and not run replace few times?
			responseData = responseData.replace("@date@", date);
			responseData = responseData.replace("@randomDate@", randomDate);
			responseData = responseData.replace("@paymentData@", paymentData);
			responseData = responseData.replace("@longid@", longid);
			responseData = responseData.replace("@shortid@", shortid);

			console.log (responseShouldBeCached);

			// // if clients wants to cache response. TTL = 1 week
			// if (responseShouldBeCached) {
			// 	var cache = apigee.getCache();
			// 	cache.put(''+randomCacheKey, ''+responseData, 604800);

			// 	// return cache key in the header
			// 	res.setHeader('x-mock-cache-key', ''+randomCacheKey);
			// }

			// actual response
			res.status(responseCode);
			res.send(responseData);
			return;
		
		// response file exists but empty
		} else {
			res.send('{"error":"Empty mock response file!"}');			
		}
	});
};

exports.Amock = Amock
