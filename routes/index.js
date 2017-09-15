const rpio = require('rpio')
const GPIOController = require('../controllers/GPIOController')

var pins = {
  '8': {
    mode: rpio.OUTPUT,
    value: rpio.HIGH
  }, 
  '10': {
    mode: rpio.OUTPUT,
    value: rpio.HIGH
  }
};

const gpioController = new GPIOController(pins)

module.exports = app => {
  app.route('/')
    .get((req, res) => {
      console.log(req.query)
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
