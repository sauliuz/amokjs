# amokjs - very simple api mocking

[![npm version](https://badge.fury.io/js/amokjs.svg)](https://badge.fury.io/js/amokjs)

**amokjs** is a minimal API response mocking framework. It helps you very quickly build and host backend API mocks. It simply serves HTTP responses from the flat files. It supports all HTTP response codes, headers and dynamically generated templated values. See the [example applications](https://github.com/sauliuz/amokjs/tree/master/examples).

## How to run

**amokjs** is pakaged with [Expressjs](https://expressjs.com/) which means your application has to only require and use **amokjs** npm module.

    var amokjs = require('amokjs');
    amokjs.setPort('3030');
    amokjs.start();

## How it works

By default, **amokjs** serves responses from the flat files in the *responses* directory in project root. It supports **JSON**, **XML**, **SOAP**  response types. You can just add a new response file into *resources* derectory and **amokjs** will automatically start servicng it as API response.

**amokjs** will serve response content from a flat file in the responses directory. There are 2 ways of requesting mocked backend responses from API powered by amokjs:

* **amokjs** will serve response content from a file matching file name in the request path. For example if you send API request to *yourapi.com/xml* mock will serve response from file named *xml*.

* **amokjs** will serve response content from a file matching **x-mock-filename** header content. In this case the main request path has to be */*. For example if you send API request to *yourapi.com/* and request will contain *x-mock-filename* HTTP header - mock will serve response from file named *xml*.

### Supported headers

Headers **amokjs** supports:

* **x-mock-response-code** request header allows developers to request custom HTTP response code from mock API
* **x-mock-filename** request header allows developers to pass mock file name in the HTTP request header rather then request path. For example if *x-mock-filename: xml* is used in the header and request path is */* mock API will attempt to serve response from *xml* file.

### Supported template variables

In your response files you can use several template variables in order to get values generated dynamically. Below are the template values **amockjs** supports:

* **@date@** - will be replaced with the current timestamp. Format: YYYY-MM-DD
* **@randomDate@** - will be replaced with the random timestamp. Format: YYYY-MM-DD
* **@longid@** - will be replaced with the 10 digits long random number
* **@shortid@** - will be replaced with the random number up to 5 digits long

### Example curl requests

Below are few example curl requests to test the mock API:

    curl -XGET 'http://localhost:3030/mock-api/xml'
    curl -XGET -H 'x-mock-filename: xml' 'http://localhost:3030/'
    curl -XGET -H "x-mock-response-code: 500" 'http://localhost:3030/xml'

### Tutorials

* [Building API mocks with Amokjs](https://www.popularowl.com/blog/build-api-mocks-with-amokjs/)

### Contribute

We welcome pull requests if you have any sugestions for improvements.

By [@sauliuz](https://twitter.com/sauliuz) and [popularowl.com](http://www.popularowl.com "apis made simple")
