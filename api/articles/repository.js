const BaseRepository = require('../base/base-repository');
const Article = require('./model');
const ArticleCollection = require('./collection-model');

class ArticleRepository extends BaseRepository {
  constructor() {
    super(Article, ArticleCollection);
    this.collection = "articles";
  }

  findByCrazyParams() {

  }
}

module.exports = new ArticleRepository();