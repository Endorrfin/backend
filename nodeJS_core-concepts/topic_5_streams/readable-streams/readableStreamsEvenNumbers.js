const fs = require('node:fs/promises');

// OPEN SOME FILE USING TERMINAL
// <path> cat file.small.txt

// SOLUTION
(async () => {
  console.time('READ BIG');
  const startRead = Date.now();

  // const fileHandleRead = await fs.open('file-huge.txt', 'r'); // ⚖️ from 1 to 1 000 000 000 = 10.89 GB
  // const fileHandleRead = await fs.open('file-large.txt', 'r'); // ⚖️ from 1 to 10 000 000 = 88.9 Mb
  // const fileHandleRead = await fs.open('file-medium.txt', 'r'); // ⚖️ from 1 to 1 000 000 = 7.9 Mb
  const fileHandleRead = await fs.open('file-small.txt', 'r'); // ⚖️ from 1 to 100 000 = 689 Kb

  const readDuration = Date.now() - startRead;
  console.log('File read preparation took:', readDuration, 'ms');

  const fileHandleWrite = await fs.open('copy-file.txt', 'w');

  // const streamRead = fileHandleRead.createReadStream({highWaterMark: 400});
  const streamRead = fileHandleRead.createReadStream({highWaterMark: 64 * 1024}); // 64 Kb
  const streamWrite = fileHandleWrite.createWriteStream();

  let split = '';

  streamRead.on('data', (chunk) => {
    const numbers = chunk.toString('utf-8').split('  ');

    if (Number(numbers[0]) !== Number(numbers[1]) - 1) {
      if (split) {
        numbers[0] = split.trim() + numbers[0].trim();
      }
    }

    if (Number(numbers[numbers.length - 2]) + 1 !== Number(numbers[numbers.length - 1])) {
      split = numbers.pop();
    }

    numbers.forEach((number) => {
      let n = Number(number);

      if (n % 2 === 0) {
        if (!streamWrite.write(' ' + n + ' ')) {
          streamRead.pause();
        }
      }
    })

    // console.log(numbers);

  });

  streamWrite.on('drain', () => {
    streamRead.resume();
  })

  streamRead.on('end', () => {
    console.log('✅ Done reading');
    console.timeEnd('READ BIG');
  })

})();
