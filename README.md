### Mock which helps you quickly build backend mocks

This example project and totorial will help you quickly build and manage web service mocks. With the help of [Apigee Edge](http://apigee.com/docs/api-services/content/what-apigee-edge) and [Node.js](https://nodejs.org/)

#### Why?

While building API's in many cases developers find that backend systems and services in development and test environments are:

* not very stable
* being worked on by backend teams and hense are not yet ready for consumption
* doesnt have stable set of data for testing integrations

Its completly ok as these services are slower to develop, maintain and test. And this is the main reason why API developers have to build API layers in front of them in the first place.

So how do we address this problem?

#### How?

Developers can use [Node.js](https://nodejs.org/) application to quickly mock example backend responses. Node.js with its [Express](http://expressjs.com/) module is a perfect fit for such purpose. Easy to add new supported request paths and serve custom responses back.

It can also serve responses from flat files (**JSON**, **XML**, **SOAP**, you name it), which makes the task of extending such mock quite simple. Just add a new resource file into derectory.

Apigee Edge [supports Node.js apps](http://apigee.com/docs/api-services/content/overview-nodejs-apigee-edge) as a backend out of the box. Instead of pointing API in Apigee Edge to cloud based target, you just point it to your Node.js application (which is deployed as part of the bundle - see [Apigee Edge deployment examples](https://github.com/sauliuz/apigee-maven-deployments)).

This way you dont need to host your Node Express mock application sepratly - Apigee Edge hosts it for you and exposes your mock API for consumption via http / https.

Aditionally you could also leverage other inbuilt Apigee Edge functionality, like traffic management or OAuth 2.0 support.

#### Whats under the hood?

**amock** project consists of simple Node.js application which is incorporated with API bundle to be deployed to Apigee Edge.

It mocks the behaviour of well known online site [httpbin.org](http://httpbin.org/). Lets look at the structure of this project:

	amock/
	---- apiproxy/
	---- node/
	---- tests/	
	---- pom.xml
	---- Readme.md
	
	
**apiproxy** direcotory contains standard Apigee Edge API bundle, **node** directory contains Node.js application. **test** directory contains simple funcional tests in order to test that our mock API works as expected. Tests are based on [Cucumber.js](https://github.com/cucumber/cucumber-js) and [Apickli](https://github.com/apickli/apickli) - another open source project me and my coleague have open sourced. And finally **pom.xml** is the configuration for Maven deployment. I'm planning to swap Maven with [Gulp](http://gulpjs.com/) in the future but you have to stick with Maven for now.

#### How To

#####Install
In order to deploy the project to Apigee Edge you can run the below Maven comand. After successfull deployment you will have new API named **mock** with the base path **/mock-api**

	mvn install -P{environment name} -Dorganization={Apigee org name} -Dusername={Apigee username} -Dpassword={Apigee password} 


Cucumber.js tests will be performed as the last step of deployment. If you want to run them manually:

	cd tests
	cucumber-js integration/

#####Use

Once your mock API is successfully uploaded to Apigee you can make API request to it and get mocked responses. 

Mock API will serve you response content from matching files in the */node/routes/responses* directory. For example if you send API request to *yourapi.com/mock-api/xml* mock will serve response from file named *xml* in */node/routes/responses*. As simple as that.

######Supported Headers

Headers amock supports:

* **x-mock-response-code** request header allows developers to request custom HTTP response code from mock API
* **x-mock-extention** header allows developers to have multiple similar response files with different subnames. For example if *x-mock-type: _error1* header is supplied mock API will try to serve response from *filename_error1* file.

######Supported template variables

In your response files you can use several template variables in order to get values generated dynamically. Below are the template values **amock** supports:

* **@date@** - will be replaced with the current timestamp. Format: YYYY-MM-DD
* **@randomDate@** - will be replaced with the random timestamp. Format: YYYY-MM-DD
* **@longid@** - will be replaced with the 10 digits long random number
* **@shortid@** - will be replaced with the random number up to 5 digits long

######Example curl requests

**amock** example is deployed as [publically available API](http://importantorganization-test.apigee.net/mock-api/about). It is installed in [free Apigee Edge](https://accounts.apigee.com/accounts/sign_up) organization. Below are few example curl requests to test the mock API:

	curl -XPOST 'http://importantorganization-test.apigee.net/mock-api/html'
	curl -XPOST -H "x-mock-response-code: 500" 'http://importantorganization-test.apigee.net/mock-api/xml'
	curl -XPOST -H "x-mock-response-code: 500" -H "x-mock-type: _error1" 'http://importantorganization-test.apigee.net/mock-api/xml' 