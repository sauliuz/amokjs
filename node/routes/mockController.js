// mockController - reads contents from file and sends as a response body
// supports request header specifying response code
// and request header specifying extention to the file name

var fs = require('fs');

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
			res.send("Mock response file does not exist");
	    }

	    // response file exists
		if (data !== null){

			// support for template variables
			var date = new Date();
			var longid = Math.floor(Math.random() * 2000000000) + 1000;
			var shortid = Math.floor(Math.random() * 20000) + 1000;

			responseData = data;
			
			// possible to optimise and not run replace few times?
			responseData = responseData.replace("@date@", date.toISOString());
			responseData = responseData.replace("@longid@", longid);
			responseData = responseData.replace("@shortid@", shortid);

			// actual response
			res.status(responseCode);
			res.send(responseData);
		
		// response file exists but empty
		} else {
			res.send("Empty mock response file!");
		}
	});
};
