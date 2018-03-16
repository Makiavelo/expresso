const _ = require('lodash');
const db = require('../../services/db');
const ObjectID = require('mongodb').ObjectID;

class BaseRepository {
  constructor(model, collectionModel) {
    this.db = db.getDb();
    this.collection = "";
    this.model = model;
    this.collectionModel = collectionModel;
  }

  query(rawQuery) {
    const collection = this.db.collection(this.collection);
    return collection
      .find(rawQuery).toArray()
      .then((results) => {
        const collectionModel = new this.collectionModel(results);
        return collectionModel;
      })
      .catch((err) => {
        throw Error(err);
      });
  }

  find(id) {
    const collection = this.db.collection(this.collection);
    return collection
      .findOne({"_id": new ObjectID(id)})
      .then((err, document) => {
        const model = new model();
        return model.load(document);
      })
      .catch((err) => {
        throw Error(err);
      });
  }

  save(instance) {
    console.log('save!');
    const collection = db.getDb().collection(this.collection);
    return collection.insert(instance.schema)
      .then((result) => {
        console.log('save succesfull! ');
        console.log(JSON.stringify(result, null, 2));
        instance.schema._id = result.insertedIds["0"];
        return result;
      })
      .catch((err) => {
        console.log('save error!!!');
        console.log(err);
        //throw Error(err);
      });
  }
}

module.exports = BaseRepository;