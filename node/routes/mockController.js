// mockController - reads contents from file and sends as a response body
// supports request header specifying response code
// and request header specifying extention to the file name

var fs = require('fs');
var casual = require('casual');
var moment = require('moment');

exports.respond = function(req, res) {
	var resourceName = req.params.resource;
	var resourceType = req.headers['x-mock-extention'] || '';
	var responseCode = req.headers['x-mock-response-code'] || 200;
	
	// serve back the response
	respondFromFile(res, resourceName + resourceType, responseCode);
};

var respondFromFile = function(res, resourceFullName, responseCode) {
	fs.readFile(__dirname + '/responses/' + resourceFullName, 'utf8', function (err, data) {
	    
		// no file or error reading file
	    if (err) {
			res.status(404);
			res.send('{"error":"Mock resource not not found"}');
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

			responseData = data;
			
			// possible to optimise and not run replace few times?
			responseData = responseData.replace("@date@", date);
			responseData = responseData.replace("@randomDate@", randomDate);
			responseData = responseData.replace("@paymentData@", paymentData);
			responseData = responseData.replace("@longid@", longid);
			responseData = responseData.replace("@shortid@", shortid);

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
