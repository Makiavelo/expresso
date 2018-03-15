@api @article @article_delete
Feature: API user can delete articles
  As an API user
  I want to delete an article

  @api_article_delete_valid
  Scenario: Delete an article
    Given An existing article id
    When I send the existing article id to the API endpoint
    Then The article is deleted

  Scenario: Delete an article that doesn't exist
    Given An invalid article id
    When I send the invalid article id to the API endpoint
    Then get a 404