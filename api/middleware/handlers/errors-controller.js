const BaseApiController = require('../../base/base-api-controller');
const _ = require('lodash');
const debug = require('debug')('controller');

class ErrorsController extends BaseApiController {
  constructor() {
    super();
  }

  notFound(req, res, next) {
    res.status(404).send("Not found");
  }

  handler(error, req, res, next) {
    //console.log(error);
    const status = _.get(error, 'status', 500);
    res.json(this.fail("Unexpected error!", status));
  }
}

module.exports = new ErrorsController();
