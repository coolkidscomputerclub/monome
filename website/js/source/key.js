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

                    self.clear();

                } else {

                    self.press();

                }

            });

        },

        press: function (location) {

            var self = this,
                main = self.monome.main,
                data;

            self.pressed = true;

            self.$domObject.addClass('pressed');

            // if the key has been pressed by our client

            if (location === undefined) {

                data = {

                    location: main.location,

                    key: {

                        id: self.id,

                        state: 1

                    }

                };

                console.log('Emitting press: ', data);

                main.socket.emit('press', data);

            }

        },

        clear: function (location) {

            var self = this,
                main = self.monome.main,
                data;

            self.pressed = false;

            self.$domObject.removeClass('pressed');

            if (location === undefined) {

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