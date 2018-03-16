const Joi = require('joi');

class UserValidator {
  construct() {

  }

  validate(user) {
    const schema = Joi.object().keys({
      name: Joi.string().min(3).max(30).required(),
      avatar: Joi.string().uri().required()
    });

    return Joi.validate(user.schema, schema);
  }
}

module.exports = new UserValidator();