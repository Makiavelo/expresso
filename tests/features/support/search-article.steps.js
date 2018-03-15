const {Given, When, Then} = require('cucumber');

const VALID_ARTICLE = {
  "userId": '',
  "title": "Test article update",
  "text": "test article update text",
  "tags": ["searchtag1", "tag2", "tag3"]
};

const VALID_USER = {
  "name": "test search",
  "avatar": "http://myurl.com/image.jpg"
};

let searchResponse, emptySearchResponse;

Given('Articles don\'t exist for the selected tags', function () {
  this.postUser(VALID_USER)
    .then((response) => {
      return this.buildSearchArticlesPromises(response.data._id);
    });
});

When('I send the invalid tags to the API endpoint', function () {
  return this.searchArticle("BAD_TAG")
    .then((response) => {
      emptySearchResponse = response;
    });
});

Then('I don\'t get any results', function () {
  this.expect(emptySearchResponse.data).to.have.lengthOf(0);
});

When('I search with the following tags {string}', function (tags) {
  return this.searchArticle(tags)
    .then((response) => {
      searchResponse = response;
    });
});

Then('I get {int} results', function (number) {
  this.expect(searchResponse.data).to.have.lengthOf(number);
});

