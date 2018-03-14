Feature: API user can add articles
  As an API user
  I want to add an article
  So a user has a related article

  Scenario: Add an article
    Given A valid article object
    When I send the valid article to the API endpoint
    Then The article is created

  Scenario: Add an invalid article
    Given An invalid article object
    When I send the invalid article to the API endpoint
    Then The article is not created

  Scenario: Add an article with invalid user
    Given A valid article object with an invalid user id
    When I send the article with invalid user id to the API endpoint
    Then The article with invalid user id is not created