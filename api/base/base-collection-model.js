const _ = require('lodash');

class BaseCollectionModel {
  constructor(model, result) {
    this.collection = [];
    this.model = model;
    if(result) this.load(result);
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

  getRaw() {
    let rawCollection = [];
    _.forEach(this.collection, (value) => {
      rawCollection.push(value.schema);
    });
    return rawCollection;
  }
}

module.exports = BaseCollectionModel;