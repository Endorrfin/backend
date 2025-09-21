const fs = require('node:fs/promises');


// CREATE NUMBERS FROM 1 TO 1 000 000 USING TERMINAL
  // for i in $(seq 1 1000000); do
  //   echo -n "$i " >> test.txt
  // done


// 1️⃣ SOLUTION I
// (async () => {
//
//   // const fileHandleRead = await fs.open('test.txt', 'r');
//   // const fileHandleRead = await fs.open('text-gigantic.txt', 'r'); // from 1 to 1 000 000 000 = 10.89 GB
//   const fileHandleRead = await fs.open('src.txt', 'r');
//   const fileHandleWrite = await fs.open('dest.txt', 'w');
//
//   // const streamRead = fileHandleRead.createReadStream({highWaterMark: 400});
//   const streamRead = fileHandleRead.createReadStream({highWaterMark: 64 * 1024});
//   const streamWrite = fileHandleWrite.createWriteStream();
//
//   streamRead.on('data', (chunk) => {
//     streamWrite.write(chunk);
//     console.log('-----------')
//     console.log('✌️ read chunk 📖:', chunk.length);
//   });
//
// })();




// 2️⃣ SOLUTION II
(async () => {

  const startRead = Date.now();

  const fileHandleRead = await fs.open('file-huge.txt', 'r'); // ⚖️ from 1 to 1 000 000 000 = 10.89 GB
  // const fileHandleRead = await fs.open('file-large.txt', 'r'); // ⚖️ from 1 to 10 000 000 = 88.9 Mb
  // const fileHandleRead = await fs.open('file-medium.txt', 'r'); // ⚖️ from 1 to 1 000 000 = 7.9 Mb
  // const fileHandleRead = await fs.open('file-small.txt', 'r'); // ⚖️ from 1 to 100 000 = 689 Kb

  const readDuration = Date.now() - startRead;
  console.log('File read preparation took:', readDuration, 'ms');

  const fileHandleWrite = await fs.open('copy-file.txt', 'w');

  // const streamRead = fileHandleRead.createReadStream({highWaterMark: 400});
  const streamRead = fileHandleRead.createReadStream({highWaterMark: 64 * 1024}); // 64 Kb
  const streamWrite = fileHandleWrite.createWriteStream();

  streamRead.on('data', (chunk) => {
    if (!streamWrite.write(chunk)) {
      console.log('-----------')
      console.log('🧈 read chunk:', chunk.length, 'Kb');
      streamRead.pause();
      console.log('⏳ 🟨 READ DURATION: ', Date.now() - readDuration);
    }
  });

  streamWrite.on('drain', () => {
    streamRead.resume();
    console.log('*** *** ***')
    console.log('✌️ Continuation of the process 💧:');
  })

  console.log('⏳ 🟩🔵🟨🟣 DURATION: ', Date.now() - startRead);

})();
