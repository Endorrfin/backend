const { Buffer, constants } = require('buffer');

const b1 = Buffer.alloc(1e9); // 1,000,000,000 bytes (1GB)
const b2 = Buffer.alloc(0.5e9); // 500,000,000 bytes (500 MB)

console.log(constants.MAX_LENGTH);

setInterval(() => {
  // for (let i = 0; i < b2.length; i++) { // b.length is the size of the buffer in bytes
  //   b[i] = 0x22;
  // }

  b.fill(0x22);
}, 5000)

