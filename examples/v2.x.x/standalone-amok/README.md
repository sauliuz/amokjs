## amokjs example for standalone nodejs apps

This is example of the simple [nodejs](https://nodejs.org/) mock service using **amokjs** library.

Since version 2.x.x amokjs package has added [expressjs](https://expressjs.com/) as depencency and your application does not have to include it.

This example app only contains the main application file which uses **amokjs** as dependency to serve response files from [responses](/responses) directory.

**responses** direcotory contains backend mock responses files with the response content.

### how to run?

	yarn
	yarn start

By default amok will be looking to serve responses from **responses** directory at the root of your project. You can also define custom directory for response files

	```javascript
	amok.responsesDirectory = "new/responses/directory";
	
	```

You can also change the port on which **amockjs** listens for incoming requests. The default port is 3000.

	```javascript
	amok.port = "9090";
	
	```

### how it works?

**amokjs** will serve response content from files in the responses directory. There are 2 ways of requesting mocked backend responses from API powered by amokjs:

* **amokjs** will serve response content from a file matching file name in the request path. For example if you send API request to *yourapi.com/mock-api/xml* mock will serve response from file named *xml*.

* In addition **amokjs** will serve response content from a file matching **x-mock-filename** header content. In this case the main request path has to be */*. For example if you send API request to *yourapi.com/mock-api/* and request will contain *x-mock-filename* HTTP header - mock will serve response from file named *xml*.

#### supported http headers

http headers **amokjs** supports:

* **x-mock-response-code** request header allows developers to request any valid HTTP response code back from mock API
* **x-mock-filename** request header allows developers to pass mock file name in the HTTP request header rather then request path. For example if *x-mock-filename: xml* is used in the header and request path is */* mock API will attempt to serve response from *xml* file.

#### supported template variables

In your response files you can use several template variables in order to get values generated dynamically. Below are the template values **amockjs** supports:

* **@date@** - will be replaced with the current timestamp. Format: YYYY-MM-DD
* **@randomDate@** - will be replaced with the random timestamp. Format: YYYY-MM-DD
* **@longid@** - will be replaced with the 10 digits long random number
* **@shortid@** - will be replaced with the random number up to 5 digits long

#### example curl requests

	curl -XGET 'http://localhost:3000/xml'
	curl -XGET -H 'x-mock-filename: xml' 'http://localhost:3000/'
	curl -XGET -H "x-mock-response-code: 500" 'http://localhost:3000/xml'