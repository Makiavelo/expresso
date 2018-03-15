@api @article @article_search
Feature: API user search for articles by tag

  Scenario: Search articles by invalid tags
    Given Articles don't exist for the selected tags
    When I send the invalid tags to the API endpoint
    Then I don't get any results

  Scenario Outline: Searching articles by tag
    When I search with the following tags <tags>
    Then I get <results> results

    Examples:
      | tags                | results |
      | "xtag1"             |       5 |
      | "ytag1"             |       7 |
      | "xtag1,ytag1,ztag1" |       1 |