const net = require('net');
const server = net.createServer();

const PORT = 3008;
const HOSTNAME = '127.0.0.1';

// An array of client objects of sockets
const clients = [];

server.on('connection', (socket) => {
  console.log('🛜 A new connection to the server 🧓');

  const clientId = clients.length + 1;

  // Broadcasting a message to everyone when someone enters the chat room
  clients.map((client) => {
    client.socket.write(`🧑‍🦱 User ${clientId} joined`);
  })

  socket.write(`id-${clientId}`);

  socket.on('data', (data) => {
    const dataString = data.toString('utf-8');
    const id = dataString.substring(0, dataString.indexOf('-'));
    const message = dataString.substring(dataString.indexOf('-message-') + 9);

    clients.map((client) => {
      client.socket.write(`> 👤 🆔 ${id}: ${message}`);
    });
  });

  // Broadcasting a message to everyone when someone leaves the chat room
  socket.on('end', () => {
    clients.forEach((client) => {
      client.socket.write(`👋 User ${clientId} left!`);
    });
  });

  clients.push({ id: clientId.toString(), socket: socket});
});

server.listen(PORT, HOSTNAME, () => {
  console.log('👐 opened server on', server.address());
});
