const BaseApiController = require('../base/base-api-controller');
const User = require('./model');
const repo = require('./repository');
const validator = require('./validator');
const _ = require('lodash');
const debug = require('debug')('controller');

class UserController extends BaseApiController  {
  constructor() {
    super();
  }

  create(req, res) {
    debug('user::create');
    const user = new User();
    user.load(req.body);

    validator.validate(user)
      .then(() => {
        repo.save(user)
          .then((result) => {
            res.json(this.ok("success", 200, { "_id": user.get('_id') }));
          })
      })
      .catch((result) => {
        res.json(this.fail("validation failed", 400, result.error.details));
      });
  }
}

module.exports = new UserController();
