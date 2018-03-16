const _ = require('lodash');
const db = require('../../services/db');

class BaseModel {
  constructor() {
    this.schema = {};
    this.collection = "";
  }

  get(property) {
    return _.get(this.schema, property);
  }

  set(property, value) {
    if(_.has(this.schema, property)) {
      _.set(this.schema, property, value);
    }
    return this;
  }

  load(result) {
    _.assign(this.schema, result);
  }
}

module.exports = BaseModel;