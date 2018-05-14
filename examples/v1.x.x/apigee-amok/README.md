### amok example for Apigee api proxies


This is **amok** and [Node.js](https://nodejs.org/) example project for deployment to [Apigee Edge](http://apigee.com/docs/api-services/content/what-apigee-edge) API management platfrom. It presents ready to deploy API proxy bundle which serves as a backend mock API for backend services.

Below are examples on how to deploy and use this example project.

#### Whats under the hood?

**amock** project consists of simple Node.js application which is incorporated with API bundle to be deployed to [Apigee Edge](http://apigee.com/docs/api-services/content/what-apigee-edge).

It mocks some of the behaviour of well known online site [httpbin.org](http://httpbin.org/). Lets look at the structure of this project:

	amok/
	---- apiproxy/
	---- node/
	---- tests/	
	---- pom.xml
	---- README.md
	
	
**apiproxy** directory contains standard Apigee Edge API bundle, **node** directory contains Node.js application. **test** directory contains simple funcional tests in order to test that our mock API works as expected. Tests are based on [Cucumber.js](https://github.com/cucumber/cucumber-js) and [Apickli](https://github.com/apickli/apickli) - another open source project me and my coleague have open sourced. And finally **pom.xml** is the configuration for Maven deployment.

#### How To Install
First, you have to install Node.js dependency packages in **node** and **test** directories
	
	cd node
	npm install
	
	cd ../tests
	npm install


Now in order to deploy the project to Apigee Edge you can run the below Maven comand. After successfull deployment you will have new API named **amok** with the base path **/amok-api**

	mvn install -P{environment name} -Dorganization={Apigee org name} -Dusername={Apigee username} -Dpassword={Apigee password} 


Cucumber.js tests will be performed as the last step of deployment. If you want to run them manually:

	cd tests
	cucumber-js integration/

#### Use

Once your mock API is successfully uploaded to Apigee you can make API request to it and get mocked responses. 

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

	curl -XGET 'http://importantorganization-test.apigee.net/amok-api/xml'
	curl -XGET -H 'x-mock-filename: xml' 'http://importantorganization-test.apigee.net/amok-api'
	curl -XGET -H "x-mock-response-code: 500" 'http://importantorganization-test.apigee.net/amok-api/xml'