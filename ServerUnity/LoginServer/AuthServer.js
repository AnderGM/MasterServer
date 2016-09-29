//Dependencies
var io = require ('socket.io')(7100);

var Register = require('./SignUp.js').SignUpReq;
var Login = require ('./Login.js');
//Start Server
var InitializeServer = function () {
	//Receive Connections
	io.on ('connection', function (socket){

		socket.on ("LoginEnterReq", function(){
			console.log("New connection");
			socket.emit("LoginEnterRes");
		});

		var NewPlayer = new Login.Start(socket);

		socket.on ('ConfirmAccountReq', NewPlayer.Confirm);
		socket.on ('SignUpReq', Register);

		socket.on ('disconnect', function (){
			console.log ('Client disconnected');
		});
	});
};
//Exports modules
module.exports.InitializeServer = InitializeServer;