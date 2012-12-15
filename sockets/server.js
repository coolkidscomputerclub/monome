var webServer = require('http').createServer(handler),
	io = require('socket.io').listen(webServer),
	osc = require('node-osc'),
	oscClient = new osc.Client('141.163.232.29', 8888),
	oscServer = new osc.Server(1338, '127.0.0.1'),
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

	});

	socket.on('press', function (data) {

		// when the client sends a press, pass that press on to everyone but the person who sent it.

		for (var i in locations) {

			if (locations.hasOwnProperty(i) && i !== socket.id) {

				locations[i].socket.emit('press', data);

			}

		}

		console.log('To the OSC server: ', JSON.stringify(data));

		oscClient.send('/press', JSON.stringify(data));

	});

	socket.on('sync', function (data) {

		io.sockets.emit('sync', data);

		oscClient.send('/sync', JSON.stringify(data));

	});

	socket.on('disconnect', function () {

		delete locations[socket.id];

	});

});

oscServer.on('/press', function (msg, rinfo) {

	var oscData = JSON.parse(msg[1]),
		data = {

			location: {

				name: "blazey"

			},

			key: {

				id: oscData.id,

				state: oscData.state

			}

		};

	io.sockets.emit('press', data);

});