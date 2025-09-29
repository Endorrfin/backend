const { Writable } = require('node:stream');
const fs = require('node:fs');

class FileWriteStream extends Writable {
  constructor ({highWaterMark, fileName}) {
    super({ highWaterMark });

    this.fileName = fileName;
    this.fd = null;
    this.chunks = [];
    this.chunkSize = 0;
    this.writesCount = 0;
  }


  // This will run the constructor, and it will put off all calling the other methods until we call the callback function
  _construct(callback) {
    fs.open(this.fileName, 'w', (err, fd) => {
      if (err) {
        // so if we call the callback with an argument, it means that we have an error and we should not proceed
        callback(err);
      } else {
        this.fd = fd;

        // no argument means it was successfully
        callback();
      }
    });

  }


  _write (chunk, encoding, callback) {
    this.chunks.push(chunk);
    this.chunkSize += chunk.length;

    if (this.chunkSize > this.writableHighWaterMark) {
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
        if (err) {
          return callback(err);
        }
        this.chunks = []
        this.chunkSize = 0;
        ++this.writesCount;
        callback();
      });
    } else {
      // when we're done, we should call the callback function
      callback();
    }
  }


  _final(callback) {
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) return callback(err);


      ++this.writesCount;
      this.chunks = [];
      callback();
    });
  }

  _destroy(error, callback) {
    console.log('Number of writes:', this.writesCount);
    if (this.fd) {
      fs.close(this.fd, (err) => {
        callback(err || error);
      });
    } else {
      callback(error);
    }
  }
}


(async () => {
  console.time("writeMany");

  const stream = new FileWriteStream({
    fileName: "file-micro.txt", // ⚖️ from 1 to 10 000 = 59 Kb
    // fileName: "file-small.txt", // ⚖️ from 1 to 100 000 = 689 Kb
    // fileName: "file-medium.txt", // ⚖️ from 1 to 1 000 000 = 7.9 Mb
    // fileName: "file-large.txt", // ⚖️ from 1 to 10 000 000 = 88.9 Mb
    // fileName: "file-gr and.txt", // ⚖️ from 1 to 500 000 000 = 5.39 GB
    // fileName: "file-huge.txt", // ⚖️ from 1 to 1 000 000 000 = 10.89 GB
  });

  let i = 0;

  const numberOfWrites = 10000; // ⚖️ from 1 to 10 000 = 59 Kb
  // const numberOfWrites = 100000; // ⚖️ from 1 to 100 000 = 689 Kb
  // const numberOfWrites = 1000000; // ⚖️ from 1 to 1 000 000 = 7.9 Mb
  // const numberOfWrites = 10000000; // ⚖️ from 1 to 10 000 000 = 88.9 Mb
  // const numberOfWrites = 500000000; // ⚖️ from 1 to 500 000 000 = 5.39 GB
  // const numberOfWrites = 1000000000; // ⚖️ from 1 to 1 000 000 000 = 10.89 GB

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

  let d = 0;
  // resume our loop once our stream's internal buffer is emptied
  stream.on("drain", () => {
    ++d;
    writeMany();
  });

  stream.on("finish", () => {
    console.log("☝️ Number of drains:", d);
    console.timeEnd("writeMany");
  });
})();
