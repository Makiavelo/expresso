const BaseCollectionModel = require('../base/base-collection-model');
const User = require('./model');

class UserCollection extends BaseCollectionModel {
  constructor(result) {
    super(User, result);
  }

  get() {
    return this.collection;
  }
}

module.exports = UserCollection;