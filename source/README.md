### amok helps you quickly build backend mocks

> amok - to run wildly; without self-control

**amok** package helps you to build backend mocks quickly. In the **development** and **test** environments backend systems are somewhat not stable.

**amok** allows developers to gain full control of request / response data while developing API layer. This is specifically useful in development environments. The tutorial below walks you through the example implementation.

This repositary also contains 2 example projects. Example amok with standalone [Node.js](https://nodejs.org/) application and amok project ready to deploy to [Apigee Edge](http://apigee.com/docs/api-services/content/what-apigee-edge) API management platfrom.

* [Example standalone Node.js app with amok](examples/standalone-amok)
* [Example Apigee API proxy with amok](examples/apigee-amok)
 

#### Why?

While building API's in many cases developers find that backend systems and services in development and test environments are:

* not stable
* still being developed by backend dev teams and are not ready for consumption
* without consistant and stable data sets


Its completly ok as these services are slower to develop, maintain and test. And this is the main reason why we build API layers in front of slow backend systems.

How do we address this problem?

#### How?

**amok** serves responses from flat files in the specific project directory. It supports **JSON**, **XML**, **SOAP** and any other formats. The task of adding new backend mock response becomes copy paste task. Just add a new resource file into derectory and it will be served by **amok**.


#### How To?

#####Use

In order to use amok package, you have to add it as a dependency within your Node.js project. After installing dependencies with *npm install* you can then require amok package within your Node.js application

	var amok = require('amokjs'); 

By default amok will be serving responses from **responses** directory at the root of your project. You can also define custom directory for response files with *setResponsesDirectory*

	amok.setResponsesDirectory('new/responses/directory');
	  

Whats left is to invoke *respond* method of amok and provide it with [Express.js](http://expressjs.com/) request and response objects. Your controller file would be similar to the below

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

Check ready to go example projects we have: [standalone Node.js app with amok](examples/standalone-amok) or [Apigee mock api with amok](examples/apigee-amok).

**amok** will serve response content from a file in the responses directory. There are 2 ways of requesting mocked backend responses from API powered by amok:

* **amok** will serve response content from a file matching file name in the request path. For example if you send API request to *yourapi.com/mock-api/xml* mock will serve response from file named *xml*.

* **amok** will serve response content from a file matching **x-mock-filename** header content. In this case the main request path has to be */*. For example if you send API request to *yourapi.com/mock-api/* and request will contain *x-mock-filename* HTTP header - mock will serve response from file named *xml*.

######Supported Headers

Headers **amok** supports:

* **x-mock-response-code** request header allows developers to request custom HTTP response code from mock API
* **x-mock-filename** request header allows developers to pass mock file name in the HTTP request header rather then request path. For example if *x-mock-filename: xml* is used in the header and request path is */* mock API will attempt to serve response from *xml* file.

######Supported template variables

In your response files you can use several template variables in order to get values generated dynamically. Below are the template values **amock** supports:

* **@date@** - will be replaced with the current timestamp. Format: YYYY-MM-DD
* **@randomDate@** - will be replaced with the random timestamp. Format: YYYY-MM-DD
* **@longid@** - will be replaced with the 10 digits long random number
* **@shortid@** - will be replaced with the random number up to 5 digits long

######Example curl requests

**amock** example is deployed as [publically available API](http://importantorganization-test.apigee.net/mock-api/about). It is installed in [free Apigee Edge](https://accounts.apigee.com/accounts/sign_up) organization. Below are few example curl requests to test the mock API:

	curl -XGET 'http://importantorganization-test.apigee.net/mock-api/xml'
	curl -XGET -H 'x-mock-filename: xml' 'http://importantorganization-test.apigee.net/mock-api'
	curl -XGET -H "x-mock-response-code: 500" 'http://importantorganization-test.apigee.net/mock-api/xml'