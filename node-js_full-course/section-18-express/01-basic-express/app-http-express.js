const http = require('http');
const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Response from Express'));

const server = http.createServer(app);

server.listen(3001, () => console.log('Server was started on port 3001'));
