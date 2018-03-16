const request = require('request-promise');
const {When, Then} = require('cucumber');
const config = require('config');

When('I enter a page that doesn\'t exist', function () {

});

Then('I get a not found result', function (callback) {
  const options = {
    "method": "get",
    "headers": { "X-API-Key": config.get('app.security.token') },
    "url": config.get('app.url')+"/I_DONT_EXIST",
    "json": true
  };

  request(options)
    .then((response) => {
      callback();
    })
    .catch((error) => {
      this.expect(error.statusCode).to.equal(404);
      callback();
    });
});

When('I enter a secured page without the access token', function () {

});

Then('I get an Unauthorized result', function (callback) {
  const options = {
    "method": "get",
    "url": config.get('app.url')+"/api/v1/article/search",
    "json": true
  };

  request(options)
    .then((response) => {
      this.expect(response.http_status).to.equal(401);
      callback();
    });
});