const BaseRepository = require('../base/base-repository');
const User = require('./model');
const UserCollection = require('./collection-model');

class UserRepository extends BaseRepository {
  constructor() {
    super(User, UserCollection);
    this.collection = "users";
  }

  findByCrazyParams() {

  }
}

module.exports = new UserRepository();