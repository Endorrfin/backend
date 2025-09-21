// encryption/decryption => crypto
// hashing/salting => crypto
// compression => zlib
// decoding/encoding => buffer text-encoding/decoding

const { Transform } = require('node:stream');
const fs = require('node:fs/promises');

class Dycrypt extends Transform {
  _transform(chunk, encoding, callback) {
    // <35 - 1, ff, a5 - 1, 12 - 1, 23 - 1...>
    for (let i = 0; i < chunk.length; ++i) {
      if ( chunk[i] !== 255) {
        chunk[i] = chunk[i] - 1;
      }
    }
    console.log('🪄 DECRYPTION TEXT:', chunk.toString('utf-8'));
    // this.push(chunk);
    callback(null, chunk);
  }
}

(async () => {
  // const readFileHandle = await fs.open('write.txt', 'r')
  const readFileHandle = await fs.open('numbers-write.txt', 'r')
  // const writeFileHandle = await fs.open('decrypted.txt', 'w')
  const writeFileHandle = await fs.open('decrypted-numbers.txt', 'w')

  const readStream = readFileHandle.createReadStream();
  const writeStream = writeFileHandle.createWriteStream();

  const decrypt = new Dycrypt()

  readStream.pipe(decrypt).pipe(writeStream);
})()
