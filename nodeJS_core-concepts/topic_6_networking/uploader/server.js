const net = require('net');
const fs = require('node:fs/promises');

const server = net.createServer(() => {} )

let fileHandle, fileWriteStream;

server.on('connection', (socket) => {
  console.log('🛜 New connection!');

  socket.on('data', async (data) => {
    if (!fileHandle) {
      socket.pause(); // pause receiving data from the client

      const indexOfDivider = data.indexOf('-------');
      const fileName = data.subarray(10, indexOfDivider).toString('utf-8');

      fileHandle = await fs.open(`storage/${fileName}`, 'w');
      // the stream to write to
      fileWriteStream = fileHandle.createWriteStream();

      // Writing to our destination file, discard the headers
      fileWriteStream.write(data.subarray(indexOfDivider + 7));

      socket.resume(); // resume receiving data from the client
      fileWriteStream.on('drain', () => {
        socket.resume();
      });

    } else {
      if (!fileWriteStream.write(data)) {
        socket.pause();
      }
    }
  });

  // This end event happens when the client.js file end the socket
  socket.on('end', () => {
    if (fileHandle) fileHandle.close();
    fileHandle = undefined;
    fileWriteStream = undefined;

    // NOT NEED || Redundant code
    // console.log(socket.readableEnded);
    // socket.end();
    // console.log(socket.readableEnded);

    console.log('⏱️ Connection ended!');
  });

});



server.listen(5050, "::1", () => {
  console.log('💢 🔄 Uploader server opened on', server.address());
});
