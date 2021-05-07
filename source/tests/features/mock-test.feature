@core
Feature:
  amockjs is minimalistic mock framework for nodejs
  as developer, I want to validate amockjs funcionality is working as expected

  Scenario: amockjs should serve xml responses
    When I GET /xml
    Then response body should be valid xml

  Scenario: amockjs should serve json responses
    When I GET /json
    Then response body should be valid json