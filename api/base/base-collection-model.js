const _ = require('lodash');

class BaseCollectionModel {
  constructor(model, result) {
    this.collection = [];
    this.model = model;
    this.load(result);
  }

  load(result) {
    if(_.isArray(result)) {
      _.forEach(result, (value, index) => {
        let instance = new this.model();
        instance.load(value);
        this.collection.push(instance);
      });
    }
  }
}

module.exports = BaseCollectionModel;