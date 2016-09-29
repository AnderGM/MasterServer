var MongoDB = require('mongodb').MongoClient;
var ShortID = require('shortid');

var config = require('./config.js');


var SignUpReq = function (data) {

	var newuser = {username: data.username, password: data.password, email: data.email, id: ShortID.generate()};

	MongoDB.connect(config.dburl, function (err, db){

		if (err){
			throw err;
		}

		Savedata(db, newuser);
	});
};

var Savedata = function (db, newuser){

	db.collection('register').find(newuser).toArray(function (err, result){

		if (err){
			throw err;
		};

		if (result.length > 0){
			console.log ('Sorry, this user already are registered');
			db.close();
		}else{
			db.collection('register').insertOne (newuser, function (err, result){
				if (err){
					throw err;
				};
				console.log ('Congrulations, you are now registered!');
				db.close();
			});
		};
	});
};

module.exports.SignUpReq = SignUpReq;