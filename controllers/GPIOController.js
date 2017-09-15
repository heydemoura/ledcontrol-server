const rpio = require('rpio')

module.exports = function (pins) {
  this.pins = pins
  for (let pin in this.pins) {
    rpio.open(pin, this.pins[pin].mode, this.pins[pin].value)
  }

  this.powerOn = function (pin) {
    rpio.open(pin, rpio.OUTPUT, rpio.LOW)
    this.pins[pin].mode = rpio.OUTPUT
    this.pins[pin].value = rpio.LOW
  }

  this.powerOff = function (pin) {
    rpio.open(pin, rpio.OUTPUT, rpio.HIGH)
    this.pins[pin].mode = rpio.OUTPUT
    this.pins[pin].value = rpio.HIGH
  }

  this.powerToggle = function (pin) {
    const state = rpio.read(pin)
    rpio.open(pin, rpio.OUTPUT, +!state)
    this.pins[pin].mode = rpio.OUTPUT
    this.pins[pin].value = +!state
  }

  this.getPins = function () {
    return this.pins
  }

  this.getPinState = function (pin) {
    return this.pins[pin] 
  }
}
