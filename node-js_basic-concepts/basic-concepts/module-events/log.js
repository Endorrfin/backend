const EventEmitter = require('events');
const util = require('util');

// const emitter = new EventEmitter();

class Logger {
  log = (msg) => {
    console.log(msg);
    this.emit('some_event', { id: 1, text: 'Event text text!' });
  }
}

util.inherits(Logger, EventEmitter);


module.exports = Logger;