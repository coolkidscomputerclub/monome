/*global AudioContext, webkitAudioContext*/

define(['monome', 'plugins/jquery.easing'], function (monome) {

    var sound = {

        name: 'sine',

        oscType: 0,

        baseFrequency: 100,

        audioFiles: [],

        context: (typeof AudioContent === 'function') ? new AudioContext() : new webkitAudioContext(),

        url: Modernizr.audio.ogg ? 'sounds/sine.ogg' : 'sounds/sine.mp3',

        init: function (key) {

            var self = this;

            self.key = key;

            // Configure oscillator

            self.osc = self.context.createOscillator();

            self.osc.type = self.oscType;

            // Configure filters

            self.gainNode = self.context.createGainNode();

            self.filter = self.context.createBiquadFilter();

            // Set location multiplier

            var currentLocation = 1;

            switch(currentLocation) {

                case 1:
                    self.baseFrequency = self.baseFrequency * 1;
                    break;

                case 2:
                    self.baseFrequency = self.baseFrequency * 1.3;
                    break;

                case 3:
                    self.baseFrequency = self.baseFrequency * 1.6;
                    break;

            }

            // Play tone

            self.osc.frequency.value = self.baseFrequency * self.key.tone;

        },

        play: function () {

            var self = this,
                monome = self.key.monome,
                activeCount = 0;


            for (var i = 0, j = monome.steps[monome.step]; i < j.length; i++) {

                if (monome.steps[monome.step][i].pressed === true) {

                    activeCount++;

                }

            }

            // Route through gain node

            self.osc.connect(self.gainNode);

            // Prevent Distortion

            self.gainNode.gain.value = 0.8 / activeCount;

            // Ramp out

            $(self.gainNode.gain).animate({

                value: 0

            }, self.key.monome.phase, 'easeInOutQuad');

            // Gain -> Filter

            self.gainNode.connect(self.filter);

            self.filter.type = 1;

            self.filter.frequency.value = 200;

            // Connect to destination

            self.filter.connect(self.context.destination);

            self.osc.noteOn && self.osc.noteOn(0);

            var timeout = setTimeout(function(){

                // Stop tone

                self.osc.disconnect();

            }, 125);

        }

    };

    return sound;

});