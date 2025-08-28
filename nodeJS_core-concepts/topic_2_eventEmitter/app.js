const EventEmitter = require('./events');

class Emitter extends EventEmitter {}

const myE = new Emitter();

myE.on('foo', () => {
  console.log('🎭 An event occurred 1️⃣.');
});


myE.on('foo', () => {
  console.log('🎭 An event occurred 2️⃣.');
});


myE.on('foo', (x) => {
  console.log('🎭 An event with parameter occurred 3️⃣.');
  console.log(x);
});


// myE.on('bar', () => {
//   console.log('🎪 An event occurred bar');
// });


myE.once('bar', () => {
  console.log('🎪 An event occurred bar');
});


myE.emit('foo');
myE.emit('foo', 'some text');



myE.emit('bar');
myE.emit('bar');
myE.emit('bar');
myE.emit('bar');
myE.emit('bar');
