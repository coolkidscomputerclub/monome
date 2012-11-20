define(function() {

	var oscillator = {

		context: new webkitAudioContext,

		baseFrequency: 200,

		// Initialise osc
		init: function () {

			var self = this;

			var audioContext = self.context;

			self = audioContext.createOscillator();

			self.connect(audioContext.destination);

			self.frequency.value = self.baseFrequency;

			self.noteOn && self.noteOn(0);

			console.log("Oscillator initialised" + self);

		},

		// Play tone
		play: function () {

		},

		stop: function () {

			self.noteOn && self.noteOn(0);

		}

	}

	return oscillator;

});