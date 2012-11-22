define(['sound'], function (sound) {

    var key = {

        name: 'key',

        tone: 0,

        step: 0,

        pressed: false,

        active: false,

        init: function () {

            var self = this;

            self.$domObject = $('<button/>', {

                'id': self.id,

                'class': 'key',

                'data-tone': self.tone,

                'data-step': self.step

            }).css({

                width: self.width,

                height: self.height

            });

            self.sound = $.extend({}, sound);

            self.sound.init(self);

            self.bindEvents();

        },

        bindEvents: function () {

            var self = this;

            self.$domObject.on('click', function () {

                var $this = $(this);

                if ($this.hasClass('pressed')) {

                    self.clear(self.monome.main.location.name);

                } else {

                    self.press(self.monome.main.location.name);

                }

            });

        },

        press: function (location) {

            var self = this,
                main = self.monome.main,
                data;

            self.pressed = true;

            // if the key has been pressed by our client

            if (location === main.location.name) {

                data = {

                    location: main.location,

                    key: {

                        id: self.id,

                        state: 1

                    }

                };

                console.log('Emitting press: ', data);

                main.socket.emit('press', data);

            } else {

                self.remote = true;

            }

            self.$domObject.addClass('pressed ' + location);

        },

        clear: function (location) {

            var self = this,
                main = self.monome.main,
                data;

            self.pressed = false;

            self.$domObject.removeClass('pressed');

            if (location === main.location.name) {

                data = {

                    location: main.location,

                    key: {

                        id: self.id,

                        state: 0

                    }

                };

                console.log('Emitting clear: ', data);

                main.socket.emit('press', data);

            }

            self.$domObject.removeClass('fowey blazey austell pressed');

        },

        activate: function () {

            var self = this,
                timeout;

            self.$domObject.addClass('active');

            self.sound.play();

            timeout = setTimeout(function () {

                self.$domObject.removeClass('active');

            }, self.monome.phase);

        }

    };

    return key;

});