const net = require('net');
const fs = require('node:fs/promises');
const path = require('node:path');

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

const socket = net.createConnection({host: '::1', port: 5050}, async () => {

  // const filePath = './text.txt';
  // const filePath = './file-grand.txt';
  // console.log(process.argv);

  const filePath = process.argv[2];
  const fileName = path.basename(filePath);
  const fileHandle = await fs.open(filePath, 'r');
  // the stream to read from
  const fileReadStream = fileHandle.createReadStream();
  const fileSize = (await fileHandle.stat()).size;


  // For showing the upload progress
  let uploadedPercentage = 0;
  let bytesUploaded = 0;


  socket.write(`fileName: ${fileName}-------`);

  // 📖💡 Reading from the source file
  fileReadStream.on('data', async (data) => {
    if (!socket.write(data)) {
      fileReadStream.pause();
    }

    // add the number of bytes read to the variable
    bytesUploaded += data.length;
    let newPercentage = Math.floor((bytesUploaded / fileSize) * 100);

    if (newPercentage % 5 === 0 && newPercentage !== uploadedPercentage) {
      uploadedPercentage = newPercentage;
      await moveCursor(0, -1);
      await clearLine(0);
      console.log(`🗳️ Uploading... ${uploadedPercentage}%`);
    }
  });

  socket.on('drain', () => {
    fileReadStream.resume();
  });

  fileReadStream.on('end', () => {
    console.log('✅ The file was successfully uploaded!');
    socket.end();
  })
});


// 🟢HOW TO RUN: node client.js file-grand.txt
