/*global AudioContext, webkitAudioContext*/

define(function () {

    var sound = {

        name: 'sine',

        context: (typeof AudioContent === 'function') ? new AudioContext() : new webkitAudioContext(),

        url: Modernizr.audio.ogg ? 'sounds/sine.ogg' : 'sounds/sine.mp3',

        init: function (key) {

            var self = this;

            self.key = key;

            self.loadSound();

        },

        loadSound: function () {

            var self = this,
                request = new XMLHttpRequest();

            request.open('GET', self.url, true);

            request.responseType = 'arraybuffer';

            request.onload = function () {

                var buffer = self.context.createBuffer(request.response, true);

                self.buffer = buffer;

            };

            request.send();

        },

        play: function () {

            var self = this,
                source = self.context.createBufferSource();

            source.buffer = self.buffer;

            source.playbackRate.value = self.key.tone * (1 / self.key.monome.size);

            console.log('Playback rate: ', source.playbackRate.value);

            source.connect(self.context.destination);

            source.noteOn(self.context.currentTime);

        }

    };

    return sound;

});