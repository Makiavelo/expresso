@api @article @article_add
Feature: API user can add articles
  As an API user
  I want to add an article
  So a user has a related article

  @api_add_article
  Scenario: Add an article
    Given A valid article object
    When I send the valid article to the API endpoint
    Then The article is created

  @api_add_article_invalid
  Scenario: Add an invalid article
    Given An invalid article object
    When I send the invalid article to the API endpoint
    Then The article is not created

  @api_add_article_invalid_user
  Scenario: Add an article with invalid user
    Given A valid article object with an invalid user id
    When I send the article with invalid user id to the API endpoint
    Then The article with invalid user id is not created