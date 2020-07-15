# amokjs - Apigee deployment example

This is example usecase for amokjs to be deployed as a hosted target application on Apigee Edge platform. This project is using [Apigeebootstrap](https://github.com/popularowl/apigeebootstrap) as a boilerplate.

## How to deploy

Set local enviroenment variables

    export APIGEE_USERNAME=your username
    export APIGEE_PASSWORD=your password

Deploy projet on Apigee Edge with Maven

    mvn install -P{environment name} -Dorganization={Apigee org name}

## Feedback

Feedback and pull requests are welcome.

by [popularowl](https://popularowl.com)
