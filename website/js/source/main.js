/*global io*/

require(['plugins/log', 'jquery', 'monome', 'socket.io'], function (log, $, monome) {

	var main = {

		monome: monome,

		location: {},

		init: function () {

			var self = this;

			self.monome.init(self);

			self.bindEvents();

			self.socketConnect();

			console.log('Main initiated: ', self);

		},

		bindEvents: function () {

			var self = this,
				currentLocation;

			$(window).on('keypress', function (e) {

				if (e.keyCode === 32) {

					e.preventDefault();

					self.monome.clear(self.location.name);

				}

			});

			$('#sync').on('click', function (e) {

				e.preventDefault();

				self.socket.emit('sync', self.location);

				return false;

			});

			// Disable location select for monome dev

			if (config.debugMode === true) {

				$(".location").click(function () {

					self.location.name = $(this).attr("id");

					self.socket.emit('join', self.location);

					$("#splash").addClass("hidden");

					$("#monome, #sync").removeClass("hidden");

				});

			} else {

				$(".location").click(function () {

					self.location.name = $(this).attr("id");

					self.socket.emit('join', self.location);

					$("#splash").addClass("hidden");

					// extra step of waiting to receive registrations here

					$("#loader").removeClass("hidden").addClass(self.location.name);

				});

			}

		},

		socketConnect: function () {

			var self = this;

			self.socket = io.connect('http://192.168.0.2:8080');
			// self.socket = io.connect('http://' + location.hostname + ':8080');

			self.bindSocketEvents();

		},

		bindSocketEvents: function () {

			var self = this;

			self.socket.on('message', function (data) {

				console.log('Message: ', data.message);

			});

			self.socket.on('press', function (data) {

				// press (or clear) the necessary key and give it a class for the relevant location

				var key = self.monome.keys[data.key.id];

				if (key.pressed === false) {

					key.press(data.location.name);

				} else {

					key.clear(data.location.name);

				}


				console.log('Press received from: ', data, data.location.name, data.key.id);

			});

			self.socket.on('sync', function (data) {

				console.log('Synchronised by ' + data.name + '!');

				clearInterval(self.monome.interval);

				self.monome.synced = true;

				self.monome.start();

			});

		}

	};

	$(document).ready(function () {

		main.init();

	});

});