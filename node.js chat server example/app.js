var express = require("express");
var include = require("./appInclude");

var app = include.createApp(express);
var server = app.listen(80, function() {
    console.log('Listening on port %d', server.address().port);
});

//npm install socket.io --msvs_version=2012
var io = require('socket.io').listen(server);
io.on('connection', function (socket) {
	console.log('Client connected...');
	socket.on('join', function (data) {
		socket.nickname = data.name;
		console.log('nickname is ' + data.name);		
	});
	socket.on('messages', function (data) {
		console.log(data);
		socket.broadcast.emit('messages', data);
	});
});