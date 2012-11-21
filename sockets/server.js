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

	socket.emit('message', {

		message: 'Congrats, your penis fits in the socket!'

	});

	socket.on('register', function (data) {

		locations[socket.id] = {

			id: socket.id,

			socket: socket,

			name: data.name

		};

	});

	socket.on('press', function (data) {

		var i;

		for (i in locations) {

			if (locations.hasOwnProperty(i) && i !== socket.id) {

				locations.i.socket.emit('press', data);

			}

		}

	});

	socket.on('disconnect', function () {

		delete locations[socket.id];

	});

});