const BaseApiController = require('../base/base-api-controller');

class ArticleController extends BaseApiController  {
  constructor() {
    super();
  }

  search(req, res) {
    res.json(this.ok());
  }

  create(req, res) {
    res.json(this.ok());
  }

  edit(req, res) {
    res.json(this.ok());
  }

  delete(req, res) {
    res.json(this.ok());
  }
}

module.exports = new ArticleController();
