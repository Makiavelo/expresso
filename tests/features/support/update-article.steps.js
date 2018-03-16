const {Given, When, Then, Before, After} = require('cucumber');

const VALID_ARTICLE = {
  "userId": '',
  "title": "Test article update",
  "text": "test article update text",
  "tags": ["tag1", "tag2", "tag3"]
};
let VALID_ARTICLE_ID = "";

const VALID_ARTICLE_UPDATE = {
  "userId": '',
  "title": "Updated title",
  "text": "Updated text",
  "tags": ["updated tag1", "updated tag2", "updated tag3"]
};
let VALID_ARTICLE_UPDATE_ID = "";

const VALID_USER = {
  "name": "test article update",
  "avatar": "http://myurl.com/image.jpg"
};

let articleUpdateResponse, articleInvalidUpdateResponse, articleNonExistentUpdateResponse, articleUpdateWrongUserResponse;

Before({tags: "@api_valid_article_update"}, function() {
  return this.postUser(VALID_USER)
    .then((response) => {
      VALID_USER["_id"] = response.data._id;
      VALID_ARTICLE["userId"] = VALID_USER["_id"];
      VALID_ARTICLE_UPDATE["userId"] = VALID_USER["_id"];
    });
});

Given('A valid article exists', function () {
  return this.postArticle(VALID_ARTICLE)
    .then((response) => {
      VALID_ARTICLE_ID = response.data._id;
      VALID_ARTICLE_UPDATE_ID = response.data._id;
    });
});

When('I send the valid article update to the API endpoint', function () {
  return this.updateArticle(VALID_ARTICLE_UPDATE, VALID_ARTICLE_UPDATE_ID)
    .then((response) => {
      articleUpdateResponse = response;
    });
});

Then('The article is updated', function () {
  this.expect(articleUpdateResponse.http_status).to.equal(200);
});

Given('The valid article', function () {

});

When('I send the invalid article parameters to the API endpoint', function () {
  const invalid_data = { "title": "a" };
  return this.updateArticle(invalid_data, VALID_ARTICLE_ID)
    .then((response) => {
      articleInvalidUpdateResponse = response;
    });
});

Then('The article is not updated', function () {
  this.expect(articleInvalidUpdateResponse.http_status).to.equal(400);
});

Given('A non existent article id', function () {

});

When('I send the non existent article id to the API endpoint', function () {
  return this.updateArticle(VALID_ARTICLE, "XYZ")
    .then((response) => {
      articleNonExistentUpdateResponse = response;
    });
});

Then('I get a 404', function () {
  this.expect(articleNonExistentUpdateResponse.http_status).to.equal(404);
});

Given('A valid article id with an invalid user id', function () {

});

When('I send the article with invalid user id to the update API endpoint', function () {
  const invalid_data = Object.assign({}, VALID_ARTICLE);
  invalid_data.userId = "MADE_UP_ID";

  return this.updateArticle(invalid_data, VALID_ARTICLE_ID)
    .then((response) => {
      articleUpdateWrongUserResponse = response;
    });
});

Then('The article with invalid user id is not updated', function () {
  this.expect(articleUpdateWrongUserResponse.http_status).to.equal(400);
});


