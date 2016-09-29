var MongoDB = require('mongodb').MongoClient;
var config = require('./config.js');

function Start(socket){

    this.Confirm = function(data){
    	MongoDB.connect(config.dburl, function(err, db){

    	if (err)
    		throw err;

    	var newclient = {username: data.username, password:data.password};

	    db.collection('register').find(newclient).toArray(function(err, result){

	    	if (err)
	    		throw err;	
	    	
	    	if (result.length > 0){
	    		console.log ("Veryfication Success");
	    		socket.emit("ConfirmAccountRes", {message:'Veryfication Success', ip:'ws://127.0.0.1:7200/socket.io/?EIO=3&transport=websocket', opcode:'0', playerid:result[0].id});
	    	}else{
	    		console.log("Sorry, this account not exist");
	    		socket.emit("ConfirmAccountRes", {message:'Sorry, this account not exist', opcode:'1'});
	    	};

	    	db.close();

	    	});
    	});
    }
}

module.exports.Start = Start;
