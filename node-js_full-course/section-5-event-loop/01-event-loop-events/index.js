const fs = require('fs');
const dns = require('dns');


function timestamp() {
  return performance.now().toFixed(0);
}


console.log('------- Program start -------> ');


// ------------ Node.js - Close events ------------
fs.writeFile('./test.txt', 'Hello Node.js', () => console.log('File written 1 -> ', timestamp()));
fs.writeFile('./test2.txt', 'Hello Node.js again', () => console.log('File written 2 -> ', timestamp()));

// ------------ Node.js - Promises ------------
Promise.resolve().then(() => console.log('Promise 1 ->', timestamp()));


// ------------ Node.js - Next tick ------------
process.nextTick(() => console.log('Next tick 1 ->', timestamp())); // has priority

// ------------ Node.js - setImmediate (Check)  ------------
setImmediate(() => console.log('Immediate 1 -> ', timestamp()));


// ------------ Node.js - Timeouts ------------
setTimeout(() => console.log('Timeout 1 -> ', performance.now().toFixed(0)), 0);
setTimeout(() => console.log('Timeout 2 ->', timestamp()), 100);
setTimeout(() => {
  process.nextTick(() => console.log('Next tick 2 ->', timestamp()));
  console.log('Timeout 3 ->', timestamp());
}, 300);


// ------------ Node.js - Intervals ------------
let intervalCount = 0;
const intervalId = setInterval(() => {
  console.log(`Interval ${intervalCount += 1}`, timestamp());
  if (intervalCount === 7) clearInterval(intervalId);
}, 50);


// ------------ Node.js - Input / Output Events ------------
dns.lookup('google.com', (err, address, family) => {
  console.log('DNS 1 google.com ->', address, timestamp());
})

dns.lookup('localhost', (err, address, family) => {
  console.log('DNS 2 localhost ->', address, timestamp());
  Promise.resolve().then(() => console.log('Promise 2 ->', timestamp()));
  process.nextTick(() => console.log('Next tick 3 ->', timestamp()));
})

console.log('======= Program end =======>');
