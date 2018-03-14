const BaseApiController = require('../base/base-api-controller');

class UserController extends BaseApiController  {
  constructor() {
    super();
  }

  create(req, res) {
    res.json(this.ok());
  }
}

module.exports = new UserController();
