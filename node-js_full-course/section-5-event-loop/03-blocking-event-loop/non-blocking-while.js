const fs = require('fs');

let isRunning = true;

setTimeout(() => isRunning = false, 10);
process.nextTick(() => console.log('----------> Next tick <----------'));


function setImmediatePromise() {
  return new Promise((resolve, reject) => {
    setImmediate(() => resolve()); // broken infinity while loop

    // with resolve() we stay on the same event loop iteration
    // resolve(); // will be infinity calling whileLoop
  })

  let isRunning = true;

  setTimeout(() => isRunning = false, 0);

  process.nextTick(() => console.log('Next tick'));

  while(isRunning) {
    console.log('While loop is running...');
  }

};


async function whileLoop() {
  while(isRunning) {
    console.log('While loop is running...');
    await setImmediatePromise();
  }
};

whileLoop().then(() => console.log('While loop ended'));

