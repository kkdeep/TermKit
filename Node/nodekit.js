#!/usr/bin/env node
var termkit = {
  version: 1,
};

//require.paths.unshift(__dirname + '/../Shared/');

// Load requirements.
var http = require('http'),  
	path = require('path'),
    io = require('socket.io'),
	paperboy = require('paperboy')
    router = require("./router.js"),
	
	PORT = 2222,
	WEBROOT = path.join(path.dirname(__filename), 'webroot');

// Load config file.
var config = require('./config.js').getConfig();

// Set up http server.
var server = http.createServer(function (request, result) { 
  paperboy.deliver(WEBROOT, request, result);
}).listen(PORT);

// Set up WebSocket and handlers.
var ioServer = io.listen(server); 
ioServer.sockets.on('connection', function (client) {
  var p = new router.router(client);
});
