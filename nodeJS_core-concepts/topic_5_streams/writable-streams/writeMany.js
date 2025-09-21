const fs = require('node:fs/promises');


// console.time('writeMany');
// let a = 2 + 2;
// console.timeEnd('writeMany');


// Execution Time: 8s
// CPU Usage: 100% (one core)
// Memory Usage: 50MB
// 🟠 I USING ASYNC AWAIT
// (async () => {
//   console.time('writeMany');
//
//   const fileHandle = await fs.open('text.txt', 'w')
//
//   for (let i = 0; i < 1000000; i++) {
//     await fileHandle.write(` ${i} `);
//   }
//
//   console.timeEnd('writeMany');
//   // console.timeEnd('⌛️', 'writeMany');
// })()


// const fs = require('node:fs');

// Execution Time: 1.7s
// CPU Usage: 100% (one core)
// Memory Usage: 600MB
// 🟠 II USING CALLBACK
// (async () => {
//   console.time('writeMany');
//
//   fs.open('file.txt', 'w', (err, fd) => {
//     const buff = Buffer.from(` a `, 'utf-8');
//     for (let i = 0; i < 1000000; i++) {
//       fs.writeSync(fd, buff);
//       // fs.write(fd, ` ${i} `, () => {});
//     }
//
//     console.timeEnd('writeMany');
//
//   });
// })()




// DON'T DO IT THIS WAY!!!
// Execution Time: 200ms
// CPU Usage: 100% (one core)
// Memory Usage: 150MB
// 🟠 III USING ASYNC AWAIT
// (async () => {
//   console.time('writeMany');
//
//   const fileHandle = await fs.open('test.txt', 'w');
//
//   const stream = fileHandle.createWriteStream()
//
//   for (let i = 0; i < 1000000; i++) {
//     const buff = Buffer.from(` ${i} `, 'utf-8');
//     stream.write(buff);
//   }
//
//   console.timeEnd('writeMany');
//   // console.timeEnd('⌛️', 'writeMany');
// })()




// // 🟠 IV USING ASYNC AWAIT
// (async () => {
//   console.time('writeMany');
//
//   const fileHandle = await fs.open('test.txt', 'w');
//
//   const stream = fileHandle.createWriteStream();
//
//   console.log(stream.writableHighWaterMark);
//   console.log(stream.writableLength);
//
//   const buff = Buffer.from('string');
//
//   stream.write(buff);
//   console.log(buff);
//   console.log(stream.writableLength);
//
//
//
//   // for (let i = 0; i < 1000000; i++) {
//   //   const buff = Buffer.from(` ${i} `, 'utf-8');
//   //   stream.write(buff);
//   // }
//
//   console.timeEnd('writeMany');
//   // console.timeEnd('⌛️', 'writeMany');
// })()




// ++++++++++++++++++++++++


// const fs = require("node:fs/promises");

// Execution Time: 8s
// CPU Usage: 100% (one core)
// Memory Usage: 50MB
// (async () => {
//   console.time("writeMany");
//   const fileHandle = await fs.open("test.txt", "w");

//   for (let i = 0; i < 1000000; i++) {
//     await fileHandle.write(` ${i} `);
//   }
//   console.timeEnd("writeMany");
// })();

// Execution Time: 1.8s
// CPU Usage: 100% (one core)
// Memory Usage: 50MB
// const fs = require("node:fs");

// (async () => {
//   console.time("writeMany");
//   fs.open("test.txt", "w", (err, fd) => {
//     for (let i = 0; i < 1000000; i++) {
//       const buff = Buffer.from(` ${i} `, "utf-8");
//       fs.writeSync(fd, buff);
//     }

//     console.timeEnd("writeMany");
//   });
// })();

// const fs = require("node:fs/promises");

// DON'T DO IT THIS WAY!!!!
// Execution Time: 270ms
// CPU Usage: 100% (one core)
// Memory Usage: 200MB
// (async () => {
//   console.time("writeMany");
//   const fileHandle = await fs.open("test.txt", "w");

//   const stream = fileHandle.createWriteStream();

//   for (let i = 0; i < 1000000; i++) {
//     const buff = Buffer.from(` ${i} `, "utf-8");
//     stream.write(buff);
//   }
//   console.timeEnd("writeMany");
// })();


// Execution Time: 300ms
// Memory Usage: 50MB
(async () => {
  console.time("writeMany");
  const fileHandle = await fs.open("test.txt", "w");

  const stream = fileHandle.createWriteStream();

  console.log(stream.writableHighWaterMark);

  // 8 bits = 1 byte
  // 1000 bytes = 1 kilobyte
  // 1000 kilobytes = 1 megabyte

  // 1a => 0001 1010

  // const buff = Buffer.alloc(16383, "a");
  // console.log(stream.write(buff));
  // console.log(stream.write(Buffer.alloc(1, "a")));
  // console.log(stream.write(Buffer.alloc(1, "a")));
  // console.log(stream.write(Buffer.alloc(1, "a")));

  // console.log(stream.writableLength);

  // stream.on("drain", () => {
  //   console.log(stream.write(Buffer.alloc(16384, "a")));
  //   console.log(stream.writableLength);

  //   console.log("We are now safe to write more!");
  // });

  let i = 0;

  const numberOfWrites = 1000000;

  const writeMany = () => {
    while (i < numberOfWrites) {
      const buff = Buffer.from(` ${i} `, "utf-8");

      // this is our last write
      if (i === numberOfWrites - 1) {
        return stream.end(buff);
      }

      // if stream.write returns false, stop the loop
      if (!stream.write(buff)) break;

      i++;
    }
  };

  writeMany();

  // resume our loop once our stream's internal buffer is emptied
  stream.on("drain", () => {
    // console.log("Drained!!!");
    writeMany();
  });

  stream.on("finish", () => {
    console.timeEnd("writeMany");
    fileHandle.close();
  });
})();
