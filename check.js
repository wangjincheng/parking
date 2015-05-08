var url = 'mongodb://119.29.78.47:27017/parking';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});