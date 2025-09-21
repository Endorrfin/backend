// encryption/decryption => crypto
// hashing/salting => crypto
// compression => zlib
// decoding/encoding => buffer text-encoding/decoding

const { Transform } = require('node:stream');
const fs = require('node:fs/promises');

class Encrypt extends Transform {
  _transform(chunk, encoding, callback) {
    // <34 + 1, ff + 1, a4 + 1, 11 + 1, 22 + 1...>
    for (let i = 0; i < chunk.length; ++i) {
      if ( chunk[i] !== 255) {
        chunk[i] = chunk[i] + 1;
      }
    }
    console.log('🪄 ENCRYPTION TEXT:', chunk.toString('utf-8'));
    callback(null, chunk);
  }
}

(async () => {
  // const readFileHandle = await fs.open('read.txt', 'r')
  const readFileHandle = await fs.open('numbers-read.txt', 'r')
  // const writeFileHandle = await fs.open('write.txt', 'w')
  const writeFileHandle = await fs.open('numbers-write.txt', 'w')

  const readStream = readFileHandle.createReadStream();
  const writeStream = writeFileHandle.createWriteStream();

  const encrypt = new Encrypt()

  readStream.pipe(encrypt).pipe(writeStream);
})()

