const dgram = require('dgram');

// 👀 https://skullbox.net/tcpudp.php

const PORT = 8000;
const ADDRESS = '127.0.0.1';

const receiver = dgram.createSocket('udp4');

receiver.on('message', (message, remoteInfo) => {
  console.log(`Server got: ${message} from ${remoteInfo.address}:${remoteInfo.port}`);
});


receiver.bind({address: ADDRESS, port: PORT});


receiver.on('listening', () => {
  console.log(`Server listening ${receiver.address()}`);
  console.log(receiver.address());
});
