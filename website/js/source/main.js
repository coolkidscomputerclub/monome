/*global io*/

require(['plugins/log', 'jquery', 'monome', 'socket.io'], function (log, $, monome) {

	var main = {

		monome: monome,

		location: {},

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

			});

			$(".location").click(function () {

				self.location.name = $(this).attr("id");

				self.registerSocket();

				$("#splash").addClass("hidden");

				$("#loader").removeClass("hidden");

				$(".loading").addClass(self.location.name);

				console.log("Current location: ", self.location.name);

			});

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