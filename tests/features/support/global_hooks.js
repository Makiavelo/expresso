var {AfterAll, BeforeAll} = require('cucumber');
const config = require('config');
const MongoClient = require('mongodb').MongoClient;

BeforeAll(function (callback) {
    const url = process.env.NODE_ENV ? config.get('db.url'):config.get('db.host_url');
    MongoClient.connect(url, function(err, client) {
      console.log("Connected successfully to server");

      const db = client.db("expresso");
      db.collection("users").remove();
      db.collection("articles").remove();

      callback();
      client.close();
    });
});

// Asynchronous Promise
/*AfterAll(function () {

});*/