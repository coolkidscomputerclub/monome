/*global AudioContext, webkitAudioContext*/

define(['monome'], function (monome) {

    var sound = {

        name: 'sine',

        oscType: 2,

        baseFrequency: 200,

        location: "blazey",

        basePath: "sounds/",

        audioFiles: [],

        context: (typeof AudioContent === 'function') ? new AudioContext() : new webkitAudioContext(),

        url: Modernizr.audio.ogg ? 'sounds/sine.ogg' : 'sounds/sine.mp3',

        init: function (key) {

            var self = this;

            self.key = key;

            // Configure Oscillator
            
            self.osc = self.context.createOscillator();

            self.osc.type = self.oscType;

        },

        play: function () {

            var self = this;

            self.osc.connect(self.context.destination);

            self.osc.noteOn && self.osc.noteOn(0);

            console.log("on");

            var timeout = setTimeout(function(){

                self.osc.frequency.value = self.baseFrequency * self.key.tone;

                self.osc.disconnect();

                console.log("off");

            }, 125);

        },

        pause: function () {

            var self = this;
        }

    };

    return sound;

});