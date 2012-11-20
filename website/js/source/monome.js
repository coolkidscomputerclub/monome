define(['key'], function (key) {

	var monome = {

		name: 'monome',

		$domObject: $('#monome'),

        size: 9,

        phase: 125,

        step: 0,

        steps: [],

        keys: [],

        keySpacing: 8,

		start: function () {

            var self = this;

            self.interval = setInterval(function () {

                if (self.step < self.size) {

                    self.step++;

                } else {

                    self.step = 1;

                }

                self.activateStep(self.step);

            }, self.phase);

        },

        activateStep: function (step) {

            var self = this,
                length = self.steps[step].length,
                i = 0;

            for (i; i < length; i++) {

                if (self.steps[step][i].pressed === true) {

                    self.steps[step][i].activate();

                }

            }

        },

        generate: function () {

            var self = this,
                i;

            for (i = 1; i <= self.size; i++) {

                self.steps[i] = [];

            }

            self.keySize = (self.$domObject.width() - (self.size * self.keySpacing)) / self.size;

            console.log(self.keySize);

            self.addKeys();

            // self.setSize();

            self.start();

        },

        addKeys: function () {

            var self = this,
                thisKey,
                $keys = $('<div/>'),
                keyTotal = self.size * self.size,
                keyCount = 1,
                tone = 1,
                step = 1;

            while (keyCount <= keyTotal) {

                thisKey = $.extend({}, key, {

                    tone: tone,

                    step: step,

                    id: keyCount,

                    monome: self,

                    width: self.keySize,

                    height: self.keySize

                });

                thisKey.init();

                $keys.append(thisKey.$domObject);

                self.steps[step].push(thisKey);

                self.keys.push(thisKey);

                keyCount++;

                step++;

                if ((keyCount - 1) % self.size === 0) {

                    tone++;

                    step = 1;

                }

            }

            self.$keys = $keys.children();

            self.$domObject.html(self.$keys);

        },

        setSize: function () {

            var self = this,
                $key = self.$keys.eq(0),
                keyWidth,
                keySpacing,
                keySize;

            keyWidth = parseInt($key.css('width'), 10);

            keySpacing = parseInt($key.css('margin-right'), 10) * 2;

            keySize = keyWidth + keySpacing;

            self.$domObject.css({

                width: self.size * keySize,

                height: self.size * keySize

            });

        },

        clear: function () {

            var self = this,
                length = self.keys.length;

            for (var i = 0; i < length; i++) {

                if (self.keys[i].pressed === true) {

                    self.keys[i].clear();

                }

            }

        }

	};

    return monome;

});