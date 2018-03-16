const {Given, When, Then} = require('cucumber');

const VALID_USER = {
  "name": "test1",
  "avatar": "http://myurl.com/image.jpg"
};

const INVALID_USER = {};

let postResponse, invalidPostResponse;

Given('A valid user object', function () {

});

When('I send the valid user to the API endpoint', function () {
  // Write code here that turns the phrase above into concrete actions
  return this.postUser(VALID_USER)
    .then((response) => {
      postResponse = response;
    });
});

Then('The user is created', function () {
  this.expect(postResponse.http_status).to.equal(200);
});

Given('An invalid user object', function () {

});

When('I send the invalid user to the API endpoint', function () {
  return this.postUser(INVALID_USER)
    .then((response) => {
      invalidPostResponse = response;
    });
});

Then('The user is not created', function () {
  this.expect(invalidPostResponse.http_status).to.equal(400);
});
