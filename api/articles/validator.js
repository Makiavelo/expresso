const Joi = require('joi');

class ArticleValidator {
  construct() {

  }

  validate(article) {
    const schema = Joi.object().keys({
      userId: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      tags: Joi.array().required(),
    });

    return Joi.validate(article.schema, schema);
  }
}

module.exports = new ArticleValidator();