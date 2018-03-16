const Joi = require('joi');
const Promise = require('bluebird');
const userRepo = require('../users/repository');

class ArticleValidator {
  construct() {

  }

  validate(params) {
    return new Promise((resolve, reject) => {
      const schema = Joi.object().keys({
        userId: Joi.string().required(),
        title: Joi.string().required(),
        text: Joi.string().required(),
        tags: Joi.array().required(),
      });
      const result = Joi.validate(params, schema);

      if (!result.error) {
        resolve(result);
      } else {
        reject(result);
      }
    });
  }

  validateUser(userId) {
    return userRepo.find(userId);
  }
}

module.exports = new ArticleValidator();