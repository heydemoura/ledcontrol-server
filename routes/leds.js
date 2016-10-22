var express = require('express');
var router = express.Router();
var rpio = require('rpio');


var pins = {
	leds: 8
};

var response = {
	status: true,
	message: 'Sucess!'
};

rpio.open(pins.leds, rpio.OUTPUT);


router.get('/', function(req, res, next) {
	response.data = {
		state: rpio.read(pins.leds) 
	};

	response.message = "LEDs are " + (response.data.state ? 'OFF' : 'ON');

	res.status(200).send(response);
});

router.post('/on', function(req, res, next) {
	rpio.open(pins.leds, rpio.OUTPUT, rpio.LOW);
	res.status(200).send(response);
});

router.post('/off', function(req, res, next) {
	rpio.open(pins.leds, rpio.OUTPUT, rpio.HIGH);
	res.status(200).send(response);
});


module.exports = router;
