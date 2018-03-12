'use strict';
module.exports = function(app) {
  const controller = require('controller');

  app.route('/')
    .post(controller.create);
};