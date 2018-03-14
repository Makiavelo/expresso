Feature: API user can add users
  As an API user
  I want to add a user
  So that I can create articles for him

  Scenario: Add a user
    Given A valid user object
    When I send the valid user to the API endpoint
    Then The user is created

  Scenario: Add an invalid user
    Given An invalid user object
    When I send the invalid user to the API endpoint
    Then The user is not created