Feature: API user search for articles by tag

  Scenario: Search articles by valid tags
    Given An existing article with the given tags
    When I send the request to the API endpoint
    Then I get article results

  Scenario: Search articles by invalid tags
    Given Articles don't exist for the selected tags
    When I send the invalid tags to the API endpoint
    Then I don't get any results