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
/*
exports.search = (req, res) => {
  res.json({hi:"world"});
};

exports.create = (req, res) => {
  //req.body
  res.json({});
};

exports.edit = (req, res) => {
  //req.params.taskId, req.body
  res.json({});
};

exports.delete = (req, res) => {
  //_id: req.params.id
  res.json({});
};*/
