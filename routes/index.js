const rpio = require('rpio')
const GPIOController = require('../controllers/GPIOController')

var pins = [{
  id: 8,
  name: 'COMPUTER SETUP',
  mode: rpio.OUTPUT,
  value: rpio.HIGH
}, {
  id: 10,
  name: 'BED LIGHTS',
  mode: rpio.OUTPUT,
  value: rpio.HIGH
}];

const gpioController = new GPIOController(pins)

module.exports = app => {
  app.route('/')
    .get((req, res) => {
      if (req.query.pin && req.query.pin.length) {
        responseData = req.query.pin.map(pin => {
          data = gpioController.getPinState(pin)
          data.id = pin
          return data
        })

        res.status(200).send(responseData)
      } else {
        res.status(200).send(gpioController.getPins())
      }
    })

  app.route('/:pin')
    .patch((req, res) => {
      gpioController.powerToggle(req.params.pin)
      res.sendStatus(204)
    })
}
