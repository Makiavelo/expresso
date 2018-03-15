const { setWorldConstructor } = require('cucumber');
const request = require('request-promise');
const expect = require('chai').expect;
const config = require('config');
const Promise = require('bluebird');

const API_KEY = config.get('app.security.token');
const API_URL = config.get('app.url');

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

  postArticle(body) {
    const options = {
      "method": "post",
      "headers": { "X-API-Key": API_KEY },
      "url": API_URL+"/api/v1/article",
      "body": body,
      "json": true
    };

    return request(options);
  }

  updateArticle(body) {
    const options = {
      "method": "put",
      "headers": { "X-API-Key": API_KEY },
      "url": API_URL+"/api/v1/article"+body._id,
      "body": body,
      "json": true
    };

    return request(options);
  }

  searchArticle(tags) {
    const options = {
      "method": "get",
      "headers": { "X-API-Key": API_KEY },
      "url": API_URL+"/api/v1/article/search?tags="+tags,
      "json": true
    };

    return request(options);
  }

  deleteArticle(articleId) {
    const options = {
      "method": "delete",
      "headers": { "X-API-Key": API_KEY },
      "url": API_URL+"/api/v1/article/"+articleId,
      "json": true
    };

    return request(options);
  }

  buildSearchArticlesPromises(userId) {
    let promises = [];

    for(let i = 0; i < 10; i++) {
      let tags = [];
      tags[0] = (i < 5) ? "xtag1" : "xtag2";
      tags[1] = (i < 7) ? "ytag1" : "ytag2";
      tags[2] = "ztag"+i;

      promises.push(this.postArticle({"userId": userId, "title": "search title "+i, "text": "search text "+i, "tags": tags}));
    }

    return Promise.all(promises);
  }
}

setWorldConstructor(CustomWorld);