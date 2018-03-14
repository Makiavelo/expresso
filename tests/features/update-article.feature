Feature: API user can update articles
  As an API user
  I want to update an article

  Scenario: Update an article
    Given A valid article exists
    When I send the valid article update to the API endpoint
    Then The article is updated

  Scenario: Update an article with invalid parameters
    Given The valid article
    When I send the invalid article parameters to the API endpoint
    Then The article is not updated

  Scenario: Update an article that doesn't exist
    Given A non existent article id
    When I send the non existent article id to the API endpoint
    Then I get a 404

  Scenario: Update an article with invalid user
    Given A valid article id with an invalid user id
    When I send the article with invalid user id to the update API endpoint
    Then The article with invalid user id is not updated