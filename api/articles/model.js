const BaseModel = require('../base/base-model');

class Article extends BaseModel {
  constructor() {
    super();
    this.setSchema();
    this.collection = "articles";
  }

  setSchema() {
    this.schema = {
      "userId": "",
      "title": "",
      "text": "",
      "tags": []
    }
  }
}

module.exports = Article;