const { setWorldConstructor } = require('cucumber');
const request = require('request-promise');
const expect = require('chai').expect;
const config = require('config');

const API_KEY = config.get('app.security.token');
const API_URL = config.get('app.url');
const json = true;
const options = {
  "method": "",
  "headers": {},
  "url": "",
  "body": {},
  "json": true
}

class CustomWorld {
  constructor() {
    this.expect = expect;
  }

  postUser(body) {
    const options = {
      "method": "post",
      "headers": { "X-API-Key": API_KEY },
      "url": API_URL+"/api/v1/user",
      "body": body,
      "json": true
    };

    return request(options);
  }
}

setWorldConstructor(CustomWorld);