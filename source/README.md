### amok helps you quickly build backend mocks

> amok - to run wildly; without self-control

**amok** package helps you to build backend mocks quickly. In the **development** and **test** environments backend systems are somewhat not stable.

Project GitHub repositary contains 2 example projects. Example amok with standalone [Node.js](https://nodejs.org/) application and amok project ready to deploy to [Apigee Edge](http://apigee.com/docs/api-services/content/what-apigee-edge) API management platfrom.

* [Example standalone Node.js app with amok](examples/standalone-amok)
* [Example Apigee API proxy with amok](examples/apigee-amok)


#### How?

**amok** serves responses from flat files in the specific project directory. It supports **JSON**, **XML**, **SOAP** and other formats. You can just add a new resource file into resources derectory and **amok** will serve it as response.


#### How To Use?

In order to use amok package, you have to add it as a dependency within your Node.js project. After installing dependencies with *npm install* you can then require amok package within your Node.js application

```javascript
var amok = require('amokjs'); 
```

##### local mode
**amok** can serve responses from files located in the local directory (in the same place where nodejs application is running). By default amok starts in the **local** mode.

If this mode is being used amok will be serving responses from **responses** directory at the root of your project. You can also define the custom directory for response files with *setResponsesDirectory*

```javascript
amok.setResponsesDirectory('new/responses/directory');
```

##### http mode

**http** mode allows serving response files from any external location which is accessable via http / https.

You can set this mode by the following method

```javascript
amok.setMode('http');
```

If you have set **http** mode, you have to provide the external url for your response file location

```javascript
amok.setExternalUrl('http://httpbin.org');
```

##### mocked responses

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

	curl -XGET 'http://importantorganization-test.apigee.net/mock-api/xml'
	curl -XGET -H 'x-mock-filename: xml' 'http://importantorganization-test.apigee.net/mock-api'
	curl -XGET -H "x-mock-response-code: 500" 'http://importantorganization-test.apigee.net/mock-api/xml'