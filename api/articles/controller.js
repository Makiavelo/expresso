const BaseApiController = require('../base/base-api-controller');
const Article = require('./model');
const repo = require('./repository');
const validator = require('./validator');
const _ = require('lodash');
const debug = require('debug')('controller');

class ArticleController extends BaseApiController  {
  constructor() {
    super();
  }

  search(req, res) {
    debug('article::search');
    let tagsCsv = decodeURIComponent(_.get(req, 'query.tags', null));
    if(tagsCsv) {
      let tags = tagsCsv.split(',');
      repo.findByTags(tags)
        .then((collection) => {
          res.json(this.ok("success", 200, collection.getRaw()));
        })
        .catch((err) => {
          res.json(this.fail());
        })
    } else {
      res.json(this.fail("No tags provided", 400));
    }
  }

  create(req, res) {
    debug('article::create');
    const body = _.get(req, 'body');
    validator.validate(body)
      .then((result) => {
        validator.validateUser(_.get(body, 'userId'))
          .then((result) => {
            const article = new Article();
            article.load(body);
            repo.save(article)
              .then((result) => {
                res.json(this.ok("success", 200, { "_id": article.get('_id') }));
              });
          })
          .catch((result) => {
            res.json(this.fail("Invalid user", 400));
          });
      })
      .catch((result) => {
        res.json(this.fail("validation failed", 400, result.error.details));
      });
  }

  edit(req, res) {
    let body = _.get(req, 'body');
    validator.validate(body)
      .then((result) => {
        validator.validateUser(_.get(body, 'userId'))
          .then(() => {
            let id = _.get(req, 'params.id', null);
            repo.find(id)
              .then((article) => {
                article.load(_.get(req, 'body'));
                repo.save(article)
                  .then((result) => {
                    res.json(this.ok("success", 200, article.schema));
                  });
              })
              .catch((error) => {
                res.json(this.fail("Article not found", 404));
              });
          })
          .catch((result) => {
            res.json(this.fail("Invalid user", 400));
          });

      })
      .catch((result) => {
        res.json(this.fail("validation failed", 400, result.error.details));
      });
  }

  delete(req, res) {
    let id = _.get(req, 'params.id', null);
    repo.find(id)
      .then((article) => {
        repo.delete(article)
          .then(() => {
            res.json(this.ok());
          })
      })
      .catch((err) => {
        res.json(this.fail("Article not found", 404));
      });
  }
}

module.exports = new ArticleController();
