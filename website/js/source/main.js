/*global io*/

// add 'socket.io'

require(['plugins/log', 'jquery', 'monome'], function (log, $, monome) {

	var main = {

		monome: monome,

		location: {},

		init: function () {

			var self = this;

			self.monome.generate();

			self.bindEvents();

			// self.socketConnect();

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

				console.log("Current location: " + self.location.name);

				$("#splash").addClass("hidden");

				$("#loader").removeClass("hidden");

				$(".loading").addClass(self.location.name);

			});

		},

		socketConnect: function () {

			var self = this;

			self.socket = io.connect('http://iamsaul.co.uk:8080');

			self.bindSocketEvents();

		},

		bindSocketEvents: function () {

			var self = this;

			self.socket.on('join', function (data) {

				self.user = data;

			});

			self.socket.on('key', function (data) {

				console.log('Key data:', data);

			});

		}

	};

	$(document).ready(function () {

		main.init();

	});

});