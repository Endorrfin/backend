const fs = require('fs');
const dns = require('dns');


function timestamp() {
  return performance.now().toFixed(0);
}

function info (title) {
  console.log(title, performance.now().toFixed(0));
}

console.log('------- Program optimize start -------> ');


// ------------ Node.js - Close events ------------
fs.writeFile('./test1.txt', 'Hello Node.js', () => info('File written 1'));
fs.writeFile('./test2.txt', 'Hello Node.js again', () => info('File written 2'));

// ------------ Node.js - Promises ------------
Promise.resolve().then(() => info('promise 1'));


// ------------ Node.js - Next tick ------------
process.nextTick(() => info('Next tick 1')); // has priority

// ------------ Node.js - setImmediate (Check)  ------------
setImmediate(() => info('Immediate 1 '));


// ------------ Node.js - Timeouts ------------
setTimeout(() => info('Timeout 1'), 0);
setTimeout(() => info('Timeout 2'), 100);
setTimeout(() => {
  process.nextTick(() => info('Next tick 2'));
  info('Timeout 3');
}, 300);


// ------------ Node.js - Intervals ------------
let intervalCount = 0;
const intervalId = setInterval(() => {
  info(`Interval ${intervalCount += 1}`);
  if (intervalCount === 7) clearInterval(intervalId);
}, 50);


// ------------ Node.js - Input / Output Events ------------
dns.lookup('google.com', (err, address, family) => {
  info(`DNS 1 google.com ${address}`);
})

dns.lookup('localhost', (err, address, family) => {
  info( `DNS 2 localhost ${address}`);
  Promise.resolve().then(() => info('Promise 2'));
  process.nextTick(() => info('Next tick 3'));
})

console.log('======= Program optimize end =======>');
