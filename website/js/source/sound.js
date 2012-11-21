/*global AudioContext, webkitAudioContext*/

define(['monome'], function (monome) {

    var sound = {

        name: 'sine',

        oscType: 0,

        baseFrequency: 100,

        location: "blazey",

        basePath: "sounds/",

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

            self.gainNode.gain.value = (0.5 / Math.max(activeCount));

            console.log("Gain: " + self.gainNode.gain.value);

            // Ramp out

            $(self.gainNode.gain).animate({ 

                value: .1

            }, self.key.monome.phase / 2, 'linear');

            // Connect to destination

            self.gainNode.connect(self.context.destination);

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