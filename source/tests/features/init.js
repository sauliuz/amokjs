/* eslint new-cap: "off", no-invalid-this: "off" */

'use strict';

const apickli = require('apickli');
const {Before, setDefaultTimeout} = require('@cucumber/cucumber');

Before(function() {
  this.apickli = new apickli.Apickli('http', 'localhost:3000');
  this.apickli.addRequestHeader('Cache-Control', 'no-cache');
});

setDefaultTimeout(60 * 1000);

module.exports = require('apickli/apickli-gherkin');