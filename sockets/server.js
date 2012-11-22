var webServer = require('http').createServer(handler),
	io = require('socket.io').listen(webServer),
	locations = {};

webServer.listen(8080);

function handler (req, res) {

	res.end('Get that dirty thing out of my socket...');

    res.writeHead(200);

	res.end(data);

}

io.sockets.on('connection', function (socket) {

	// on joining, send a welcome message

	socket.emit('message', {

		message: 'Congrats, your penis fits in the socket!'

	});

	// when the client sends registration, store their details (location) and send back a debug message

	socket.on('join', function (data) {

		locations[socket.id] = {

			id: socket.id,

			socket: socket,

			name: data.name

		};

		socket.emit('message', {

			message: 'Hi, ' + data.name + '!'

		});

		console.log(locations);

	});

	socket.on('press', function (data) {

		// when the client sends a press, pass that press on to everyone but the person who sent it.

		for (var i in locations) {

			if (locations.hasOwnProperty(i) && i !== socket.id) {

				locations[i].socket.emit('press', data);

			}

		}

	});

	socket.on('disconnect', function () {

		delete locations[socket.id];

	});

});