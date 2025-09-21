const fs = require('node:fs/promises');


// SPEED COMPLEXITY = how fast execute of the code
// SPACE COMPLEXITY = how much memory


// 1️⃣ SOLUTION I
// File Size Copied: 1 Gb
// Memory Usage: 1 Gb
// Execution Time: 900 ms
// (async () => {
//   console.time('copy');
//   const destFile = await fs.open('text-copy.txt', 'w');
//   // const result = await fs.readFile('file-small.txt'); // 100 000 weight of file-small.txt = 689 Kb
//   const result = await fs.readFile('file-big.txt'); // 100 000 000 weight of file-big.txt = 989 Mb
//   // const result = await fs.readFile('file-huge.txt'); // 1 000 000 000 weight of file-huge.txt = 10.89 Gb
//
//   await destFile.write(result);
//
//   // console.log('RESULT', result);
//   // console.log('DESTINATION', destFile);
//   // setInterval(async () => {}, 1000);
//
//   console.timeEnd('copy');
//
// })();



// 2️⃣ SOLUTION II
// File Size Copied 1 Gb
// Memory Usage: 27 Mb
// Execution Time: 2 seconds
// -------------------------
// File Size Copied 10.89 Gb
// Memory Usage: 42 Mb
// Execution Time: 13 seconds
(async () => {
  console.time('copy');

  const srcFile = await fs.open('file-small.txt', 'r'); // 100 000 weight of file-small.txt = 689 Kb
  // const srcFile = await fs.open('file-big.txt', 'r'); // 100 000 000 weight of file-big.txt = 989 Mb
  // const srcFile = await fs.open('file-huge.txt', 'r'); // 1 000 000 000 weight of file-huge.txt = 10.89 Gb

  const destFile = await fs.open('text-copy.txt', 'w');

  let bytesRead = -1;

  while (bytesRead !== 0) {
    const readResult = await srcFile.read();
    bytesRead = readResult.bytesRead;

    if (bytesRead !== 16384) {
      const indexOfNotFilled = readResult.buffer.indexOf(0)
      const newBuffer = Buffer.alloc(indexOfNotFilled);
      readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled)
      destFile.write(newBuffer)
    } else {
      destFile.write(readResult.buffer);
    }


  }

  console.timeEnd('copy');

})();
