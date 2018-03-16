const BaseApiController = require('../../base/base-api-controller');
const _ = require('lodash');
const debug = require('debug')('controller');
const config = require('config');

class AuthController extends BaseApiController {
  constructor() {
    super();
  }

  check(req, res, next) {
    console.log('======> token: '+config.get('app.security.token'))
    console.log('======> AUTH CHECK!: X-API-Key = '+req.header('X-API-Key'));
    if(req.header('X-API-Key') === process.env.ACCESS_TOKEN) {
      next();
    } else {
      res.json(this.fail("Authentication required", 401));
    }
  }
}

module.exports = new AuthController();