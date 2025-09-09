const { Buffer, constants } = require('buffer');

const buffer = Buffer.alloc(10000, 0);

const unsafeBuffer = Buffer.allocUnsafe(10000);

// Buffer.from()
// Buffer.concat()

for (let i = 0; i < unsafeBuffer.length; i++) {
  if (unsafeBuffer[i] !== 0) {
    console.log(`Element an position ${i} has value: ${unsafeBuffer[i].toString(2)}`);
  }
}

