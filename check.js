var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://119.29.78.47:27017/parking';

var findAroundPlaces = function(db, callback) {
   var cursor =db.collection('places').find( {'loc':{$nearSphere:[116,39],$maxDistance:20}});
   var out='[';
   cursor.toArray(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findAroundPlaces(db, function() {
      db.close();
  });
});