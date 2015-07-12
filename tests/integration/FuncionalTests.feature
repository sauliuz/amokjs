Feature: Validating if Mock API funcionality matches specifications
	As an API developer, I want to make sure that my Mock API has all the funcionality
	Which is described in backend service specification
	
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