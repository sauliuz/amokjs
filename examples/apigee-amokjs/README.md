# amokjs example for Apigee api proxies

This is **amokjs** and [node.js](https://nodejs.org/) backend mock example project for deployment to [Apigee Edge](http://apigee.com/docs/api-services/content/what-apigee-edge) API management platfrom. 

Its ready to deploy API proxy with backend mock and BDD tests. Its using hosted targets funcionality in Apigee Edge which allows to host Nodejs applications.

You can find more detailed description how amockjs npm package lets you quickly build backend mocks [here](https://github.com/sauliuz/amokjs).

## How to install

This Apigee Edge API proxy bundle is setup for deployment with [Maven](https://maven.apache.org).
Its using [Apigee Maven](https://github.com/apigee/apigee-deploy-maven-plugin) plugin to automate the actual bundle deployments. 

You have to first install all required npm dependencies in both [/node](node) and [/tests](tests) directories.

Once above is installed, use Maven to deploy to Apigee.

	cd node && npm install
	cd ../tests && npm install
	cd ../ && mvn install -P{environment name} -Dorganization={Apigee org name} -Dusername={Apigee username} -Dpassword={Apigee password} 

After successful deployment, Maven is configured to run the set of Cucumberjs BDD tests.


## Tests

amokjs examples are using cucumberjs / apickli tests to validate API mock funcionality. 

Maven is configured to run set of tests after successfull deployment. Check pom.xml

You can also run the set of tests manually by executing included file

	./run-tests.sh


## Feedback

Feedback and pull requests are welcome.

Created by [saulius](https://twitter.com/sauliuz) & [popularowl](https://popularowl.com)
