Feature: Validating the existing out of the box funcionality of amock
	As an API developer, I want to make sure that my Mock API has all the described funcionality
	
	Scenario: I should get default response code if no mock headers are supplied
		When I POST to /html
		Then response code should be 200

	Scenario: I should get response code specified in the request header
		Given I set x-mock-response-code header to 500
		When I POST to /html
		Then response code should be 500

	Scenario: I should get response code specified in the request header
		Given I set x-mock-response-code header to 404
		When I POST to /html
		Then response code should be 404

	Scenario: I should get successful response by suplying mock filename in the request header
		Given I set x-mock-filename header to html
		When I POST to /
		Then response code should be 200