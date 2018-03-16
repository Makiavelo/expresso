const Joi = require('joi');

class UserValidator {
  construct() {

  }

  validate(user) {
    return new Promise((resolve, reject) => {
      const schema = Joi.object().keys({
        name: Joi.string().min(3).max(30).required(),
        avatar: Joi.string().uri().required()
      });

      let result = Joi.validate(user.schema, schema);
      if(!result.error) {
        resolve(result);
      } else {
        reject(result);
      }
    });
  }
}

module.exports = new UserValidator();