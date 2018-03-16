const _ = require('lodash');
const db = require('../../services/db');
const ObjectId = require('mongodb').ObjectId;
const Promise = require('bluebird');

class BaseRepository {
  constructor(model, collectionModel) {
    this.db;
    this.collection = "";
    this.model = model;
    this.collectionModel = collectionModel;
  }

  get db() {
    return db.getDb();
  }

  query(rawQuery) {
    const collection = this.db.collection(this.collection);
    return collection
      .find(rawQuery).toArray()
      .then((results) => {
        return results;
      })
      .catch((err) => {
        throw Error(err);
      });
  }

  find(id) {
    const collection = this.db.collection(this.collection);

    //Added try/catch block because id can be an invalid hex
    try {
      return collection
        .findOne({ "_id": new ObjectId(id) })
        .then((document) => {
          const model = new this.model();
          model.load(document);
          return model;
        })
        .catch((err) => {
          throw Error(err);
        });
    } catch (error) {
      return Promise.reject();
    }
  }

  save(instance) {
    const collection = db.getDb().collection(this.collection);

    return collection.save(instance.schema)
      .then((result) => {
        if(_.has(result, 'insertedIds')) {
          instance.schema._id = result.insertedIds["0"];
        }

        return result;
      })
      .catch((err) => {
        throw Error(err);
      });
  }

  delete(instance) {
    const collection = db.getDb().collection(this.collection);

    return collection.deleteOne({ "_id" : ObjectId(instance.schema._id) });
  }
}

module.exports = BaseRepository;