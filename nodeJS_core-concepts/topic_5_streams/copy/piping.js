const { pipeline } = require('node:stream');
const fs = require('node:fs/promises');

// 3️⃣ SOLUTION I PIPING
// File Size Copied 1 Gb
// Memory Usage: 27 Mb
// Execution Time: 695.301ms
// -------------------------
// File Size Copied 10.89 Gb
// Memory Usage: 34 Mb
// Execution Time: 70.619 ms
(async () => {
  console.time('copy');

  // const srcFile = await fs.open('file-small.txt', 'r'); // 100 000 weight of file-small.txt = 689 Kb
  const srcFile = await fs.open('file-big.txt', 'r'); // 100 000 000 weight of file-big.txt = 989 Mb
  // const srcFile = await fs.open('file-huge.txt', 'r'); // 1 000 000 000 weight of file-huge.txt = 10.89 Gb

  const destFile = await fs.open('copy-file.txt', 'w');

  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();

  // console.log(readStream.readableFlowing);
  // readStream.pipe(writeStream);

  // console.log(readStream.readableFlowing);

  // readStream.unpipe(writeStream);

  // console.log(readStream.readableFlowing);

  // readStream.pipe(writeStream);

  // console.log(readStream.readableFlowing);

  // readStream.on('end', () => {
  //   console.timeEnd('copy');
  // })

  pipeline(readStream, writeStream, (err) => {
    console.log(err);
    console.timeEnd('copy');
  });

})();
