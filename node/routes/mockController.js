// mockController
// reads contents from file and sends as response body

var fs = require('fs');

exports.process = function(req, res) {
	var resourceName = req.params.resource;
	var resourceType = req.headers['x-mock-type'] || '';
	var responseCode = req.headers['x-mock-response-code'] || 200;
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
			res.status(responseCode);
			res.send(data);
		
		// response file exists but empty
		} else {
			res.send("Empty mock response file!");
		}
	});
};
