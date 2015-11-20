### amok example for standalone Node.js apps


This is **amok** implementation exapmle for [Node.js](https://nodejs.org/) applications. It presents ready to run and deploy Node.js app.


#### Whats under the hood?

This project is a standard Node.js application using Express.js middleware and **amock** package.

It mocks some of the behaviour of well known online site [httpbin.org](http://httpbin.org/). Lets look at the structure of this project:

	amok/
	---- responses/
	---- app.js
	---- controller.js	
	---- package.json
	
	
**responses** direcotory contains backend mock responses files with the response content. **app.js** is the main application file which invokes Express.js and **controller.js** is using **amok** to send mock responses back to the client application.

**package.json** manages all the dependencies and app metadata.


#### How to Use?

In order to use amok package, you have to add it as a dependency within your Node.js project. After installing dependencies with *npm install* you can then require amok package within your Node.js application

	```javascript
	var amok = require('amokjs');
	``` 

By default amok will be serving responses from **responses** directory at the root of your project. You can also define custom directory for response files with *setResponsesDirectory*

	```javascript
	amok.setResponsesDirectory('new/responses/directory');
	```  

Whats left is to invoke *respond* method of amok and provide it with [Express.js](http://expressjs.com/) request and response objects. Your controller file would be similar to the below

	```javascript	
	var amok = require('amokjs');
	
	// set response directory - optional
	amok.setResponsesDirectory('new/responses');
	
	exports.get = function(req, res) {
		// let amok handle mock responses
		amok.respond(req,res);
	};
	
	exports.post = function(req, res) {
		// let amok handle mock responses
		amok.respond(req,res);
	};
	```

Check ready to go example projects we have: [standalone Node.js app with amok](examples/standalone-amok) or [Apigee mock api with amok](examples/apigee-amok).

**amok** will serve response content from a file in the responses directory. There are 2 ways of requesting mocked backend responses from API powered by amok:

* **amok** will serve response content from a file matching file name in the request path. For example if you send API request to *yourapi.com/mock-api/xml* mock will serve response from file named *xml*.

* **amok** will serve response content from a file matching **x-mock-filename** header content. In this case the main request path has to be */*. For example if you send API request to *yourapi.com/mock-api/* and request will contain *x-mock-filename* HTTP header - mock will serve response from file named *xml*.

#### Supported Headers

Headers **amok** supports:

* **x-mock-response-code** request header allows developers to request custom HTTP response code from mock API
* **x-mock-filename** request header allows developers to pass mock file name in the HTTP request header rather then request path. For example if *x-mock-filename: xml* is used in the header and request path is */* mock API will attempt to serve response from *xml* file.

#### Supported template variables

In your response files you can use several template variables in order to get values generated dynamically. Below are the template values **amock** supports:

* **@date@** - will be replaced with the current timestamp. Format: YYYY-MM-DD
* **@randomDate@** - will be replaced with the random timestamp. Format: YYYY-MM-DD
* **@longid@** - will be replaced with the 10 digits long random number
* **@shortid@** - will be replaced with the random number up to 5 digits long

#### Example curl requests

**amock** example is deployed as [publically available API](http://importantorganization-test.apigee.net/mock-api/about). It is installed in [free Apigee Edge](https://accounts.apigee.com/accounts/sign_up) organization. Below are few example curl requests to test the mock API:

	curl -XGET 'http://localhost:3000/xml'
	curl -XGET -H 'x-mock-filename: xml' 'http://localhost:3000/'
	curl -XGET -H "x-mock-response-code: 500" 'http://localhost:3000/xml'