const BaseModel = require('../base/base-model');

class User extends BaseModel {
  constructor() {
    super();
    this.setSchema();
    this.collection = "users";
  }

  setSchema() {
    this.schema = {
      "name": "",
      "avatar": ""
    }
  }

  sayHi() {
    console.log('Hi! Im '+this.get('name'));
  }
}

module.exports = User;