var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://119.29.78.47:27017/parking';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/getAroundPlaces', function(req, res, next) {
  	var findAroundPlaces = function(db, callback) {
  	console.dir(req.query.longitude);
  	console.dir(req.query.latitude);
  	var radian=req.query.max*1.0/6371.0;
  	console.dir(radian);
   	var cursor =db.collection('places').find( {'loc':{$nearSphere:[req.query.longitude*1.0,req.query.latitude*1.0],$maxDistance:radian}});
    //var cursor =db.collection('places').find( {'loc':{$nearSphere:[116,39],$maxDistance:20}});
   	cursor.toArray(function(err, doc) {
      		assert.equal(err, null);
      		if (doc != null) {
         		res.send(doc);
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
});
module.exports = router;
