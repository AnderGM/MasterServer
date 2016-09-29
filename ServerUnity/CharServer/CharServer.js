var io = require ('socket.io')(7200);
var LoadChar = require('./LoadCharacters.js');

var CharServer = function (){

	io.on ('connection', function (socket){

		socket.on ("CharEnterReq", function(){
			console.log ('New connection');
			socket.emit("CharEnterRes");
		});

		var Char = new LoadChar.LoadCharacter(socket);
		socket.on ("loadchareq", Char.Load);

		socket.on ('disconnect', function(){
			console.log("Client disconnected");
		});	
	});
};

module.exports.InitializeServer = CharServer;