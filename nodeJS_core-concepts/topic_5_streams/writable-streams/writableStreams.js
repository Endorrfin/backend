const fs = require('node:fs/promises');


// Execution Time: 300ms
// Memory Usage: 50MB
(async () => {
  console.time("writeMany");
  const fileHandle = await fs.open("test.txt", "w");

  const stream = fileHandle.createWriteStream();

  console.log(stream.writableHighWaterMark);

  let i = 0;
  const numberOfWrites = 100000; // 100 000 weight of file-small.txt = 689 Kb  | ⏳ Recording time: 41.168ms
  // const numberOfWrites = 1000000; // 1 000 000 weight of file-medium.txt = 7.9 Mb  | ⏳ Recording time: 201.877ms
  // const numberOfWrites = 10000000; // 10 000 000 weight of file-large.txt = 88.9 Mb  | ⏳ Recording time: 1.785s
  // const numberOfWrites = 1000000000; // 1 000 000 000 weight of file-huge.txt = 10.89 Gb  | ⏳ Recording time: 2:58.583 (m:ss.mmm)


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
