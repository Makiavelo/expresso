'use strict';
module.exports = function(app) {
  const controller = require('controller');

  app.route('/')
    .post(controller.create);

  app.route('/seach')
    .get(controller.search);

  app.route('/:id')
    .put(controller.edit)
    .delete(controller.delete);
};