@api @error
Feature: Handle API errors

  Scenario: a not found page
    When I enter a page that doesn't exist
    Then I get a not found result

  Scenario: a secured page without token
    When I enter a secured page without the access token
    Then I get an Unauthorized result