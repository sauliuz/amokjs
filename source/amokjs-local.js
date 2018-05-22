// amokjs-local plugin
// enables amockjs to serve mocked resources
// from within local direcotry

const fs = require('fs');
const casual = require('casual');
const moment = require('moment');


// each amokjs plugin should provide 
// get() & post() methods which will be 
// provided with express request and response objects.

exports.get = function(req, res) {
	respondFromFile(req, res);
};

exports.post = function(req, res) {
	respondFromFile(req, res);
};

var respondFromFile = (req, res) => {

	const resourceName = req.params.resource || '';
    const resourceType = req.headers['x-mock-filename'] || '';
    const responseCode = req.headers['x-mock-response-code'] || 200;

    const resourceFullName = resourceName + resourceType;
    const responseDirectory = "responses";

    fs.readFile(process.cwd() + '/' + responseDirectory + '/' + resourceFullName, 'utf8', (err, data) => {
	    
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
			var randomDate = casual.date('YYYY-MM-DD');
			var paymentData = JSON.stringify(casual.card_data);
			var longid = Math.floor(Math.random() * 20000000000) + 10000000000;
			var shortid = Math.floor(Math.random() * 20000) + 1000;
			var randomCacheKey = Math.floor(Math.random() * 20000000000) + 10000000000;

			var responseData = data;
			
			// possible to optimise and not run replace few times?
			responseData = responseData.replace("@date@", date);
			responseData = responseData.replace("@randomDate@", randomDate);
			responseData = responseData.replace("@paymentData@", paymentData);
			responseData = responseData.replace("@longid@", longid);
			responseData = responseData.replace("@shortid@", shortid);

			// TODO - support transaction caching if running in Apigee.

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