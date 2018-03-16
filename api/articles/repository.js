const BaseRepository = require('../base/base-repository');
const Article = require('./model');
const ArticleCollection = require('./collection-model');

class ArticleRepository extends BaseRepository {
  constructor() {
    super(Article, ArticleCollection);
    this.collection = "articles";
  }

  findByTags(tags) {
    const collection = this.db.collection(this.collection);
    const query = {
      tags: { $all: tags }
    };

    return collection
      .find(query).toArray()
      .then((results) => {
        return new ArticleCollection(results);
      })
      .catch((err) => {
        throw Error(err);
      });
  }
}

module.exports = new ArticleRepository();