/*global io*/

require(['plugins/log', 'jquery', 'monome', 'socket.io'], function (log, $, monome) {

	var main = {

		monome: monome,

		location: {},

		development: true,

		init: function () {

			var self = this;

			self.monome.generate();

			self.bindEvents();

			self.socketConnect();

			console.log('Main initiated: ', self);

		},

		bindEvents: function () {

			var self = this;

			var currentLocation;

			$(window).on('keypress', function (e) {

				if (e.keyCode === 32) {

					e.preventDefault();

					self.monome.clear();

				}

			})

			// Disable location select for monome dev

			if (!self.development) {

<<<<<<< HEAD
				$(".location").click(function () {
=======
				self.registerSocket();
>>>>>>> f2dc840826399a753d344c85c51221d1313e7621

					self.location.name = $(this).attr("id");

					console.log("Current location: " + self.location.name);

					$("#splash").addClass("hidden");

<<<<<<< HEAD
					$("#monome").removeClass("hidden");

					$(".loading").addClass(self.location.name);

				});

			} else {

				$("#splash").addClass("hidden");

				$("#loader").addClass("hidden");

				$("#monome").removeClass("hidden");
=======
				console.log("Current location: ", self.location.name);

			});
>>>>>>> f2dc840826399a753d344c85c51221d1313e7621

			}
			
		},

		socketConnect: function () {

			var self = this;

			self.socket = io.connect('//' + location.hostname + ':8080');

			self.bindSocketEvents();

		},

		bindSocketEvents: function () {

			var self = this;

			self.socket.on('message', function (data) {

				console.log('Message: ', data.message);

			});

		},

		registerSocket: function () {

			var self = this;

			self.socket.emit('register', self.location);

		}

	};

	$(document).ready(function () {

		main.init();

	});

});