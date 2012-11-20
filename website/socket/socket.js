var	server = require('http').createServer(),
	io = require('socket.io').listen(server),
	net = require('net'),
	netServer,
	client = null;

server.listen(8080);

io.sockets.on('connection', function (socket) {

	socket.emit('join', {'hello': 'world'});

});

netServer = net.createServer(function (stream) {

	client = stream;

	stream.setTimeout(0);
	
	stream.setEncoding('utf8');
	
	stream.on('connect', function () {

		console.log('*** The Arduino has joined! ***\n');
    
	});

	stream.on('data', function (data) {

		data = data.toString('utf8').replace(/(\r\n|\n|\r|!)/gm, "");

		var sensorID = data.charAt(0),
			reading = data.split(' ')[1];

		console.log("Data: " + data);
		console.log("Sensor ID: " + sensorID);
		console.log("Reading: " + reading);

		switch (sensorID) {

			case "0":

				io.sockets.emit('heat', {reading: reading});

				console.log('Heat: ' + reading);

				reading = "";

			break;

			case "1":

				io.sockets.emit('light', {reading: reading});

				console.log('Light: ' + reading);

				reading = "";

			break;

		}

	});
  
	stream.on('end', function () {

		console.log('*** Arduino has left! ***\n');

		stream.end();

		client = null;

	});

});

netServer.listen(8081);