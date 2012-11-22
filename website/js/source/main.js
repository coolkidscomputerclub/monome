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

					self.monome.clear();

				}

			})

			// Disable location select for monome dev

			if (config.debugMode === true) {

				$(".location").click(function () {

					self.location.name = $(this).attr("id");

					self.socket.emit('join', self.location);

					$("#splash").addClass("hidden");

					$("#monome").removeClass("hidden");

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

			self.socket = io.connect('http://' + location.hostname + ':8080');

			self.bindSocketEvents();

		},

		bindSocketEvents: function () {

			var self = this;

			self.socket.on('message', function (data) {

				console.log('Message: ', data.message);

			});

			self.socket.on('press', function (data) {

				// press (or clear) the necessary key and give it a class for the relevant location

				console.log('Press received from: ', data, data.location.name, data.key.id);

			});

		}

	};

	$(document).ready(function () {

		main.init();

	});

});