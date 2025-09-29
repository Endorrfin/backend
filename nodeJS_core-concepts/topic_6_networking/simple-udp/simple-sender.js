const dgram = require('dgram');

// 👀 https://skullbox.net/tcpudp.php
// tcp - two way connection
// udp - one way connection (sender or receiver)

// max size: 9216 bytes

const PORT = 8000;
const ADDRESS = '127.0.0.1';

const sender = dgram.createSocket({type:'udp4', sendBufferSize: 2000});

sender.send('This is a string', PORT, ADDRESS, (error, bytes) => {
  if (error) console.log(error);
  console.log(bytes);
});


sender.send('This is a string', PORT, ADDRESS, (error, bytes) => {
  if (error) console.log(error);
  console.log(bytes);
});

