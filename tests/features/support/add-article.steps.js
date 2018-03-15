const {Given, When, Then, Before, After} = require('cucumber');

const VALID_ARTICLE = {
  "userId": '',
  "title": "Test article",
  "text": "test article text",
  "tags": ["tag1", "tag2", "tag3"]
};

const INVALID_USER_ARTICLE = {
  "userId": "XYZ",
  "title": "Test article",
  "text": "test article text",
  "tags": ["tag1", "tag2", "tag3"]
};

const VALID_USER = {
  "name": "test1",
  "avatar": "http://myurl.com/image.jpg"
};

Before({tags: "@api_add_article"}, function() {
  return this.postUser(VALID_USER)
    .then((response) => {
      VALID_USER["_id"] = response.data._id;
      VALID_ARTICLE["userId"] = VALID_USER["_id"];
    });
});

let validPostResponse, invalidPostResponse, invalidUserPostResponse;

Given('A valid article object', function () {

});

When('I send the valid article to the API endpoint', function () {
  return this.postArticle(VALID_ARTICLE)
    .then((response) => {
      validPostResponse = response;
    });
});

Then('The article is created', function () {
  this.expect(validPostResponse.http_status).to.equal(200);
});

Given('An invalid article object', function () {

});

When('I send the invalid article to the API endpoint', function () {
  return this.postArticle({})
    .then((response) => {
      invalidPostResponse = response;
    });
});

Then('The article is not created', function () {
  this.expect(invalidPostResponse.http_status).to.equal(400);
});

Given('A valid article object with an invalid user id', function () {

});

When('I send the article with invalid user id to the API endpoint', function () {
  return this.postArticle(INVALID_USER_ARTICLE)
    .then((response) => {
      invalidUserPostResponse = response;
    });
});

Then('The article with invalid user id is not created', function () {
  this.expect(invalidPostResponse.http_status).to.equal(400);
});

