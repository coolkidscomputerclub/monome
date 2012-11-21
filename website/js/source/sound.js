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

            self.delayNode = self.context.createDelayNode();

            self.filter = self.context.createBiquadFilter();

        },

        setLocation: function () {

            var self = this;

            var activeLocation = $(":radio[name=location]:checked").val();

        },

        play: function () {

            var self = this;

            // Route through gain node

            self.osc.connect(self.gainNode);

            // Prevent Distortion

            var activeCount = $(".active").length;

            console.log(activeCount);

            self.gainNode.gain.value = (0.1 / Math.max(activeCount));

            console.log("Gain: " + self.gainNode.gain.value);

            // Ramp out

            $(self.gainNode.gain).animate({ 

                value: .1

            }, self.key.monome.phase, 'easeInOutQuad');

            // Gain -> Filter

            self.osc.connect(self.filter);

            self.filter.type = 1;

            self.filter.frequency.value = 200;

            // Connect to destination

            self.filter.connect(self.context.destination);

            // Play tone

            self.osc.frequency.value = self.baseFrequency * self.key.tone;

            self.osc.noteOn && self.osc.noteOn(0);

            var timeout = setTimeout(function(){

                // Stop tone

                self.osc.disconnect();

            }, 125);

        }

    };

    return sound;

});