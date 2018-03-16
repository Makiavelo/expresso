const BaseCollectionModel = require('../base/base-collection-model');
const Article = require('./model');

class ArticleCollection extends BaseCollectionModel {
  constructor(result) {
    super(Article, result);
  }

  get() {
    return this.collection;
  }
}

module.exports = ArticleCollection;