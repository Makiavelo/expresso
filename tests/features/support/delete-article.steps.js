const {Given, When, Then, Before, After} = require('cucumber');

const VALID_ARTICLE = {
  "userId": '',
  "title": "Test article delete",
  "text": "test article delete text",
  "tags": ["tag1", "tag2", "tag3"]
};

const VALID_USER = {
  "name": "test delete",
  "avatar": "http://myurl.com/image.jpg"
};

let validDeleteResponse, invalidDeleteResponse;

Before({tags: "@api_article_delete_valid"}, function() {
  return this.postUser(VALID_USER)
    .then((response) => {
      VALID_USER["_id"] = response.data._id;
      VALID_ARTICLE["userId"] = VALID_USER["_id"];
    });
});

Given('An existing article id', function () {
  return this.postArticle(VALID_ARTICLE)
    .then((response) => {
      VALID_ARTICLE["_id"] = response.data._id;
    });
});

When('I send the existing article id to the API endpoint', function () {
  return this.deleteArticle(VALID_ARTICLE["_id"])
    .then((response) => {
      validDeleteResponse = response;
    });
});

Then('The article is deleted', function () {
  this.expect(validDeleteResponse.http_status).to.equal(200);
});

Given('An invalid article id', function () {

});

When('I send the invalid article id to the API endpoint', function () {
  return this.deleteArticle('MADE_UP_ID')
    .then((response) => {
      invalidDeleteResponse = response;
    });
});

Then('get a 404', function () {
  this.expect(validDeleteResponse.http_status).to.equal(404);
});

