var MongoDB = require("mongodb").MongoClient;
var config = require("./config.js");

function LoadCharacter (socket){

	this.Load = function (data){
		var CharID = {id:data.id};
		console.log("received");
		MongoDB.connect(config.dburl, function (err, db){
			if (err)
				throw err;

			db.collection("characters").find(CharID).toArray(function(err, result){

				if(result < 1){
					console.log("Not have characters");
					socket.emit ("loadchares", {opcode: "1"});
				}else{
					console.log("Success, this account have " + result.length + " characters");
					socket.emit ("loadchares", {opcode: "0"});
				};

				db.close();
			});
		});
	}
}

module.exports.LoadCharacter = LoadCharacter;